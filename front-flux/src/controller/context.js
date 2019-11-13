import ModelFactory from '../model/modelFactory';
import ModelType from '../model/modelType';
import StateType from './state/stateType';
import StateFactory from './state/stateFactory';
import TopViewType from '../common/topViewType';
import CommandType from '../common/commandType';
import EventType from '../common/eventType';
import StateManager from './stateManager';
import { NavigationPath } from '../common/navigation';

/**
 * Context
 */
class Context {

  /**
   * Context
   * @param {object} controller - controller instance
   */
  constructor(controller) {
    this.controller = controller;
    this.initState = StateFactory.getState(StateType.INIT);
    this.stateManager = new StateManager(this, this.initState);
    this.stateManager.start();

    // depend model
    this.accountModel = ModelFactory.createModel(ModelType.ACCOUNT);
    this.commentModel = ModelFactory.createModel(ModelType.COMMENT);
    this.locationModel = ModelFactory.createModel(ModelType.LOCATION);
    this.i18nModel = ModelFactory.createModel(ModelType.I18N);

    // i18n translate
    this.t = this.i18nModel.t;
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params = {}) {
    const stateScene = this.getNextStateScene(eventType, params);

    /*
     * 一级View(菜单项)状态切换发生在外部
     * 其它状态切换在状态内部发生
     */
    if (stateScene) {
      // 一级View替换栈项
      if (stateScene.replace) {
        this.stateManager.replace(stateScene.state, stateScene.params);
      } else {
        // 非一级无状态的View
        this.stateManager.go(stateScene.state, stateScene.params);
      }
    } else {
      const currentState = this.stateManager.getCurrentState();

      if (currentState) {
        currentState.handleEvent(this, eventType, params);
      }
    }
  }

  /**
   * process command
   * @param {string} commandType - command type
   * @param {object} params - command params
   */
  processCommand(commandType, params) {
    this.controller.processCommand(commandType, params);
  }

  // =============== State Operation ============== //

  /**
   * switch state
   * @param {string} stateType - state type
   * @param {object} params - state params
   * @param {object} isReplace - replace the top element of stack
   */
  switchState(stateType, params, isReplace) {
    if (stateType) {
      const state = StateFactory.getState(stateType);

      if (isReplace) {
        // replace the top element of stack
        this.stateManager.replace(state, params);
      } else {
        // add new state
        this.stateManager.go(state, params);
      }
    }
  }

  /**
   * state go back
   * @param {string} stateType - state type
   * @param {object} params - state param
   */
  stateGoBack(stateType, params) {
    let state;

    if (stateType) {
      state = StateFactory.getState(stateType);
    }

    this.stateManager.back(state, params);
  }

  /**
   * getCurrentStateType
   * @returns {string} state type
   */
  getCurrentStateType() {
    return this.stateManager.getCurrentStateType();
  }

  /**
   * getCurrentStateParams
   * @returns {object} state params {path, topView, params}
   */
  getCurrentStateParams() {
    return this.stateManager.getCurrentStateParams();
  }

  /**
   * updateCurrentStateParams
   * @param {object} params params
   */
  updateCurrentStateParams(params) {
    const currentParams = this.getCurrentStateParams() || {};
    const newParams = {
      ...currentParams.params || {},
      ...params || {},
    };
    this.stateManager.updateCurrentStateParams(newParams);
  }

  /**
   * Get the next state scene
   * @param {string} eventType - event type
   * @param {object} eventParams - event params
   * @returns {object} state scene
   */
  getNextStateScene(eventType, eventParams) {
    let nextStateScene = null,
      path = eventParams && eventParams.path,
      stateType,
      topViewType,
      replace = true;

    switch (eventType) {
      case EventType.MENU_COMMENT_CLICK:
      case EventType.REDIRECT_COMMENT:
        path = path || NavigationPath.COMMENT;
        stateType = StateType.COMMENT;
        topViewType = TopViewType.COMMENT;
        break;
      case EventType.REDIRECT_COMMENTLIST:
        path = path || NavigationPath.COMMENTLIST;
        stateType = StateType.COMMENTLIST;
        topViewType = TopViewType.COMMENTLIST;
        break;
      case EventType.MENU_LOGOUT_CLICK:
      case EventType.REDIRECT_LOGIN:
        path = path || NavigationPath.LOGIN;
        stateType = StateType.LOGIN;
        topViewType = TopViewType.LOGIN;
        break;
      case EventType.MENU_DASHBOARD_CLICK:
      case EventType.REDIRECT_DASHBOARD:
        path = path || NavigationPath.DASHBOARD;
        stateType = StateType.DASHBOARD;
        topViewType = TopViewType.DASHBOARD;
        break;
      case EventType.MENU_ACCOUNT_CLICK:
      case EventType.REDIRECT_ACCOUNT:
        path = path || NavigationPath.ACCOUNT;
        stateType = StateType.ACCOUNT;
        topViewType = TopViewType.ACCOUNT;
        break;
      case EventType.MENU_REPORT_CLICK:
      case EventType.REDIRECT_REPORT:
        path = path || NavigationPath.REPORT;
        stateType = StateType.REPORT;
        topViewType = TopViewType.REPORT;
        break;
      case EventType.ERROR:
        path = path || NavigationPath.ERROR;
        stateType = StateType.ERROR;
        topViewType = TopViewType.ERROR;
        break;
      case EventType.REDIRECT_SECOND:
        path = path || NavigationPath.SECOND;
        stateType = StateType.SECOND;
        topViewType = TopViewType.SECOND;
        break;
      default:
        break;
    }

    if (stateType) {
      nextStateScene = {
        state: StateFactory.getState(stateType),
        params: {
          path: path,
          params: eventParams.params || eventParams,
          topView: topViewType,
        },
        // 是否替换栈顶状态
        replace,
      };
    }

    return nextStateScene;
  }

  /* =============== Init Operation ==============*/

  /**
   * 显示当前View
   * @param {object} params {path, params, topView}
   * @param {string} type location change type
   */
  displayView({ path, params, topView }, type) {
    // push or replace location
    this.setLocation({ path, params, type: type });
    this.transferView({ topView, params });
  }

  /**
   * transfer top view when switch state
   * @param {object} params {topView, params}
   */
  transferView({ topView, params }) {
    this.processCommand(CommandType.TRANSFER_VIEW, { topView, params });
  }

  /* =============== location process ============== */

  /**
   * to push location path
   * @param {object} params {path, params}
   * @param {string} type - location change type : ['push'|'replace'(default)]
   */
  setLocation({ path, params, type }) {
    this.locationModel.setLocation({ type, path, params });
  }

  /**
   * if NavigationPath match '/dynamic/detail/:id'
   * returns location path with params, like
   * '/dynamic/detail/1'.
   * @param {string} path - Navigation Path
   * @param {object} params - location params
   * @returns {object} merged location path
   */
  mergeLocation(path = '', params) {
    return this.locationModel.mergeLocation(path, params);
  }

  /**
   * 首页活动跳转url
   * @param {object} url url
   */
  forwardUrl(url) {
    this.locationModel.forwardLocation(url);
  }

  /**
   * back Location
   * @param {number} page page
   */
  backLocation(page) {
    this.locationModel.back(page);
  }

  /* =============== Common Module ============== */

  /**
   * copy text
   * @param {string} text - the text to copy
   */
  copy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.select();

    try {
      const result = document.execCommand('copy');
      const commandType = result
        ? CommandType.COPY_SUCCESS
        : CommandType.COPY_FAIL;
      this.processCommand(commandType);
    } catch (err) {
      this.processCommand(CommandType.COPY_FAIL);
    }

    // remove the textarea after copy.
    setTimeout(() => {
      document.body.removeChild(textArea);
    }, 100);
  }

  /* -------------Account Model-----------*/

  /**
   * to verify the account token
   * @returns {object} promise
   */
  verifyToken() {
    return this.accountModel.verifyToken();
  }

  /**
   * clear all, include token, localInfo, cache etc.
   */
  logout() {
    this.accountModel.setToken(null);
    this.accountModel.setUserName(null);
    // clear model cache
    ModelFactory.clearCache();
  }

  /**
   * login auth process
   * @param {object} params - login params
   */
  login(params) {
    this.accountModel.login(params);
  }

  /**
   * account save
   * @param {object} account - account params
   */
  updateAccount(account) {
    this.accountModel.setAccount(account);
  }

  /**
   * change password
   * @param {object} params {oldPassword:'', newPassword:''}
   */
  changePassword(params) {
    this.accountModel.changePassword(params);
  }

  /* -------------Comment Model-----------*/
  /**
   * insert comment
   * @param {object} params {userName:'', comment:''}
   */
  insertComment(params) {
    this.commentModel.insertComment(params);
  }

  /**
   * update comment
   * @param {object} params {userId:Number, comment:''}
   */
  updateComment(params) {
    this.commentModel.updateComment(params);
  }

  /**
   * delete comment
   * @param {object} params {userId:Number}
   */
  deleteComment(params) {
    this.commentModel.deleteComment(params);
  }

  /**
   * get comment
   * @param {object} params {userId:Number}
   */
  getCommentList(params) {
    this.commentModel.getCommentList(params);
  }

}

export default Context;
