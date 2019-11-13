import React from 'react';
import BaseView from '../../baseView';
import EventType from '../../../common/eventType';
import AccountInfoDetail from './accountInfoDetail';
import AccountInfoEdit from './accountInfoEdit';

/**
 * Tab AccountInfo
 */
class AccountInfo extends BaseView {

  /**
   * AccountInfo
   * @param {object} props - react props
   */
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    switch (eventType) {
      case EventType.ACCOUNT_EDIT_SUCCESS:
        this.setState({ isEdit: false });
        super.handleEvent(eventType, params);
        break;
      case EventType.ACCOUNT_EDIT_CLICK:
        this.setState({ isEdit: true });
        break;
      case EventType.CANCEL_CLICK:
        this.setState({ isEdit: false });
        break;
      default:
        super.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return (
      <div>
        {this.state.isEdit ? <AccountInfoEdit /> : <AccountInfoDetail />}
      </div>
    );
  }

}

export default AccountInfo;
