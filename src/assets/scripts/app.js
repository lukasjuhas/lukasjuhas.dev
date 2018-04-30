/* eslint-disable no-new, no-param-reassign */
import axios from 'axios/dist/axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import routes from './routes';
import config from './config';
import store from './store';
import Form from './utils/Form';
import flash from './helpers/flash';

window.axios = axios;
window.axios.defaults.baseURL = config.baseApiUrl;

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  (error) => {
    store.setLoadingAction(false);

    if (error.response.data.message) {
      flash.showError(error.response.data.message);
    }

    return Promise.reject(error);
  },
);

window.Form = Form;

Vue.use(VueRouter);
Vue.use(VueLazyload);

store.state.router = new VueRouter({
  mode: config.debug ? 'hash' : 'history',
  linkActiveClass: 'current',
  routes,
});

new Vue({
  el: '#app',
  router: store.state.router,
  render: h => h(App),
});
