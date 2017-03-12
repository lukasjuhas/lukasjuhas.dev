import Home from './Home.vue';
import Code from './Code.vue';
import Holidays from './Holidays.vue';
import Holiday from './Holiday.vue';
import Despatches from './Despatches.vue';
import Records from './Records.vue';
import Login from './Login.vue';
import NotFound from './404.vue';
import Manage from './Manage.vue';
import ManageDespatch from './manage/EditDespatch.vue';
import ManageDespatchNew from './manage/NewDespatch.vue';
import ManageHoliday from './manage/EditHoliday.vue';
import ManageHolidayNew from './manage/NewHoliday.vue';

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
    path: '/holidays',
    component: Holidays,
    name: 'Every Month\'s Holidays',
    nav: true,
  },
  {
    path: '/holidays/:slug',
    component: Holiday,
    props: true,
  },
  {
    path: '/despatches',
    component: Despatches,
    name: 'Despatches',
  },
  {
    path: '/records',
    component: Records,
    name: 'Records',
    nav: true,
  },
  {
    path: '/manage',
    component: Manage,
    name: 'Manage',
    meta: { requiresAuth: true },
  },
  {
    path: '/manage/despatch/new',
    component: ManageDespatchNew,
    name: 'New Despatch',
    meta: { requiresAuth: true },
  },
  {
    path: '/manage/despatch/:slug',
    component: ManageDespatch,
    name: 'Edit Despatch',
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/manage/holiday/new',
    component: ManageHolidayNew,
    name: 'New Holiday',
    meta: { requiresAuth: true },
  },
  {
    path: '/manage/holiday/:slug',
    component: ManageHoliday,
    name: 'Edit Holiday',
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
  },
  { path: '*', redirect: '/404' },
];
