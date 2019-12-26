module.exports = {
  // define adapter key
  ADAPTER: {
    MS: 'MS',
    MOCK: 'MOCK',
  },

  // define DBConfigKey
  DBCONFIG: {
    MS: 'MS-MYSQL',
    REDSHIFT: 'MS-REDSHIFT',
  },

  // define DBType
  DBTYPE: {
    MYSQL: 'mysql',
    MONGODB: 'mongodb',
    REDSHIFT: 'redshift',
  },

  // define Protocol Key
  PROVIDER_TYPE: {
    DB: 'DB',
    HTTP: 'HTTP',
    MOCKJS: 'MOCKJS',
  },

  // define httpConfigKey
  HTTP_CONFIG: {
    MS: 'MS',
  },

  // define token auth key
  AUTH_CONFIG: {
    SECRET_KEY: 'mobisummer|secret|2018-03-19',
    ALGORITHM: 'seed',
  },
};
