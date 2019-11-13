import BaseState from './baseState';
import EventType from '../../common/eventType';
import LocationChangeType from '../../common/locationChangeType';
// import CommandType from '../../common/commandType';
import StateType from './stateType';
import {NavigationPath} from '../../common/navigation';
import TopViewType from '../../common/topViewType';

/**
 * Account Module State
 */
class CommentState extends BaseState {

  /**
   * Handle Event
   * @param {object} context - context instance
   * @param {string} eventType - event type
   * @param {object} params - event params
   */
  handleEvent(context, eventType, params = {}) {

    switch (eventType) {
      case EventType.COMMENT_ADD_CLICK:
        context.insertComment(params);
        break;
      case EventType.COMMENT_ADD_SUCCESS:
      case EventType.COMMENT_COMMENTLIST_CLICK:
        context.switchState(StateType.COMMENTLIST, {
          path: NavigationPath.COMMENTLIST,
          params: params,
          topView: TopViewType.COMMENTLIST,
        });
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

export default CommentState;
