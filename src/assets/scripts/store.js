/* eslint-disable no-unused-expressions, no-console */
import config from './config';

const store = {
  debug: config.debug,
  state: {
    loading: false,
  },
  setLoadingAction(newValue) {
    this.debug && console.log('setLoadingAction triggered with', newValue);
    this.state.loading = newValue;
  },
  clearLoadingAction() {
    this.debug && console.log('clearLoadingAction triggered');
    this.state.loading = false;
  },
};

export default store;
