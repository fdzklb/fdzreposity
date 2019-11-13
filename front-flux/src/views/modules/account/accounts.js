import React from 'react';
import BaseView from '../../baseView';
import EventType from '../../../common/eventType';
import { Tabs } from 'antd';
import AccountInfo from './accountInfo';
import ChangePassword from './changePassword';
import style from './style/accounts.scss';

const TabPane = Tabs.TabPane;

/**
 * Accounts Component
 */
class Accounts extends BaseView {

  /**
   * Accounts Component
   * @param {object} props react props
   */
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
    };
  }

  /**
   * Event Handle
   * @param {string} eventType - event types
   * @param {object} params - event params
   */
  handleEvent(eventType, params) {
    switch (eventType) {
      case EventType.ACCOUNT_TAB_CHANGE:
        this.handleTabChange(params);
        break;
      default:
        super.handleEvent(eventType, params);
        break;
    }
  }

  /**
   * change tab event
   * @param {string} key - active tab key
   */
  handleTabChange = key => {
    this.setState({
      activeTab: key,
    });
  };

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return (
      <div className={style.account_container}>
        <div className={style.account_box}>
          <Tabs
            defaultActiveKey="1"
            onChange={key =>
              this.handleEvent(EventType.ACCOUNT_TAB_CHANGE, key)
            }
          >
            <TabPane tab={this.t('account:userTitle')} key="1">
              <AccountInfo className={style.tab__margin} />
            </TabPane>
            <TabPane tab={this.t('account:passwordTitle')} key="2">
              <ChangePassword />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }

}

export default Accounts;
