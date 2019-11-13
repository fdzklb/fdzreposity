import React from 'react';
import BaseView from '../../baseView';
import Accounts from './accounts.js';

/**
 * Account Component
 */
class Account extends BaseView {

  /**
   * render
   * @returns {object} jsx
   */
  render() {
    return <Accounts {...this.props} />;
  }

}

export default Account;
