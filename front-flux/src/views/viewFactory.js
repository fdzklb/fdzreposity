import asyncComponent from './common/router/components/asyncComponent';
import TopViewConfig, { ViewTemplate } from './common/topViewConfig';

/**
 * View Factory
 */
class ViewFactory {

  // instance
  static _instance = {};

  /**
   * create or get the view instance
   * @param {string} type - view type
   * @returns {object} view instance
   */
  static create(type) {
    const viewConfig = TopViewConfig[type];
    const TopView = asyncComponent(() => import('./modules' + viewConfig.path));

    if (viewConfig.template === ViewTemplate.NONE) {
      return TopView;
    }

    // if topView get the home template, do cache for view
    if (this._instance[type] === undefined) {
      this._instance[type] = TopView;
    }

    return this._instance[type];
  }

  /**
   * get all views
   * @returns {object} all views instance
   */
  static getAllViews() {
    return this._instance;
  }

  /**
   * clear all views instance
   */
  static clearAllViews() {
    this._instance = {};
  }

}

export default ViewFactory;
