/**
 * Adapter Base Type
 * author: sharon
 */
class BaseAdapter {

  /**
   * adapter for request
   * @param {string} eventType - the event type
   * @param {object} eventParams - the event params
   */
  request(eventType, eventParams) {}

}

module.exports = BaseAdapter;
