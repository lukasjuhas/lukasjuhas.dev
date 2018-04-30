import Home from './Home.vue';
import Code from './Code.vue';
import NotFound from './404.vue';

export default [
  {
    path: '/',
    component: Home,
    name: null,
  },
  {
    path: '/code',
    component: Code,
    name: 'Code',
    nav: true,
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
  },
  { path: '*', redirect: '/404' },
];
