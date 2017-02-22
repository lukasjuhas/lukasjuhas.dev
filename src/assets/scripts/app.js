/* global window */
/* eslint-disable no-new */
import axios from 'axios/dist/axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import config from './config';

window.axios = axios;
window.axios.defaults.baseURL = config.baseApiUrl;
window.axios.defaults.timeout = config.timeout;

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
