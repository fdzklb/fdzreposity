const { ADAPTER, DBCONFIG, HTTP_CONFIG } = require('../constant');

module.exports = {
  /**
   * server port
   */
  port: 4000,

  /**
   * server host
   */
  host: `http://localhost:${this.port}`,

  /**
   * log4js config
   */
  logConfig: {
    appenders: {
      out: { type: 'stdout' },
      file: {
        type: 'dateFile',
        filename: './log/cheese.log',
        daysToKeep: 7,
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
        level: 'debug',
      },
    },
  },

  /**
   * adapter config
   * options: 'ADAPTER.MS' or 'ADAPTER.MOCK'
   */
  adapterConfig: ADAPTER.MS,

  /**
   * db Protocol config
   */
  dbConfig: {
    [DBCONFIG.MS]: {
      type: 'mysql',
      connection: {
        host: '172.24.2.26',
        user: 'mobi',
        password: 'mobisummer2112',
        database: 'ped-demo',
        port: 3306,
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
   * token expire time, time unit: (ms)
   */
  tokenExpireTime: 12 * 60 * 60 * 1000,
};
