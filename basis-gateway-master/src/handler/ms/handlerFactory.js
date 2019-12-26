const path = require('path');
const logger = require('log4js').getLogger('HandlerFactory.js');
const Message = require('../../constant/message');

/**
 * MockHandlerFactory
 * @author sharon
 */
class HandlerFactory {

  /**
   * create a mock instance
   * @param {string} type class type
   * @returns {object} handle instance
   */
  static getHandler(type) {
    if (!type) {
      throw new Error(Message.format(Message.NOT_DEFINED, type));
    }

    let file = path.join(__dirname, './' + type);
    logger.info(Message.format(Message.FIND_FILE, file));

    const EventHandler = require(file);

    if (!EventHandler) {
      throw new Error(Message.format(Message.NOT_DEFINED, EventHandler.name));
    }

    // single instance
    this._instance = this._instance || {};

    if (this._instance[EventHandler.name] === undefined) {
      this._instance[EventHandler.name] = new EventHandler();
    }

    return this._instance[EventHandler.name];
  }

}

module.exports = HandlerFactory;
