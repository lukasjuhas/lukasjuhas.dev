/* eslint-disable implicit-arrow-linebreak */
import Vuex from 'vuex';

const createStore = () =>
  new Vuex.Store({
    state: {
      loading: false,
    },
    actions: {},
  });
export default createStore;
