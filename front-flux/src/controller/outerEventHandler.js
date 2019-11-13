import EventType from '../common/eventType';
import StatusCode from '../common/statusCode';
import Navigation, { NavigationPath } from '../common/navigation';

/**
 * transfer out event to inner event
 * @description for example, brower event
 */
class OuterEventHandler {

  /**
   * OuterEventHandler
   * @param {object} controller - controller instance
   */
  constructor(controller) {
    this.controller = controller;
  }

  /**
   * tranfer browser event to inner event
   * @param {object} location {path:'', params:{}}
   * @param {object} params params
   */
  handleBrowserEvent(location, params = {}) {
    const navigation = Navigation.getInstance().parsePath(location.path);

    if (!navigation || !navigation.path) {
      this.controller.handleEvent(EventType.ERROR, {
        code: StatusCode.NOT_FOUND,
      });

      return;
    }

    // 转化为内部事件参数
    const navParams = {
      path: navigation.path,
      params: {
        ...location.params,
        ...navigation.params,
        ...params,
      },
    };

    switch (navigation.path) {
      case NavigationPath.INDEX:
      case NavigationPath.COMMENT:
        this.controller.handleEvent(EventType.REDIRECT_COMMENT, navParams);
        break;
      case NavigationPath.COMMENTLIST:
        this.controller.handleEvent(EventType.REDIRECT_COMMENTLIST, navParams);
        break;
      case NavigationPath.DASHBOARD:
        this.controller.handleEvent(EventType.REDIRECT_DASHBOARD, navParams);
        break;
      case NavigationPath.LOGIN:
        this.controller.handleEvent(EventType.REDIRECT_LOGIN, navParams);
        break;
      case NavigationPath.ACCOUNT:
        this.controller.handleEvent(EventType.REDIRECT_ACCOUNT, navParams);
        break;
      case NavigationPath.REPORT:
        this.controller.handleEvent(EventType.REDIRECT_REPORT, navParams);
        break;
      case NavigationPath.SECOND:
        this.controller.handleEvent(EventType.REDIRECT_SECOND, navParams);
        break;
      default:
        this.controller.handleEvent(EventType.ERROR, {
          code: StatusCode.NOT_FOUND,
        });
        break;
    }
  }

}

export default OuterEventHandler;
