const path = require('path');
const logger = require('log4js').getLogger('MockHandlerFactory.js');
const Message = require('../../constant/message');

/**
 * MockHandlerFactory
 * @author sharon
 */
class MockHandlerFactory {

  /**
   * create a mock instance
   * @param {string} type class type
   * @returns {object} handler instance
   */
  static getHandler(type) {
    if (!type) {
      throw new Error(Message.format(Message.NOT_DEFINED, type));
    }

    let file = path.join(__dirname, './' + type);
    logger.info(Message.format(Message.FIND_FILE, file));

    const MockHandler = require(file);

    if (!MockHandler) {
      throw new Error(Message.format(Message.NOT_DEFINED, MockHandler.name));
    }

    // single instance
    this._instance = this._instance || {};

    if (this._instance[MockHandler.name] === undefined) {
      this._instance[MockHandler.name] = new MockHandler();
    }

    return this._instance[MockHandler.name];
  }

}

module.exports = MockHandlerFactory;
