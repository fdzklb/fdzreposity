const AdapterFactory = require('../../adapter/adapterFactory');
const HandlerType = require('../../handler/handlerType');
const AppError = require('../../common/appError');
const logger = require('log4js').getLogger('resolver.js');

// create an adapter instance
const adapter = AdapterFactory.create();

// build resolver object for graphql
module.exports = {
  Query: {
    /**
     * Get the user info
     * @param {object} obj - obj
     * @param {object} args - arguments
     * @param {object} context - context
     * @returns {object} Promise
     */
    getUser(obj, args, context) {
      const userId = context.userId;

      // convert to commonProtocol
      let protocol = {
        operation: 'select',
        fields: [
          'id as userId',
          'name as userName',
          'email',
          'country',
          'phone',
          'first_name',
          'last_name',
        ],
        where: [
          {
            type: 'atom',
            field: 'id',
            value: [userId],
            expression: 'eq',
          },
        ],
      };

      // get data by adapter request
      return adapter
        .request(HandlerType.GET_USER, protocol)
        .then(result => result)
        .catch(errCode => {
          throw new AppError({ code: errCode });
        });
    },

    /**
     * login
     * @param {object} obj - obj
     * @param {object} args - arguments
     * @param {object} context - context
     * @returns {object} Promise
     */
    login(obj, args, context) {
      let commonProtocol = {
        operation: 'select',
        fields: ['id userId', 'name userName'],
        where: [
          {
            type: 'atom',
            field: 'password',
            value: [args.password],
            expression: 'eq',
          },
          {
            type: 'atom',
            field: 'name',
            value: [args.name],
            expression: 'eq',
          },
        ],
      };

      // get data by adapter request
      return adapter
        .request(HandlerType.LOGIN, commonProtocol)
        .then(result => result)
        .catch(errCode => {
          throw new AppError({ code: errCode });
        });
    },
  },

  Mutation: {
    /**
     * Change account info
     * @param {object} obj - obj
     * @param {object} args - arguments
     * @param {object} context - context
     * @returns {object} Promise
     */
    mutateUser(obj, args, context) {
      const params = args.parameters;
      logger.info(params);
      let commonProtocol = {
        operation: 'update',
        where: [
          {
            type: 'atom',
            field: 'id',
            value: [context.userId],
            expression: 'eq',
          },
        ],
        fields: [
          'phone', 'email', 'country', 'first_name', 'last_name',
        ],
        values: [
          params.phone,
          params.email,
          params.country,
          params.firstName,
          params.lastName,
        ],
      };

      // get data by adapter request
      return adapter
        .request(HandlerType.MUTATE_USER, commonProtocol)
        .then(result => ({
          userId: context.userId,
        }))
        .catch(errCode => {
          throw new AppError({ code: errCode });
        });
    },

    /**
     * change the password
     * @param {object} obj - obj
     * @param {object} args - arguments
     * @param {object} context - context
     * @returns {object} Promise
     */
    changePassword(obj, args, context) {
      const parameters = args.parameters;
      let commonProtocol = {
        operation: 'update',
        where: [
          {
            type: 'atom',
            field: 'id',
            value: context.userId,
            expression: 'eq',
          },
          {
            type: 'atom',
            field: 'password',
            value: parameters.oldPassword,
            expression: 'eq',
          },
        ],
        fields: ['password'],
        values: [parameters.newPassword],
      };

      // get data by adapter request
      return adapter
        .request(HandlerType.CHANGE_PASSWORD, commonProtocol)
        .then(result => ({
          userId: context.userId,
        }))
        .catch(errCode => {
          throw new AppError({ code: errCode });
        });
    },
  },
};
