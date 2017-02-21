import Home from './Home.vue';
import Code from './Code.vue';
import Holidays from './Holidays.vue';
import Despatches from './Despatches.vue';
import Records from './Records.vue';

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
];
