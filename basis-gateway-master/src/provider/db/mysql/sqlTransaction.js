const logger = require('log4js').getLogger('sqlTransaction.js');
const Message = require('../../../constant/message');

/**
 * SqlTransaction
 * @author sharon
 * @description query with transaction
 */
class SqlTransaction {

  /**
   * Sql Exec With Transaction
   * @param {object} connection - connection instance
   */
  constructor(connection) {
    // create connection
    this.connection = connection;
  }

  /**
   * Begin a transaction
   * @returns {object} Promise
   */
  beginTransaction() {
    let sqlTrans = this;

    return new Promise((resolve, reject) => {
      sqlTrans.connection.beginTransaction(err => {
        if (err) {
          logger.error(Message.format(Message.TRANS_ERROR, err));
          sqlTrans.connection.release();
          reject(err);
        } else {
          resolve(sqlTrans);
        }
      });
    });
  }

  /**
   * sql execute
   * @param {string} sql       sql
   * @param {object} sqlParams sql params
   * @param {boolean} isCommit is commit or not
   * @returns {object} promise
   */
  query(sql, sqlParams, isCommit) {
    logger.info(Message.format(Message.MYSQL_SQL, sql));
    logger.info(
      Message.format(Message.MYSQL_PARAMS, JSON.stringify(sqlParams))
    );
    logger.info(Message.format(Message.TRANS_COMMIT, isCommit));

    let sqlTrans = this;

    return new Promise((resolve, reject) => {
      sqlTrans.connection.query(
        {
          sql: sql,
          timeout: 10000,
        },
        sqlParams,
        (err, result) => {
          if (err) {
            sqlTrans.connection.rollback(rbErr => {
              if (rbErr) {
                logger.error(Message.format(Message.TRANS_ROLL_ERROR, rbErr));
              }

              sqlTrans.connection.release();
              reject(err);
            });
          } else if (isCommit) {
            sqlTrans.connection.commit(err => {
              if (err) {
                logger.error(Message.format(Message.TRANS_COMMIT_ERROR, err));

                sqlTrans.connection.rollback(rbErr => {
                  if (rbErr) {
                    logger.error(
                      Message.format(Message.TRANS_ROLL_COMMIT_ERROR, rbErr)
                    );
                  }

                  sqlTrans.connection.release();
                  reject(rbErr);
                });
              } else {
                sqlTrans.connection.release();
                logger.info(
                  Message.format(Message.MYSQL_RESULT, JSON.stringify(result))
                );

                resolve([sqlTrans, result]);
              }
            });
          } else {
            logger.info(
              Message.format(Message.MYSQL_RESULT, JSON.stringify(result))
            );

            resolve([sqlTrans, result]);
          }
        }
      );
    });
  }

  /**
   * batch query
   * @param {object} sqlArr [{sql, sqlParams}] sql array
   * @param {boolean} isCommit is commit or not
   * @returns {object} [trans, [result]]
   */
  batchQuery(sqlArr, isCommit) {
    isCommit = isCommit || false;
    const sqlTrans = this;

    if (!Array.isArray(sqlArr)) {
      throw new TypeError(Message.ARRAY_TYPE_ERROR);
    }

    if (sqlArr.length === 0) {
      return [sqlTrans, []];
    }

    const resultArr = [];
    let i = 0;

    return new Promise((resolve, reject) => {
      sqlArr.reduce(
        acc =>
          acc
            .then(([trans, result]) => {
              resultArr.push(result);
              ++i;

              if (i === sqlArr.length - 1) {
                return trans.query(
                  sqlArr[i].sql,
                  sqlArr[i].sqlParams,
                  isCommit
                );
              }

              if (i === sqlArr.length) {
                resolve([trans, resultArr]);
              }

              return trans.query(sqlArr[i].sql, sqlArr[i].sqlParams, false);
            })
            .catch(error => reject(error)),
        sqlTrans.query(
          sqlArr[i].sql,
          sqlArr[i].sqlParams,
          sqlArr.length === 1 && isCommit
        )
      );
    });
  }

}

module.exports = SqlTransaction;
