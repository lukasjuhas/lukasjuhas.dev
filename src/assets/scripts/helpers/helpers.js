/* global document */
import config from '../config';

export default class helpers {
  /**
   * update document title
   * @param string newTitle
   * @return string
   */
  static updateTitle(newTitle) {
    if (document.title !== newTitle && newTitle !== null) {
      document.title = `${newTitle} - Lukas Juhas`;
    }

    if (newTitle == null) {
      document.title = 'Lukas Juhas';
    }
  }

  /**
   * app url
   * @param string path
   * @return string
   */
  static url(path) {
    return `${config.url.replace(/^\/|\/$/g, '')}/${path.replace(/^\/|\/$/g, '')}/`;
  }
}
