import BaseState from './baseState';
import EventType from '../../common/eventType';
import LocationChangeType from '../../common/locationChangeType';
import StateType from './stateType';
import TopViewType from '../../common/topViewType';
import { NavigationPath } from '../../common/navigation';

/**
 * Login View State
 */
class LoginState extends BaseState {

  /**
   * Handle Event
   * @param {object} context - context instance
   * @param {string} eventType - event type
   * @param {object} params - event params
   */
  handleEvent(context, eventType, params = {}) {
    switch (eventType) {
      case EventType.LOGIN_CLICK:
        context.login(params);
        break;
      case EventType.LOGIN_SUCCESS:
        context.switchState(StateType.DASHBOARD, {
          topView: TopViewType.DASHBOARD,
          params: {},
          path: NavigationPath.DASHBOARD,
        }, true);
        break;
      default:
        break;
    }
  }

  /**
   * when the view display forward, do something
   * @param {object} context - context instance
   * @param {object} params - current state params
   * @param {object} lastState - last state
   * @param {object} lastParams - last state params
   */
  onForwardEntered(context, params, lastState, lastParams) {
    context.displayView(params, LocationChangeType.REPLACE);
  }

  /**
   * when the view hide forward, do something
   * @param {object} context - context instance
   * @param {object} params - current state params
   * @param {object} nextState - next state
   * @param {object} nextParams - next state params
   */
  onForwardExited(context, params, nextState, nextParams) { }

  /**
   * when the view diplay back, do something
   * @param {object} context - context instance
   * @param {object} params - current state params
   * @param {object} lastState - last state
   * @param {object} lastParams - last state params
   */
  onBackEntered(context, params, lastState, lastParams) {
    context.displayView(params, LocationChangeType.REPLACE);
  }

  /**
   * when the view hide back, do something
   * @param {object} context - context instance
   * @param {object} params - current state params
   * @param {object} nextState - next state
   * @param {object} nextParams - next state params
   */
  onBackExited(context, params, nextState, nextParams) { }

}

export default LoginState;
