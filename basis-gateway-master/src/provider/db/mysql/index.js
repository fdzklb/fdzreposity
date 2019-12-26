const logger = require('log4js').getLogger('mysql.js');
const sqlConvertor = require('./sqlConvertor');
const dbPool = require('../dbPool').getInstance();
const BaseProvider = require('../../baseProvider');
const SqlTransaction = require('./sqlTransaction');
const Message = require('../../../constant/message');

/**
 * MySql query Provider
 * author: sharon
 */
class MySqlProvider extends BaseProvider {

  /**
   * MySql Provider
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
   * @param {string} sql  sql
   * @param {object} sqlParams  sql params
   * @returns {object} query result
   */
  query(sql, sqlParams) {
    logger.info(Message.format(Message.MYSQL_SQL, sql));
    logger.info(
      Message.format(Message.MYSQL_PARAMS, JSON.stringify(sqlParams))
    );

    return new Promise((resolve, reject) => {
      this.pool.getConnection(function(err, conn) {
        if (err) {
          logger.error(Message.format(Message.CONNECT_ERROR, err));
          reject(err);
        } else {
          conn.query(
            {
              sql: sql,
              timeout: 10000,
            },
            sqlParams || [],
            function(err, res) {
              conn.release();

              if (err) {
                logger.error(Message.format(Message.MYSQL_ERROR, err));
                reject(err);
              } else {
                logger.info(
                  Message.format(Message.MYSQL_RESULT, JSON.stringify(res))
                );
                resolve(res);
              }
            }
          );
        }
      });
    });
  }

  /**
   * common procotol convert to mysql clause
   * @param {object} commonProcotol - common procotol
   * @returns {object} {sql:'', sqlParams:[]}
   */
  sqlConvertor(commonProcotol) {
    return sqlConvertor(commonProcotol);
  }

  /**
   * query with transaction
   * @returns {object} Promise
   */
  createTransaction() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          logger.error(Message.format(Message.CONNECT_ERROR, err));
          reject(err);
        } else {
          resolve(new SqlTransaction(conn));
        }
      });
    });
  }

}

module.exports = MySqlProvider;
