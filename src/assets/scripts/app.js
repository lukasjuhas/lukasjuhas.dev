/* global window */
/* eslint-disable no-new */
import axios from 'axios/dist/axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import routes from './routes';
import config from './config';
import store from './store';

window.axios = axios;
window.axios.defaults.baseURL = config.baseApiUrl;
window.axios.defaults.timeout = config.timeout;

Vue.use(VueRouter);
Vue.use(VueLazyload);

store.state.router = new VueRouter({
  mode: config.debug ? 'hash' : 'history',
  routes,
});

new Vue({
  el: '#app',
  router: store.state.router,
  render: h => h(App),
});
