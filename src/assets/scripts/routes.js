import Home from './Home.vue';
import Photos from './Photos.vue';
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
    path: '/despatches',
    component: Despatches,
  },
  {
    path: '/records',
    component: Records,
  },
];
