const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const { AUTH_CONFIG } = require('../constant');
const { tokenExpireTime } = require('../config');
const AdapterFactory = require('../adapter/adapterFactory');
const HandlerType = require('../handler/handlerType');

/**
 * token验证
 */
class Auth {

  /**
   * Auth Token
   * @constructor
   */
  constructor() {
    this.adapter = AdapterFactory.create();
  }

  /**
   * Get Auth Instance
   * @returns {object} auth instance
   */
  static getInstance() {
    if (Auth._instance == null) {
      Auth._instance = new Auth();
    }

    return Auth._instance;
  }

  /**
   * Generate the token
   * @param {string} userId account id
   * @returns {string} token
   */
  generateToken(userId) {
    const timestamp = new Date().valueOf();
    const cipher = crypto.createCipher(
      AUTH_CONFIG.ALGORITHM,
      AUTH_CONFIG.SECRET_KEY
    );

    const uuid = uuidv4();
    const token =
      cipher.update(`${uuid}|${userId}|${timestamp}`, 'binary', 'hex') +
      cipher.final('hex');

    return {
      token,
      uuid,
    };
  }

  /**
   * Verify the token
   * @param {string} token - token
   * @returns {object} {isAuth: true, userId:'', token: ''}
   */
  verifyToken(token) {
    let result = Promise.resolve({ isAuth: false });

    if (token && token !== 'null') {
      const decipher = crypto.createDecipher(
        AUTH_CONFIG.ALGORITHM,
        AUTH_CONFIG.SECRET_KEY
      );
      const decrypted =
        decipher.update(token, 'hex', 'binary') + decipher.final('binary');

      let decryptArr = decrypted.split('|');

      if (decryptArr.length !== 3) {
        return result;
      }

      // get the userId and time
      const uuid = decryptArr[0];
      const userId = Number(decryptArr[1]);
      const time = Number(decryptArr[2]);

      /*
       * verify userId, affiliateId, time
       * if time < tokenExpireTime
       */
      let now = Date.now().valueOf();

      if (!userId || isNaN(time) || now - time > tokenExpireTime) {
        return result;
      }

      // match server token
      return this.adapter
        .request(HandlerType.GET_TOKEN, {
          operation: 'select',
          fields: ['token'],
          where: [
            {
              type: 'atom',
              field: 'id',
              value: [uuid],
              expression: 'eq',
            },
          ],
        })
        .then(localToken => {
          // if match the server token
          if (localToken && localToken === token) {
            return {
              isAuth: true,
              userId,
            };
          } else {
            return {
              isAuth: false,
            };
          }
        })
        .catch(err => {
          throw err;
        });
    }

    return result;
  }

}

module.exports = Auth;
