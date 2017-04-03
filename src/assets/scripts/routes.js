import Home from './Home.vue';
import Code from './Code.vue';
import Trips from './Trips.vue';
import Trip from './Trip.vue';
import Despatches from './Despatches.vue';
import Records from './Records.vue';
import Login from './Login.vue';
import ResetPassword from './ResetPassword.vue';
import NotFound from './404.vue';
import Manage from './Manage.vue';
import ManageDespatch from './manage/EditDespatch.vue';
import ManageDespatchNew from './manage/NewDespatch.vue';
import ManageTrip from './manage/EditTrip.vue';
import ManageTripNew from './manage/NewTrip.vue';

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
    path: '/trips',
    component: Trips,
    name: 'Trips',
    nav: true,
  },
  {
    path: '/trips/:slug',
    component: Trip,
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
    path: '/manage/trip/new',
    component: ManageTripNew,
    name: 'New Trip',
    meta: { requiresAuth: true },
  },
  {
    path: '/manage/trip/:slug',
    component: ManageTrip,
    name: 'Edit Trip',
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    name: 'Reset Password',
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
  },
  { path: '*', redirect: '/404' },
];
