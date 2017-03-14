/* global window */
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

window.axios = axios;
window.axios.defaults.baseURL = config.baseApiUrl;
window.axios.defaults.timeout = config.timeout;
window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
};

window.axios.interceptors.request.use((axiosConfig) => {
  if (store.state.token) {
    axiosConfig.headers.common.Authorization = `Bearer ${store.state.token}`;
  }

  return axiosConfig;
}, (error) => {
  // check if unauthorized error returned
  if (error.response.status === 401) {
    // go to login
  }
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  if (response.data.token) {
    store.setAuthTokenAction(response.data.token);
  }

  if (response.status === 500) {
    if (response.data.message === 'Token has expired, but is still valid.') {
      console.log('RETRY', response);
    } else {
      console.log('Whoops, an unknown error occured.');
    }
  }

  return response;
}, error => Promise.reject(error));

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
    if (store.state.token) {
      const tokenValid = true;
      if (!tokenValid) {
        next({
          path: '/login',
        });
      } else {
        next();
      }
    } else {
      next({
        path: '/login',
      });
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
