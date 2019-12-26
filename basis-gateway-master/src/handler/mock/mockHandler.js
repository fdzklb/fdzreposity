const ProviderFactory = require('../../provider/providerFactory');
const { PROVIDER_TYPE } = require('../../constant');
const Mock = require('mockjs');

/**
 * MockHandle Base Type
 * author: sharon
 */
class MockHandler {

  /**
   * Mock Handler
   * @constructor
   */
  constructor() {
    /**
     * the provider type
     */
    this.providerType = null;

    /**
     * the mock data
     */
    this.mockData = null;

    /**
     * the mock data key
     */
    this.dataKey = '';

    /**
     * Mockjs instance
     */
    this.Mock = Mock;

    // init
    this.init();
  }

  /**
   * init provider by config
   */
  init() {
    // set provider configs
    this.setProviderType();
    this.setMockData();

    /**
     * get the provider instance
     */
    this.provider = ProviderFactory.create({
      type: this.providerType,
      key: this.mockData,
    });
  }

  /**
   * set the mock data
   */
  setMockData() {
    /**
     * the mock data
     */
    this.mockData = null;
  }

  /**
   * set MockJSProvider
   */
  setProviderType() {
    /**
     * the provider type
     */
    this.providerType = PROVIDER_TYPE.MOCKJS;
  }

  /**
   * request for mock result
   * @param {object} commonProtocol - common protocol
   * @returns {object} Promise
   */
  request(commonProtocol) {
    return this.provider.query(this.dataKey, commonProtocol);
  }

}

module.exports = MockHandler;
