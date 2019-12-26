const EventHandler = require('./eventHandler');

/**
 * update account info
 * db table is users
 */
class MutateUserHandler extends EventHandler {

  /**
   * Update Account
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * fetch data by service
   * @param {object} commonProtocol - common protocol
   * @returns {object} promise
   */
  request(commonProtocol) {
    commonProtocol.from = 'user';

    const { sql, sqlParams } = this.provider.sqlConvertor(commonProtocol);

    return this.provider
      .query(sql, sqlParams)
      .then(res => {
        if (res.affectedRows < 1) {
          throw this.errorCode.MUTATE_USER_FAIL;
        }

        return res;
      })
      .catch(err => {
        throw err;
      });
  }

}

module.exports = MutateUserHandler;
