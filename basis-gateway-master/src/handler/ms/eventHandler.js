const ProviderFactory = require('../../provider/providerFactory');
const { DBCONFIG, PROVIDER_TYPE } = require('../../constant');
const ErrorCode = require('../../constant/errorCode');

/**
 * EventHandler Base Type
 * author: sharon
 */
class EventHandler {

  /**
   * Event Handler
   * @constructor
   */
  constructor() {
    /**
     * only one provider
     */
    this.provider = null;
    /**
     * support more providers
     * order by the config
     */
    this.providers = [];
    /**
     * Provider configs
     * support array
     */
    this.providerConfigs = {};

    /**
     * error code
     */
    this.errorCode = ErrorCode;

    // init
    this.init();
  }

  /**
   * set Provider configs
   */
  setProviderConfigs() {
    /**
     * Provider configs
     * support array
     */
    this.providerConfigs = {
      type: PROVIDER_TYPE.DB,
      key: DBCONFIG.MS,
    };
  }

  /**
   * init configs to use Provider
   */
  init() {
    // get Provider Configs
    this.setProviderConfigs();
    const providers = ProviderFactory.create(this.providerConfigs);

    if (providers instanceof Array) {
      // support more Providers
      this.providers = providers;
    } else {
      // only one Provider
      this.provider = providers;
    }
  }

  /**
   * request for service result
   * @param {object} commonProtocol - common protocol
   */
  request(commonProtocol) {}

}

module.exports = EventHandler;
