import Home from './Home.vue';
import Photos from './Photos.vue';
import Holidays from './Holidays.vue';
import Despatches from './Despatches.vue';
import Records from './Records.vue';

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/photos',
    component: Photos,
  },
  {
    path: '/holidays',
    component: Holidays,
  },
  {
    path: '/despatches',
    component: Despatches,
  },
  {
    path: '/records',
    component: Records,
  },
];
