const EventHandler = require('./eventHandler');

/**
 * Change Password Handler
 */
class ChangePasswordHandler extends EventHandler {

  /**
   * Change Password Handler
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * request for db
   * @param {object} commonProtocol - commom protocol
   * @returns {object} Promise
   */
  request(commonProtocol) {
    commonProtocol.from = 'user';
    const { sql, sqlParams } = this.provider.sqlConvertor(commonProtocol);

    return this.provider
      .query(sql, sqlParams)
      .then(result => {
        if (result.affectedRows < 1) {
          throw this.errorCode.CHANGE_PSW_FAIL;
        }

        return result;
      })
      .catch(err => {
        throw err;
      });
  }

}

module.exports = ChangePasswordHandler;
