const AdapterFactory = require('../../adapter/adapterFactory');
const HandlerType = require('../../handler/handlerType');
const AppError = require('../../common/appError');
const logger = require('log4js').getLogger('resolver.js');
const adapter = AdapterFactory.create();

// build resolver object for graphql
module.exports = {
  Query: {
    // TODO
    /**
     * Get the comment list
     * @param {object} obj - obj
     * @param {object} args - arguments
     * @param {object} context - context
     * @returns {object} Promise
     */
    getCommentList(obj, args, context) {
      const params = args.parameters;

      let isId = {};

      if(params.userId) {
        isId = {
          type: 'atom',
          field: 'userId',
          value: params.userId,
          expression: 'eq',
        }
      }else {
        isId = {
          type: 'atom',
          field: 'userName',
          value: params.userName,
          expression: 'eq',
        }
      }

      // convert to commonProtocol
      let commonProtocol = {
        operation: 'select',
        fields: [
          'userId',
          'userName',
          'comment',
        ],
        where: [isId],
      };

      return adapter
        .request(HandlerType.GET_COMMENT_LIST, commonProtocol)
        .then(result => {
          logger.info('search', result);

          return result;
        })
        .catch(errCode => {
          throw new AppError({code: errCode});
        });
    },

    getCommentLists: function (obj, args, context) {
      // convert to commonProtocol
      let protocol = {
        operation: 'select',
        fields: [
          'userId',
          'userName',
          'comment',
        ],
        where: [],
      };

      return adapter
        .request(HandlerType.GET_COMMENT_LIST, protocol)
        .then(result => {
          logger.info(result);

          return result;
        })
        .catch(errCode => {
          throw new AppError({code: errCode});
        });
    },
  },
  Mutation: {
    /**
     * Change comment
     * @param {object} obj - obj
     * @param {object} args - arguments
     * @param {object} context - context
     * @returns {object} Promise
     */
    updateComment(obj, args, context) {
      const params = args.parameters;

      let commonProtocol = {
        operation: 'update',
        where: [
          {
            type: 'atom',
            field: 'userId',
            value: params.userId,
            expression: 'eq',
          },
        ],
        fields: ['comment'],
        values: [params.comment],
      };

      // get data by adapter request
      return adapter
        .request(HandlerType.UPDATE_COMMENT, commonProtocol)
        .then(result => ({
          userId: context.userId,
        }))
        .catch(errCode => {
          throw new AppError({code: errCode});
        });
    },
    /**
     * change the password
     * @param {object} obj - obj
     * @param {object} args - arguments
     * @param {object} context - context
     * @returns {object} Promise
     */
    insertComment(obj, args, context) {
      logger.info('进入inser', args);

      const parameters = args.parameters;
      let commonProtocol = {
        operation: 'insert',
        fields: ['userName', 'comment'],
        values: [parameters.userName, parameters.comment],
      };

      // get data by adapter request
      return adapter
        .request(HandlerType.INSERT_COMMENT, commonProtocol)
        .then(result => ({
          userId: context.userId,
        }))
        .catch(errCode => {
          throw new AppError({code: errCode});
        });
    },

    deleteComment(obj, args, context) {
      const params = args.parameters;
      logger.info('resolver', params.userId);
      // TODO: 协议有问题
      let commonProtocol = {
        operation: 'delete',
        fields: [
          'userId',
          'userName',
          'comment',
        ],
        where: [
          {
            type: 'atom',
            field: 'userId',
            value: params.userId,
            expression: 'eq',
          },
        ],
      };

      // get data by adapter request
      return adapter
        .request(HandlerType.DELETE_COMMENT, commonProtocol)
        .then(result => ({
          userId: context.userId,
        }))
        .catch(errCode => {
          throw new AppError({code: errCode});
        });
    },

  },
};
