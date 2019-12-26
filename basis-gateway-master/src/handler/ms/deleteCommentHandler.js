const EventHandler = require('./eventHandler');
const logger = require('log4js').getLogger('deleteCommenterHandler.js');
/**
 * update account info
 * db table is users
 */
class deleteCommenterHandler extends EventHandler {

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
    commonProtocol.from = 'comment';

    const { sql, sqlParams } = this.provider.sqlConvertor(commonProtocol);
    logger.info(sql, sqlParams);

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

module.exports = deleteCommenterHandler;
