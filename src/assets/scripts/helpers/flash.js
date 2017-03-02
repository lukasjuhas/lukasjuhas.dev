/* global document */
import store from '../store';

export default class flash {
  static showError(message, autohide = false) {
    console.log('error', store.state.flash.status);
    store.state.flash.status = 'error';
    console.log('error', store.state.flash.status);

    if (message) {
      store.state.flash.content = message;
    }

    if (autohide) {
      store.state.flash.autohide = true;
    }

    document.documentElement.classList.add(store.state.flash.status);
    store.state.flash.show = true;
  }

  static showSuccess(message, autohide = false) {
    console.log('success', store.state.flash.status);
    store.state.flash.status = 'success';
    console.log('success', store.state.flash.status);

    if (message) {
      store.state.flash.content = message;
    }

    if (autohide) {
      store.state.flash.autohide = true;
    }

    document.documentElement.classList.add(store.state.flash.status);
    store.state.flash.show = true;
  }

  static hide() {
    store.state.flash.autohide = false;

    if (store.state.flash.show) {
      document.documentElement.classList.remove(store.state.flash.status);
      store.state.flash.show = false;
    }
  }
}
