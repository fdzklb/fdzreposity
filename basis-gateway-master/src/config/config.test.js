const { ADAPTER, DBCONFIG, HTTP_CONFIG } = require('../constant');

module.exports = {
  /**
   * server port
   */
  port: 4000,

  /**
   * server host
   */
  host: 'http://localhost:4000',

  /**
   * log4js config
   */
  logConfig: {
    appenders: {
      out: { type: 'stdout' },
      file: {
        type: 'dateFile',
        filename: './log/cheese.log',
        daysTokeep: 7,
        layout: {
          type: 'pattern',
          pattern: '%d %p %c %m%n',
        },
      },
      errorLog: {
        type: 'file',
        filename: './log/error.log',
        layout: {
          type: 'pattern',
          pattern: '%d %p %c %m%n',
        },
      },
      error: {
        type: 'logLevelFilter',
        appender: 'errorLog',
        level: 'error',
      },
    },
    categories: {
      default: {
        appenders: ['out', 'error'],
        level: 'info',
      },
    },
  },

  /**
   * adapter config
   * options: 'ADAPTER.EMP' or 'ADAPTER.MOCK'
   */
  adapterConfig: ADAPTER.MS,

  /**
   * db Protocol config
   */
  dbConfig: {
    [DBCONFIG.MS]: {
      type: 'mysql',
      connection: {
        host: '172.24.2.34',
        user: 'mobi',
        password: 'mobisummer2112',
        database: 'adplatform',
        port: 3306,
      },
    },
    [DBCONFIG.REDSHIFT]: {
      type: 'redshift',
      connection: {
        host: 'moses.cmccrtmh0qgx.us-west-2.redshift.amazonaws.com',
        user: 'moses',
        password: 'MosesCenter2016',
        database: 'moses',
        port: 5439,
      },
    },
    // TODO: set more config
  },

  /**
   * http Protocol config
   */
  httpConfig: {
    [HTTP_CONFIG.MS]: 'http://192.168.0.191:8080/',
    // TODO: set more config
  },

  /**
   * token expire time, time unit: minute(min)
   */
  tokenExpireTime: 12 * 60,
};
