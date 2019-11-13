/**
 * Local Storage Util
 */
class LocalStorage {

  /**
   * LocalStorage
   */
  constructor() {
    this.localStorage = localStorage;
  }

  // single instance
  static _instance = null;

  /**
   * get single instance
   * @returns {object} LocalStorage
   */
  static getInstance() {
    if (this._instance === null) {
      this._instance = new LocalStorage();
    }

    return this._instance;
  }

  /**
   * get the value by localStorage key
   * @param {string} key - local storage key
   * @returns {string} value
   */
  getItem(key) {
    return this.localStorage.getItem(key);
  }

  /**
   * set the localStorage value by the key
   * @param {string} key localStorage key
   * @param {string} value localStorage value
   */
  setItem(key, value) {
    this.localStorage.setItem(key, value);
  }

  /**
   * remove the localStorge item
   * @param {string} key localStorage key
   */
  clearItem(key) {
    this.localStorage.removeItem(key);
  }

}

export default LocalStorage;
