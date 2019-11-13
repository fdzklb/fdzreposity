/**
 * Model Factory
 */
class ModelFactory {

  // instance
  static _instance = {};

  /**
   * get model instance
   * @param {string} type - model type
   * @returns {object} model instance
   */
  static createModel(type) {
    if (!type) {
      return null;
    }

    if (!this._instance[type]) {
      const BaseModel = require('/' + type + '.js').default;
      this._instance[type] = new BaseModel();
    }

    return this._instance[type];
  }

  /**
   * clear model cache data
   */
  static clearCache() {
    Object.keys(this._instance).forEach(key =>
      this._instance[key].clearCache()
    );
  }

}

export default ModelFactory;
