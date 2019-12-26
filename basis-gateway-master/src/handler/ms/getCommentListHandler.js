const EventHandler = require('./eventHandler');
const log4js = require('log4js');
const logger = log4js.getLogger('GetCommentListHandler.js');
/**
 * Get User Handler
 */
class GetCommentListHandler extends EventHandler {

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
    commonProtocol.from = 'comment';
    const { sql, sqlParams } = this.provider.sqlConvertor(commonProtocol);
    logger.info('sql语句：', sql, sqlParams);

    return this.provider
      .query(sql, sqlParams)
      .then(result => {
        if (!result || !result[0]) {
          throw this.errorCode.GET_USER_FAIL;

        }

        logger.info(result);
        
        return result;
      })
      .catch(err => {
        throw err;
      });
  }

}

module.exports = GetCommentListHandler;
