/* global axios */
import each from 'lodash/each';
import Errors from './Errors';

export default class Form {
  /**
  * Create a new Form instance.
  *
  * @param {object} data
  */
  constructor(data) {
    this.originalData = data;

    each(data, (field) => {
      this[field] = data[field];
    });

    this.errors = new Errors();
  }


  /**
  * Fetch all relevant data for the form.
  */
  data() {
    const data = {};

    each(this.originalData, (property) => {
      data[property] = this[property];
    });

    return data;
  }


  /**
  * Reset the form fields.
  */
  reset() {
    each(this.originalData, (field) => {
      this[field] = '';
    });

    this.errors.clear();
  }


  /**
  * Send a POST request to the given URL.
  * .
  * @param {string} url
  */
  post(url) {
    return this.submit('post', url);
  }


  /**
  * Send a PUT request to the given URL.
  * .
  * @param {string} url
  */
  put(url) {
    return this.submit('put', url);
  }


  /**
  * Send a PATCH request to the given URL.
  * .
  * @param {string} url
  */
  patch(url) {
    return this.submit('patch', url);
  }


  /**
  * Send a DELETE request to the given URL.
  * .
  * @param {string} url
  */
  delete(url) {
    return this.submit('delete', url);
  }


  /**
  * Submit the form.
  *
  * @param {string} requestType
  * @param {string} url
  */
  submit(requestType, url) {
    return new Promise((resolve, reject) => {
      axios[requestType](url, this.data())
      .then((response) => {
        this.onSuccess(response.data);

        resolve(response.data);
      })
      .catch((error) => {
        this.onFail(error.response.data);

        reject(error.response.data);
      });
    });
  }


  /**
  * Handle a successful form submission.
  *
  * @param {object} data
  */
  onSuccess(data) {
    console.log(data.message); // temporary

    this.reset();
  }


  /**
  * Handle a failed form submission.
  *
  * @param {object} errors
  */
  onFail(errors) {
    this.errors.record(errors);
  }
}
