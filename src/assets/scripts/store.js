/* eslint-disable no-unused-expressions, no-console */

const store = {
  debug: true,
  state: {
    loading: true,
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
