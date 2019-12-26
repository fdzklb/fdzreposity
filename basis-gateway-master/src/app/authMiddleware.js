const auth = require('./auth').getInstance();
const HttpCode = require('../constant/httpCode');
const logger = require('log4js').getLogger('authMiddleware.js');

const middlewareWrapper = function () {
  return function authMiddleware(req, res, next) {
    const token = req.headers['x-ms-access-token'];
    auth.verifyToken(token)
      .then(verified => {
        if (verified.isAuth) {
          req.body.variables.userId = verified.userId;
          next();
        } else {
          res.status(HttpCode.UNAUTHORIZED).send({
            errors: [
              {
                code: HttpCode.UNAUTHORIZED,
              },
            ],
          })
        }
      })
      .catch(err => {
        logger.error(err);
        res.status(HttpCode.UNAUTHORIZED).send({
          errors: [
            {
              code: HttpCode.UNAUTHORIZED,
              message: err,
            },
          ],
        });
      });
  };
};

module.exports = middlewareWrapper;
