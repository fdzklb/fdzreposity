const BaseProvider = require('../../baseProvider');

/**
 * MongodbProvider
 */
class MongodbProvider extends BaseProvider {

  /**
   * init provider by config
   * @param {string} configKey config key
   */
  init(configKey) {}

  /**
   * query by protocol
   * @param {object} protocol common protocol
   * @returns {object} promise
   */
  query(protocol) {
    return new Promise((resolve, reject) => {});
  }

}

module.exports = MongodbProvider;
