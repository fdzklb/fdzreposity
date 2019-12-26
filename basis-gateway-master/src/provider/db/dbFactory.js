const { dbConfig } = require('../../config');
const { DBTYPE } = require('../../constant');
const MySqlProvider = require('./mysql');
const MongodbProvider = require('./mongodb');
const RedshiftProvider = require('./redshift');
const Message = require('../../constant/message');

/**
 * DBFactory to support mysql or other db
 * author: sharon
 */
class DBFactory {

  /**
   * create DBprovider by dbConfig type
   * @param {string} configKey  DB config key
   * @returns {object} provider
   */
  static createDBProvider(configKey) {
    // get db type from config
    let type = dbConfig[configKey].type;

    switch (type) {
      // mysql
      case DBTYPE.MYSQL:
        return new MySqlProvider();
      // mongodb
      case DBTYPE.MONGODB:
        return new MongodbProvider();
      // redshift
      case DBTYPE.REDSHIFT:
        return new RedshiftProvider();
      default:
        throw new Error(Message.format(Message.DBTYPE_ERROR, configKey));
    }
  }

}

module.exports = DBFactory;
