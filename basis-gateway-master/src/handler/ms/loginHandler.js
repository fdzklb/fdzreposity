const EventHandler = require('./eventHandler');
const auth = require('../../app/auth').getInstance();

/**
 * demo for query data
 */
class LoginHandler extends EventHandler {

  /**
   * Login
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * fetch data by service
   * @param {object} commonProtocol - common protocol
   * @returns {object} Promise
   */
  request(commonProtocol) {
    commonProtocol.from = 'user';
    const query = this.provider.sqlConvertor(commonProtocol);

    let loginResult = {};

    // query data by DBProvider
    return this.provider
      .query(query.sql, query.sqlParams)
      .then(data => {
        if (!data || !data[0]) {
          throw this.errorCode.LOGIN_MATCH_ERROR;
        }

        const user = data[0];
        const { uuid, token } = auth.generateToken(user.userId);
        const now = new Date();

        // set loginResult
        loginResult = {
          ...user,
          token,
        };

        // set token into db.
        const setTokenProtocol = {
          operation: 'insert',
          from: 'user_token',
          fields: [
            'id', 'token', 'create_time', 'update_time',
          ],
          values: [
            uuid, token, now, now,
          ],
        };
        const setToken = this.provider.sqlConvertor(setTokenProtocol);

        return this.provider.query(setToken.sql, setToken.sqlParams);
      })
      .then(res => {
        if (res.affectedRows < 1) {
          throw this.errorCode.KEEP_TOKEN_FAIL;
        }

        return loginResult;
      })
      .catch(err => {
        throw err;
      });
  }

}

module.exports = LoginHandler;
