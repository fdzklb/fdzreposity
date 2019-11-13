import BaseModel from './baseModel';
import LocationHistory from '../dataUtil/locationHistory';
import LocationChangeType from '../common/locationChangeType';
import DataChangeType from './dataChangeType';

/**
 * Location Model
 */
class LocationModel extends BaseModel {

  /**
   * location with window history
   */
  constructor() {
    super();
    this.history = LocationHistory.getInstance();
    this.history.addDataChangeListener(this.handleHistoryChange);

    // get current location data
    this.data = this.history.getLocationData();
  }

  /**
   * get the browser url
   * @public
   * @returns {object} browser location object
   */
  getCurrentLocation() {
    return this.data;
  }

  /**
   * push or replace window history
   * @param {object} location {path, params, type}
   * @public
   */
  setLocation(location) {
    this.setData(location);

    const params = {
      data: location.params,
      title: '',
      url: location.path,
    };

    switch (location.type) {
      case LocationChangeType.FORWARD:
        this.history.pushLocation(params);
        break;
      case LocationChangeType.FORWARD_SHOW_PARAMS:
        params.url += this.parseUrlParams(location.params);
        this.history.pushLocation(params);
        break;
      case LocationChangeType.REPLACE:
        this.history.replaceLocation(params);
        break;
      case LocationChangeType.REPLACE_SHOW_PARAMS:
        params.url += this.parseUrlParams(location.params);
        this.history.replaceLocation(params);
        break;
      default:
        this.history.pushLocation(params);
        break;
    }

    this.handleDataChange(DataChangeType.UPDATED, location);
  }

  /**
   * if NavigationPath match '/dynamic/detail/:id'
   * returns location path with params, like
   * '/dynamic/detail/1'.
   * @public
   * @param {string} path - Navigation Path
   * @param {object} params - location params
   * @returns {object} merged location path
   */
  mergeLocation(path = '', params) {
    const lastIndex = path.lastIndexOf('/:');

    if (lastIndex > -1) {
      const paramKey = path.substring(lastIndex + 2, path.length);
      const regex = new RegExp('/:' + paramKey);

      return path.replace(regex, '/' + params[paramKey]);
    }

    return path;
  }

  /**
   * browser back event, will emit popstate event
   * @public
   * @param {number} page page
   */
  back(page) {
    this.history.backLocation(page);
  }

  /**
   * keep the brower location info
   * @param {object} data location info
   * @private
   */
  setData(data) {
    this.data = data;
  }

  /**
   * emit back/forward event
   * @param {object} location - browser event
   * @param {object} action - 'POP' action
   * @private
   */
  handleHistoryChange = (location) => {
    this.setData(location);
    this.handleDataChange(location);
  };

  /**
   * transfer params object to string
   * @param {object} params - params object
   * @returns {object} params string format
   * @private
   */
  parseUrlParams(params = {}) {
    let paramStr = '?';
    Object.keys(params).forEach(key => {
      if (typeof params[key] !== 'object') {
        paramStr += key + '=' + params[key] + '&';
      }
    });

    return paramStr.substr(0, paramStr.length - 1);
  }

  /**
   * get location Search field
   * @returns {string} Search
   */
  getLocationSearch() {
    return window.location.search;
  }

  /**
  * get location path
  * @returns {string} path
  */
  getLocationPath() {
    return this.data && this.data.path;
  }

  /**
   * forwardLocation
   * @param {string} url url
   */
  forwardLocation(url) {
    window.location.href = url;
  }

}

export default LocationModel;
