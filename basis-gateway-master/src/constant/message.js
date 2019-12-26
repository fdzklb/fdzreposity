/**
 * define all message
 */
module.exports = {
  format: (msg, ...args) => msg.replace(/\{(\d)\}/g, ($1, $2) => args[$2]),

  /**
   * Debug message
   */
  LOGGER_PARAMS: '{0} params: {1}',
  LOGGER_ERROR: '{0} error: {1}',
  LOGGER_RETURNS: '{0} returns: {1}',

  /**
   * Server
   */
  SERVER_LISTEN:
    'Http Server is running at [ Port:{0} ], current environment is [ {1} ].',
  SYSTEM_ERROR: 'System Uncaught exception: {0}',
  PORT_ERROR: 'Host or Port is not set, please check.',

  /**
   * App
   */
  PING_SUCCESS: 'Gateway Ping Successfully!',
  GRAPHQL_ERROR: 'Graphql error: [ code: {0}, message: {1} ].',

  /**
   * Adapter
   */
  ADAPTER_ERROR: 'Create {0} adapter failed, please check.',
  MOCK_HANDLER_ERROR: 'MockHandlerFactory cannot get {0} Handler.',
  MS_HANDLER_ERROR: 'MSHandlerFactory cannot get {0} Handler.',

  /**
   * Account
   */
  USER_PSW_ERROR: 'User name or password error!',

  /**
   * Handler
   */
  NOT_DEFINED: '{0} is not defined, please check.',
  FIND_FILE: 'Find file {0}.js',

  /**
   * db
   */
  DBCONFIG_ERROR: 'Please add dbConfig in "./config" file.',
  DB_SUCCESS: 'Create dbPool successfully, by config: {0}',
  DBTYPE_ERROR: 'DBType "{0}" is not define in "./config" file.',
  REDSHIFT_SQL: '[ Redshift Statement ]: {0}',
  REDSHIFT_PARAMS: '[ Redshift Params ]: {0}',
  REDSHIFT_ERROR: '[ Redshift Error ]: {0}',
  REDSHIFT_RESULT: '[ Redshift Result ]: {0}',
  MYSQL_SQL: '[ Mysql Statement ]: {0}',
  MYSQL_PARAMS: '[ Mysql Params ]: {0}',
  MYSQL_ERROR: '[ Mysql Error ]: {0}',
  MYSQL_RESULT: '[ Mysql Result ]: {0}',
  CONNECT_ERROR: '[MySQL database disconnect error]: {0}',
  TRANS_ERROR: '[Begin Transaction Error]: {0}',
  TRANS_COMMIT: 'Transaction commit: {0}',
  TRANS_ROLL_ERROR: '[Transaction Rollback Error]: {0}',
  TRANS_COMMIT_ERROR: '[Transaction Commit Error]: {0}',
  TRANS_ROLL_COMMIT_ERROR: '[Transaction Rollback after Commit Error]: {0}',
  ARRAY_TYPE_ERROR: 'Params error, please enter an array',

  /**
   * http
   */
  HTTP_CONFIG_ERROR:
    'HttpConfig "{0}" is not define in "./config" file, please check.',
  HTTP_REQ_OPT: '[Http Request Options]: {0}',
  HTTP_REQ_BODY: '[Http Request Body]: {0}',
  HTTP_RES_RESULT: '[Http Response Result]: {0}',
  HTTP_RES_ERROR: '[Http Response Error]: {0}',
};
