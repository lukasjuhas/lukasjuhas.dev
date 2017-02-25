/* global document */
import store from '../store';

export default class flash {
  static showError(message) {
    if (message) {
      store.state.flash.content = message;
    }

    document.documentElement.classList.add(store.state.flash.status);
    store.state.flash.show = true;
  }
}
