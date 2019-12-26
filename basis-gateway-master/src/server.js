const log4js = require('log4js');
const dbPool = require('./provider/db/dbPool').getInstance();
const { host, port, logConfig } = require('./config');
const Message = require('./constant/message');

/* set logger config */
log4js.configure(logConfig);
const logger = log4js.getLogger('server.js');

if (!port || !host) {
  throw new Error(Message.PORT_ERROR);
}

/* create database pools when server starting */
dbPool.createDBPools();

/* create app server */
const app = require('./app');

/* server listening */
app.listen(port, () => {
  logger.info(
    Message.format(Message.SERVER_LISTEN, port, process.env.NODE_ENV)
  );
});

/* All uncaughtException handle */
process.on('uncaughtException', err => {
  logger.error(Message.format(Message.SYSTEM_ERROR, err));
});
