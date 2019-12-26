const logger = require('log4js').getLogger('RedshiftProvider.js');
const sqlConvertor = require('./sqlConvertor');
const dbPool = require('../dbPool').getInstance();
const BaseProvider = require('../../baseProvider');
const Message = require('../../../constant/message');

/**
 * Redshift query Provider
 * author: sharon
 */
class RedshiftProvider extends BaseProvider {

  /**
   * Redshift Provider
   * @constructor
   */
  constructor() {
    super();
    this.pool = null;
  }

  /**
   * get dbPool by db config key
   * @param {string} configKey db config key
   */
  init(configKey) {
    this.pool = dbPool.getDBPool(configKey);
  }

  /**
   * query DB by db protocol
   * @param {string} sql sql
   * @param {object} sqlParams sql params
   * @returns {object} promise
   */
  query(sql, sqlParams) {
    return new Promise((resolve, reject) => {
      if (sqlParams && sqlParams.length > 0) {
        let index = 0;
        sql = sql.replace(/\?/g, () => '$' + ++index);
      }

      logger.info(Message.format(Message.REDSHIFT_SQL, sql));
      logger.info(
        Message.format(Message.REDSHIFT_PARAMS, JSON.stringify(sqlParams))
      );

      this.pool.parameterizedQuery(sql, sqlParams, { raw: true }, function(
        err,
        res
      ) {
        if (err) {
          logger.error(Message.format(Message.REDSHIFT_ERROR, err));
          reject(err);
        } else {
          logger.info(
            Message.format(Message.REDSHIFT_RESULT, JSON.stringify(res))
          );
          resolve(res);
        }
      });
    });
  }

  /**
   * common procotol convert to redshift clause
   * @param {object} commonProcotol common procotol
   * @returns {object} Promise
   */
  sqlConvertor(commonProcotol) {
    return sqlConvertor(commonProcotol);
  }

}

module.exports = RedshiftProvider;
