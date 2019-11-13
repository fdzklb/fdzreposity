import DataChangeType from './dataChangeType';
import DataSourceFactory, {
  DataSourceType,
} from '../dataUtil/dataSourceFactory';

/**
 * Base Model
 */
class BaseModel {

  /**
   * base model
   */
  constructor() {
    this.dataChangeListeners = {};
    this.dataSource = DataSourceFactory.getDataSource(DataSourceType.gateway);
  }

  /**
   * emit the data change by type
   * @param {string} type - data change type
   * @param {object} data - emit data
   * @private
   */
  handleDataChange(type, data) {
    if (typeof type === 'object') {
      data = type;
      type = DataChangeType.DEFAULT;
    }

    let subscribers = this.dataChangeListeners[type];

    if (subscribers) {
      subscribers.forEach(callback => {
        callback && callback(data);
      });
    }
  }

  /**
   * add data change listner
   * @param {string} type - type
   * @param {function} callback - callback
   */
  addDataChangeListener(type, callback) {
    if (typeof type === 'function') {
      callback = type;
      type = DataChangeType.DEFAULT;
    }

    let subscribers = this.dataChangeListeners[type];

    if (!subscribers) {
      this.dataChangeListeners[type] = [];
    }

    this.dataChangeListeners[type].push(callback);
  }

  /**
   * remove data change listener
   * @param {string} type - type
   * @param {function} callback - callback
   */
  removeDataChangeListener(type, callback) {
    if (typeof type === 'function') {
      callback = type;
      type = DataChangeType.DEFAULT;
    }

    let subscribers = this.dataChangeListeners[type];

    if (subscribers) {
      let index = subscribers.indexOf(callback);

      if (index > -1) {
        subscribers.splice(index, 1);
      }
    }
  }

  /**
   * clear model cache data
   */
  clearCache() { }

}

export default BaseModel;
