const { adapterConfig } = require('../config');
const { ADAPTER } = require('../constant');
const Message = require('../constant/message');
const MSAdapter = require('./msAdapter');
const MockAdapter = require('./mockAdapter');

/**
 * Adapter Factory
 * author: sharon
 */
class AdapterFactory {

  /**
   * create a adapter
   * msAdapter or mockAdapter
   * @param {string} type - adapter type
   * @returns {object} adapter instance
   */
  static create(type) {
    type = type || adapterConfig;

    switch (type) {
      // MSAdapter
      case ADAPTER.MS:
        return new MSAdapter();
      // MockAdapter
      case ADAPTER.MOCK:
        return new MockAdapter();
      default:
        throw new Error(Message.format(Message.ADAPTER_ERROR, type));
    }
  }

}

module.exports = AdapterFactory;
