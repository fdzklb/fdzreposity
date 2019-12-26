const BaseAdapter = require('./baseAdapter');
const HandlerFactory = require('../handler/ms/handlerFactory');
const Message = require('../constant/message');

/**
 * MS Adapter
 * @author sharon
 */
class MSAdapter extends BaseAdapter {

  /**
   * send request for data
   * @param {string} eventType - event type
   * @param {object} eventParams - event params
   * @returns {object} object
   */
  request(eventType, eventParams) {
    try {
      const handler = HandlerFactory.getHandler(eventType);

      if (!handler) {
        throw new Error(Message.format(Message.MS_HANDLER_ERROR, eventType));
      }

      // request data
      return handler.request(eventParams);
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

module.exports = MSAdapter;
