/**
 * State Factory, create state instance
 * @description returns single instance
 */
class StateFactory {

  // instance
  static _instance = {};

  /**
   * get the state instance
   * @param {string} type - state type
   * @returns {object} State Instance
   */
  static getState(type) {
    if (!type) {
      return null;
    }

    if (this._instance[type] == null) {
      try {
        const BaseState = require('./' + type + '.js').default;

        if (BaseState) {
          this._instance[type] = new BaseState();
        }
      } catch (e) {
        console.log(`[StateFactory - getState Error]: ${e}`);
      }
    }

    return this._instance[type];
  }

}

export default StateFactory;
