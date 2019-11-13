/**
 * Base State
 * Child class should be single instance
 */
class BaseState {

  /**
   * Handle Event
   * @param {object} context - context instance
   * @param {string} eventType - event type
   * @param {object} params - event params
   */
  handleEvent(context, eventType, params = {}) {}

  /**
   * when the view display forward, do something
   * @param {object} context - context instance
   * @param {object} params - current state params
   * @param {object} lastState - last state
   * @param {object} lastParams - last state params
   */
  onForwardEntered(context, params, lastState, lastParams) {}

  /**
   * when the view hide forward, do something
   * @param {object} context - context instance
   * @param {object} params - current state params
   * @param {object} nextState - next state
   * @param {object} nextParams - next state params
   */
  onForwardExited(context, params, nextState, nextParams) {}

  /**
   * when the view diplay back, do something
   * @param {object} context - context instance
   * @param {object} params - current state params
   * @param {object} lastState - last state
   * @param {object} lastParams - last state params
   */
  onBackEntered(context, params, lastState, lastParams) {}

  /**
   * when the view hide back, do something
   * @param {object} context - context instance
   * @param {object} params - current state params
   * @param {object} nextState - next state
   * @param {object} nextParams - next state params
   */
  onBackExited(context, params, nextState, nextParams) {}

}

export default BaseState;
