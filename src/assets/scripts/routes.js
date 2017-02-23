import Home from './Home.vue';
import Code from './Code.vue';
import Holidays from './Holidays.vue';
import Holiday from './Holiday.vue';
import Despatches from './Despatches.vue';
import Records from './Records.vue';
import NotFound from './404.vue';

export default [
  {
    path: '/',
    component: Home,
    label: null,
    nav: false,
  },
  {
    path: '/code',
    component: Code,
    label: 'Code',
    nav: true,
  },
  {
    path: '/holidays',
    component: Holidays,
    label: 'Every Month\'s Holidays',
    nav: true,
  },
  {
    path: '/holidays/:slug',
    component: Holiday,
    props: true,
    nav: false,
  },
  {
    path: '/despatches',
    component: Despatches,
    label: 'Despatches',
    nav: true,
  },
  {
    path: '/records',
    component: Records,
    label: 'Records',
    nav: true,
  },
  {
    path: '/404',
    component: NotFound,
    label: '404',
    nav: false,
  },
  { path: '*', redirect: '/404' },
];
