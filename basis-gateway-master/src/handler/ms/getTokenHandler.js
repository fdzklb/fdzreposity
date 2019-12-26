const EventHandler = require('./eventHandler');

/**
 * demo for query data
 */
class GetTokenHandler extends EventHandler {

  /**
   * Get Token
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
    commonProtocol.from = 'user_token';

    let query = this.provider.sqlConvertor(commonProtocol);

    // query data by DBProvider
    return this.provider
      .query(query.sql, query.sqlParams)
      .then(data => {
        if (data && data[0]) {
          return data[0].token;
        } else {
          throw this.errorCode.GET_TOKEN_FAIL;
        }
      })
      .catch(err => {
        throw err;
      });
  }

}

module.exports = GetTokenHandler;
