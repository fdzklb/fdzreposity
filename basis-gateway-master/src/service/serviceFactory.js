const path = require('path');
const logger = require('log4js').getLogger('HandlerFactory.js');
const Message = require('../constant/message');

/**
 * Service Factory
 */
class ServiceFactory {

  /**
   * Create Service Instance
   * @param {string} type - service type
   * @param {object} params - other params
   * @returns {object} instance
   */
  static create(type, params) {
    if (!type) {
      throw new Error(Message.format(Message.NOT_DEFINED, type));
    }

    let file = path.join(__dirname, './' + type);
    logger.info(Message.format(Message.FIND_FILE, file));

    const BaseService = require(file);

    if (!BaseService) {
      throw new Error(Message.format(Message.NOT_DEFINED, BaseService.name));
    }

    return new BaseService(params);
  }

}

module.exports = ServiceFactory;
