const EventHandler = require('./eventHandler');
const logger = require('log4js').getLogger('GetUserHandler.js');
/**
 * Get User Handler
 */
class GetUserHandler extends EventHandler {

  /**
   * Get User Info
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
    logger.info('sql语句：', sql, sqlParams);

    return this.provider
      .query(sql, sqlParams)
      .then(result => {
        if (!result || !result[0]) {
          throw this.errorCode.GET_USER_FAIL;
        }

        return result[0];
      })
      .catch(err => {
        throw err;
      });
  }

}

module.exports = GetUserHandler;
