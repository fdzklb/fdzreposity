const MockHandlerFactory = require('../handler/mock/mockHandlerFactory');
const BaseAdapter = require('./baseAdapter');
const Message = require('../constant/message');

/**
 * Mock Adapter
 * @author sharon
 */
class MockAdapter extends BaseAdapter {

  /**
   * send request for data
   * @param {string} eventType - event type
   * @param {object} eventParams - event params
   * @returns {object} returns promise
   */
  request(eventType, eventParams) {
    try {
      const handler = MockHandlerFactory.getHandler(eventType);

      if (!handler) {
        throw new Error(Message.format(Message.MOCK_HANDLER_ERROR, eventType));
      }

      // request data;
      return handler.request(eventParams);
    } catch (err) {
      // catch exception
      return Promise.reject(err);
    }
  }

}

module.exports = MockAdapter;
