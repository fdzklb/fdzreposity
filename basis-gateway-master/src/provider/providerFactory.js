const { PROVIDER_TYPE } = require('../constant');
const logger = require('log4js').getLogger('ProviderFactory.js');
const DBFactory = require('./db/dbFactory');
const MockProvider = require('./mockjs');
const HttpProvider = require('./http/index');

/**
 * Provider Factory
 * author: sharon
 */
class ProviderFactory {

  /**
   * create Provider class
   * @param {object} configs configs use to create Provider
   * @returns {null} nothing return
   */
  static create(configs) {
    // support json or json array
    if (configs && !(configs instanceof Array)) {
      configs = Array(configs);
    }

    let providers = configs.map(config => {
      let provider = null;

      switch (config.type) {
        // DBProvider
        case PROVIDER_TYPE.DB:
          provider = DBFactory.createDBProvider(config.key);
          break;
        // HttpProvider
        case PROVIDER_TYPE.HTTP:
          provider = new HttpProvider();
          break;
        // MockjsProvider
        case PROVIDER_TYPE.MOCKJS:
          provider = MockProvider.getInstance();
          break;
        default:
          throw new Error(
            `${config.type} Provider is not defined, please check.`
          );
      }

      provider.init(config.key);

      logger.info(`get provider type ${provider.constructor.name}`);

      return provider;
    });

    if (providers.length == 1) {
      providers = providers[0];
    }

    return providers;
  }

}

module.exports = ProviderFactory;
