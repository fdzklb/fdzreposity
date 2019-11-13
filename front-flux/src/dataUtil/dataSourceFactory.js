import GatewayDataSource from './gatewayDataSource';
import MockDataSource from './mockDataSource';

/**
 * DataSource Type
 */
export const DataSourceType = {
  gateway: 'gateway',
  mock: 'mock',
};

/**
 * DataSource Factory
 */
class DataSourceFactory {

  // instance
  static _instance = {};

  /**
   * get datasource single instance
   * @param {string} type datasource type
   * @returns {object} datasource instance
   */
  static getDataSource(type) {
    return this._instance[type] ? this._instance[type] : null;
  }

  /**
   * init datasource instance
   * @param {string} type - datasource type
   * @param {object} config - datasource config
   */
  static init(type, config) {
    switch (type) {
      case DataSourceType.gateway:
        this._instance[type] = new GatewayDataSource(config);
        break;
      case DataSourceType.mock:
        this._instance[type] = new MockDataSource(config);
        break;
      default:
        break;
    }
  }

}

export default DataSourceFactory;
