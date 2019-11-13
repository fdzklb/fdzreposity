import BaseState from './baseState';
import EventType from '../../common/eventType';
import LocationChangeType from '../../common/locationChangeType';
import CommandType from '../../common/commandType';

/**
 * Account Module State
 */
class AccountState extends BaseState {

  /**
   * Handle Event
   * @param {object} context - context instance
   * @param {string} eventType - event type
   * @param {object} params - event params
   */
  handleEvent(context, eventType, params = {}) {
    let text = context.t('account:passwordContent.changeFail');

    switch (eventType) {
      case EventType.ACCOUNT_SAVE_CLICK:
        context.updateAccount(params);
        break;
      case EventType.PASSWORD_SAVE_CLICK:
        context.changePassword(params);
        break;
      case EventType.CHANGE_PSW_RESULT:
        if (params.isOK) {
          text = context.t('account:passwordContent.changeSuccess');
        }

        context.processCommand(CommandType.TOAST, text);
        break;
      case EventType.ACCOUNT_EDIT_SUCCESS:
        context.processCommand(
          CommandType.TOAST,
          context.t('account:editSuccess'));
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

export default AccountState;
