const express = require('express');
const request = require('request');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { schema } = require('../graphql/schema');
const { resolver } = require('../graphql/resolver');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const logger = log4js.getLogger('app.js');
const auth = require('./auth').getInstance();
const { host } = require('../config');
const HttpCode = require('../constant/httpCode');
const ErrorCode = require('../constant/errorCode');
const Message = require('../constant/message');
const cors = require('cors');
const authMiddleware = require('./authMiddleware');

/* create http server */
const app = express();

/* build graphql schema */
const gSchema = makeExecutableSchema({ typeDefs: schema, resolvers: resolver });

/* cors */
app.use(cors());

/* body parse to json */
app.use(bodyParser.json());

/* logger all request params */
app.use(log4js.connectLogger(logger, { level: 'info' }));

/**
 * provide ping service
 */
app.get('/ping', (req, res) => {
  logger.info(Message.PING_SUCCESS);
  res.sendStatus(HttpCode.OK);
});

/**
 * auth request
 */
app.post('/user/auth', (req, res) => {
  const token = req.body.token;
  auth.verifyToken(token)
    .then(authRes => {
      if (authRes.isAuth) {
        res.json({
          data: {
            isAuth: true,
          },
        });
      } else {
        res.status(HttpCode.UNAUTHORIZED).send({
          data: {},
          errors: [
            {
              code: ErrorCode.TOKEN_INVALID,
            },
          ],
        });
      }
    });
});

/**
 * extensions function
 * @param {*} param0 object
 * @returns {object} extensions
 */
const extensions = ({
  document,
  variables,
  operationName,
  result,
  context,
}) => ({
  runTime: Date.now() - context.startTime,
  operationName,
});

/**
 * custom format error function
 * @param {object} error GraphQLError object
 * @returns {object} formatted error
 */
const customFormatErrorFn = error => {

  const { code, message } = error && error.originalError;

  logger.error(Message.format(Message.GRAPHQL_ERROR, code, message));

  return { code, message };

};

/**
 * login request
 */
app.post(
  '/user/login',
  graphqlHTTP({
    schema: gSchema,
    graphiql: false,
    context: {
      startTime: Date.now(),
    },
    extensions,
    customFormatErrorFn,
  })
);

/**
 * graphql request
 */
app.post(
  '/graphql',
  authMiddleware(),
  (req, res) => {
    graphqlHTTP({
      schema: gSchema,
      graphiql: true,
      context: {
        startTime: Date.now(),
        userId: req.body.variables.userId,
      },
      extensions,
      customFormatErrorFn,
    })(req, res);
    logger.info('huidaoleapp.index.js', res)
  },
);

/**
 * Catch all response errors
 */
app.use((err, req, res) => {
  if (err && res.status) {
    logger.error(Message.format(Message.LOGGER_ERROR, req.path, err.stack));
    res.status(HttpCode.SERVER_ERROR).send({
      errors: [{ message: err }],
    });
  }
});

module.exports = app;
