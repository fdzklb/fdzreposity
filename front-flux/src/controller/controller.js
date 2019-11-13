import React from 'react';
import ChainComponent from '../core/chainComponent';
import RootView from './../views/root';
import Context from './context';
import EventType from '../common/eventType';
import DataSourceFactory, {
  DataSourceType,
} from '../dataUtil/dataSourceFactory';
import ModelFactory from '../model/modelFactory';
import ModelType from '../model/modelType';
import DataChangeType from '../model/dataChangeType';
import StatusCode from '../common/statusCode';
import CommandType from '../common/commandType';
import OuterEventHandler from './outerEventHandler';

/**
 * Controller
 * @description State Manager Controller
 */
class Controller extends ChainComponent {

  /**
   * Controller
   * @constructor
   * @param {object} props - react props
   */
  constructor(props) {
    super(props);

    this.rootView = null;
    this.context = null;
    this.locationModel = null;
    this.i18nModel = null;
    this.outerHandler = null;

    // init datasource config
    this.initDataSource();
  }

  /**
   * component did mount
   */
  componentDidMount() {
    this.context = new Context(this);
    this.outerHandler = new OuterEventHandler(this);

    // add listener browser event
    this.locationModel.addDataChangeListener(this.handleLocationChange);

    // init i18n
    this.i18nModel.init();
    // add listener for i18n ready
    this.i18nModel.addDataChangeListener(
      DataChangeType.READY,
      this.handleI18NReady
    );
    // add listener for i18n change
    this.i18nModel.addDataChangeListener(
      DataChangeType.CHANGE,
      this.handleI18NChange
    );
  }

  /**
   * component will unmount
   */
  componentWillUnmount() {
    this.locationModel.removeDataChangeListener(this.handleLocationChange);
    this.i18nModel.removeDataChangeListener(
      DataChangeType.READY,
      this.handleI18NReady
    );
    this.i18nModel.removeDataChangeListener(
      DataChangeType.CHANGE,
      this.handleI18NChange
    );
    this.i18nModel.destory();
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    switch (eventType) {
      case EventType.CHANGE_LANGUAGE:
        this.i18nModel.changeLanguage(params.lng);
        break;
      case EventType.REDIRECT_LOGIN:
        this.context.logout();
        this.context.handleEvent(eventType, params);
        break;
      default:
        this.context.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * process command
   * @param {string} commandType - command type
   * @param {object} params - command params
   */
  processCommand(commandType, params) {
    this.rootView.processCommand(commandType, params);
  }

  /**
   * Init DataSource
   * @private
   */
  initDataSource() {
    // init datasource
    DataSourceFactory.init(DataSourceType.gateway, {
      // 注册Http状态码拦截方法
      afterResponse: statusCode => {
        switch (statusCode) {
          case StatusCode.UNAUTHORIZED:
            this.handleEvent(EventType.REDIRECT_LOGIN);
            break;
          case StatusCode.SERVER_ERROR:
            this.handleEvent(EventType.ERROR, {
              code: StatusCode.SERVER_ERROR,
            });
            break;
          default:
            break;
        }
      },
    });
    // create model
    this.locationModel = ModelFactory.createModel(ModelType.LOCATION);
    this.i18nModel = ModelFactory.createModel(ModelType.I18N);
  }

  /**
   * init context
   * @private
   * @param {object} location - location model
   * @param {object} params - location params
   */
  initContext(location, params) {
    location = location || this.locationModel.getCurrentLocation();

    this.context.verifyToken().then(isVerified => {
      if (!isVerified) {
        // token验证失败，转化为登录事件
        this.handleEvent(EventType.REDIRECT_LOGIN, params);
      } else {
        // token验证成功，将外部浏览器事件转化为内部事件
        this.outerHandler.handleBrowserEvent(location, params);
      }
    });
  }

  /**
   * handle browser back/forward event
   * @param {object} location browser location info
   */
  handleLocationChange = location => {
    this.initContext(location);
  };

  /**
   * handle I18N ready event
   * @param {object} data - emit data
   */
  handleI18NReady = data => {
    // init context, convert browser event to inner event
    this.initContext();
  };

  /**
   * handle I18N change event
   * @param {object} data - emit data
   */
  handleI18NChange = data => {
    this.processCommand(CommandType.RELOAD_I18N, data);
  };

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return (
      <RootView
        ref={instance => {
          this.rootView = instance;
        }}
      />
    );
  }

}

export default Controller;
