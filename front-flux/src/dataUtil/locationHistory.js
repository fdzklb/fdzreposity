/**
 * browser navigation location url data and history
 */
class LocationHistory {

  /**
   * Location History
   */
  constructor() {
    // window history
    this.history = window.history;

    // listeners
    this.dataChangeListeners = [];
    /*
     * browser actioin forward/back
     * if do history.back()/go()/forward()
     * can emit the popstate event
     */
    window.onpopstate = this.handleDataChange;
  }

  // single instance
  static _instance = null;

  /**
   * get single instance
   * @returns {object} instance
   */
  static getInstance() {
    if (this._instance === null) {
      this._instance = new LocationHistory();
    }

    return this._instance;
  }

  /**
   * get location data
   * @param {object} location - popstate event object
   * @param {object} state - history state
   * @returns {object} data
   */
  getLocationData(location = window.location, state = window.history.state) {
    return {
      path: this.getLocationPath(location),
      params: this.getLocationParams(location, state),
    }
  }

  /**
   * publisher data change
   * @param {object} event - popstate event object
   * @param {string} action action
   */
  handleDataChange = (event) => {
    if (this.dataChangeListeners) {
      // get location data
      const data = this.getLocationData(undefined, event.state);

      this.dataChangeListeners
        .forEach(callback => callback(data));
    }
  }

  /**
   * add data change listener
   * @param {function} callBack callback
   */
  addDataChangeListener(callBack) {
    this.dataChangeListeners.push(callBack);
  }

  /**
   * remove data change listener
   * @param {function} callBack callback
   */
  removeDataChangeListener(callBack) {
    const index = this.dataChangeListeners.indexOf(callBack);
    this.dataChangeListeners.splice(index, 1);
  }

  /**
   * push item to window.history
   * @param {object} object - item object
   * field description:
   * data {object} item state
   * title {string} item title
   * url {string} item path
   */
  pushLocation({ data, url, title }) {
    const currentUrl = this.getLocationPath(window.location)
      + window.location.search;

    if (url && url !== currentUrl) {
      data = data || {};
      this.history.pushState(data, title, url);
    }
  }

  /**
   * push item from window.history
   * @param {object} object - item object
   * field description:
   * data {object} item state
   * title {string} item title
   * url {string} item path
   */
  replaceLocation({ data, url, title }) {
    if (url) {
      data = data || {};
      this.history.replaceState(data, title, url);
    }
  }

  /**
   * browser back event，emit popState event
   * @param {number} page page default:-1
   */
  backLocation(page = -1) {
    this.history.go(page);
  }

  /**
   * get location path
   * @param {object} location location 
   * @returns {string} current local path
   */
  getLocationPath(location) {
    return location.pathname + location.hash;
  }

  /**
   * get location params
   * @param {object} location location
   * @param {object} state history state
   * @returns {object} params
   */
  getLocationParams(location, state) {
    let paramStr = location.search.slice(1);
    let paramObj = {};

    if (paramStr) {
      let pairArr = paramStr.split('&');
      pairArr.forEach(item => {
        if (item) {
          let itemArr = item.split('=');

          if (itemArr.length > 1) {
            paramObj[itemArr[0]] = itemArr[1];
          } else {
            paramObj[itemArr[0]] = '';
          }
        }
      });
    }

    paramObj = {
      ...paramObj,
      ...state || {},
    };

    return paramObj;
  }

  /**
   * Returns true if the HTML5 history API is supported. Taken from Modernizr.
   * @returns {boolean} support or not
   */
  supportsHistory() {
    const ua = window.navigator.userAgent;

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false;
    }

    return window.history && 'pushState' in window.history;
  }

}

export default LocationHistory;
