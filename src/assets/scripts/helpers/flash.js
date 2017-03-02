/* global document */
import store from '../store';

export default class flash {
  static showError(message, autohide = false) {
    store.setFlashAction('status', 'error');

    if (message) {
      store.setFlashAction('content', message);
    }

    if (autohide) {
      store.setFlashAction('autohide', true);
      this.autoHide();
    }

    document.documentElement.classList.add(store.state.flash.status);
    store.state.flash.show = true;
  }

  static showSuccess(message, autohide = false) {
    store.setFlashAction('status', 'success');

    if (message) {
      store.setFlashAction('content', message);
    }

    if (autohide) {
      store.setFlashAction('autohide', true);
      this.autoHide();
    }

    document.documentElement.classList.add(store.state.flash.status);
    store.state.flash.show = true;
  }

  static hide() {
    store.setFlashAction('autohide', false);

    if (store.state.flash.show) {
      document.documentElement.classList.remove(store.state.flash.status);
      store.setFlashAction('show', false);
    }
  }

  static autoHide() {
    setTimeout(() => {
      this.hide();
    }, 3000);
  }
}
