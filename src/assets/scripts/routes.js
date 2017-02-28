import Home from './Home.vue';
import Code from './Code.vue';
import Holidays from './Holidays.vue';
import Holiday from './Holiday.vue';
import Despatches from './Despatches.vue';
import Records from './Records.vue';
import NotFound from './404.vue';
import Manage from './Manage.vue';
import ManageHoliday from './manage/Holiday.vue';
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
  },
  {
    path: '/manage/holiday/new',
    component: ManageHolidayNew,
    name: 'New Holiday',
  },
  {
    path: '/manage/holiday/:id',
    component: ManageHoliday,
    name: 'Edit Holiday',
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
  },
  { path: '*', redirect: '/404' },
];
