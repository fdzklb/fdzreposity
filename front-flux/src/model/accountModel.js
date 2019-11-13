import BaseModel from './baseModel';
import LocalStorage from '../dataUtil/localStorage';
import LocalStoreKey from '../common/localStoreKey';
import DataChangeType from './dataChangeType';
import loginGraghql from './graphql/login.graphql';
import getUserGraghql from './graphql/getUser.graphql';
import mutateUserGraghql from './graphql/mutateUser.graphql';
import changePswGraghql from './graphql/changePassword.graphql';

/**
 * Account Model
 */
class AccountModel extends BaseModel {

  /**
   * Account Model
   */
  constructor() {
    super();
    this.localStore = LocalStorage.getInstance();

    this.account = null;
    this.token = this.localStore.getItem(LocalStoreKey.ACCESS_TOKEN);
    this.userName = this.localStore.getItem(LocalStoreKey.ACCOUNT_USERNAME);
  }

  /**
   * clear model cache data
   */
  clearCache() {
    this.account = null;
    this.token = null;
    this.userName = null;
  }

  /**
   * set token in localStorage
   * @param {string} token - token
   */
  setToken(token) {
    this.token = token;

    if (this.token === null || this.token === 'null') {
      this.localStore.clearItem(LocalStoreKey.ACCESS_TOKEN);
    } else {
      this.localStore.setItem(LocalStoreKey.ACCESS_TOKEN, this.token);
    }
  }

  /**
   * get the token
   * @returns {string} token
   */
  getToken() {
    return this.token;
  }

  /**
   * to check weather the token is validate
   * system will sign out if the token is invalidate
   * @returns {object} promise
   */
  verifyToken() {
    // get the token
    const tokenVal = this.localStore.getItem(LocalStoreKey.ACCESS_TOKEN);

    // verify the token
    return this.dataSource
      .post(
        '/user/auth',
        { token: tokenVal },
        { 'Content-Type': 'application/json;charset=utf-8' }
      )
      .then(result => result.isAuth)
      .catch(err => false);
  }

  /**
   * set userName
   * @param {string} userName - userName
   */
  setUserName(userName) {
    this.userName = userName;

    if (!this.userName || this.userName === 'null') {
      this.localStore.clearItem(LocalStoreKey.ACCOUNT_USERNAME);
    } else {
      this.localStore.setItem(LocalStoreKey.ACCOUNT_USERNAME, this.userName);
    }
  }

  /**
   * get userName
   * @returns {string} userName
   */
  getUserName() {
    return this.userName;
  }

  /**
   * login from backend
   * @param {object} params - params
   */
  login(params) {
    this.dataSource
      .query(loginGraghql, params, {
        url: '/user/login',
      })
      .then(result => {
        this.setToken(result.token);
        this.setUserName(result.userName);

        this.handleDataChange(DataChangeType.VERIFIED, {
          isOK: true,
        });
      })
      .catch(({ code }) => {
        this.setToken(null);
        this.setUserName(null);

        this.handleDataChange(DataChangeType.VERIFIED, {
          isOK: false,
          code,
        });
      });
  }

  /**
   * get account info from backend
   * @returns {object} account data
   */
  getAccount() {
    if (!this.account) {
      this.dataSource
        .query(getUserGraghql)
        .then(result => {
          this.account = { ...result };
          this.handleDataChange(DataChangeType.LOADED, {
            isOK: true,
          });
        })
        .catch(err => {
          this.handleDataChange(DataChangeType.LOADED, {
            isOK: false,
          });
        });
    }

    console.log(this.account);

    return this.account;
  }

  /**
   * save acccount info
   * @param {object} account - account object
   */
  setAccount(account) {
    this.dataSource.query(mutateUserGraghql, account)
      .then(result => {
        if (result.userId) {
          this.account = {
            ...this.account,
            ...account,
          };

          console.log(account);
          console.log(this.account);
        }

        this.handleDataChange(DataChangeType.UPDATED, {
          isOK: !!result.userId,
        });
      })
      .catch(err => {
        this.handleDataChange(DataChangeType.UPDATED, {
          isOK: false,
        });
      });
  }

  /**
   * change password
   * @param {object} params password object
   */
  changePassword(params) {
    this.dataSource.query(changePswGraghql, params)
      .then(result => {
        this.handleDataChange(DataChangeType.PWD_UPDATED, {
          isOK: !!result.userId,
        });
      })
      .catch(err => {
        this.handleDataChange(DataChangeType.PWD_UPDATED, {
          isOK: false,
        });
      });
  }

}

export default AccountModel;
