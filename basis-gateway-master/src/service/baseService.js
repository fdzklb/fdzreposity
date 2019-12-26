/**
 * Service基类，处理业务逻辑
 * @author sharon
 * @since  2018/5/2
 */
class BaseService {

  /**
   * Base Service
   * @param {object} provider - the provider
   */
  constructor(provider) {
    this.provider = provider;
    this.setProvider();
  }

  /**
   * reset the provider
   */
  setProvider() {}

}

module.exports = BaseService;
