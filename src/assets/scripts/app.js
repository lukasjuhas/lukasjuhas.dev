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
import Form from './utils/Form';

window.axios = axios;
window.axios.defaults.baseURL = config.baseApiUrl;
window.axios.defaults.timeout = config.timeout;
window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
};

window.Form = Form;

Vue.use(VueRouter);
Vue.use(VueLazyload);

store.state.router = new VueRouter({
  mode: config.debug ? 'hash' : 'history',
  linkActiveClass: 'current',
  routes,
});

store.state.router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.authToken) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router: store.state.router,
  render: h => h(App),
});
