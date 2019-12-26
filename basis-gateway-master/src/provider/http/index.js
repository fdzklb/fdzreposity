const BaseProvider = require('../baseProvider');
const { httpConfig } = require('../../config');
const logger = require('log4js').getLogger('httpProvider.js');
const URL = require('url');
const Message = require('../../constant/message');

/**
 * Http Provider
 */
class HttpProvider extends BaseProvider {

  /**
   * init host config
   * @param {string} configKey - config key
   */
  init(configKey) {
    // set http config host
    this.httpHost = httpConfig[configKey];

    if (!this.httpHost) {
      throw new Error(Message.format(Message.HTTP_CONFIG_ERROR, configKey));
    }
  }

  /**
   * Send http request
   * @param {string} method  http request method
   * @param {object} params request params
   * @param {object} headers request headers
   * @param {string} pathname pathname
   * @returns {object} Promise
   */
  query(method, params = {}, headers = {}, pathname = '') {
    method = method || 'GET';

    switch (method.toUpperCase()) {
      case 'POST':
        return this.post(pathname, params, headers);
      default:
        return this.get(pathname, params, headers);
    }
  }

  /**
   * http request by 'GET' method
   * @param {object} path path
   * @param {object} params request params
   * @param {object} headers request headers
   * @returns {object} return the promise
   */
  get(path, params = {}, headers = {}) {
    try {
      const url = this.httpHost + path;
      const { protocol, hostname, port, pathname } = URL.parse(url);
      const newPath = pathname + this.paramsTransform(params);

      let options = {
        protocol,
        hostname,
        port,
        path: newPath,
        headers,
        method: 'GET',
        timeout: 15000,
      };

      return this.sendRequest(options);
    } catch (e) {
      logger.error(e);

      return Promise.reject(e);
    }
  }

  /**
   * url params transform
   * @param {object} params request params
   * @returns {string} returns the encode uri
   */
  paramsTransform(params) {
    let str = '?';

    for (let [key, value] of Object.entries(params)) {
      str += `${key}=${value}&`;
    }

    return encodeURIComponent(str.substring(0, str.length - 1));
  }

  /**
   * http request by 'POST' method
   * @param {object} pathname request pathname
   * @param {object} params request params
   * @param {object} headers request headers
   * @returns {object} return the promise
   */
  post(pathname, params = {}, headers = {}) {
    try {
      const url = this.httpHost + pathname;
      const { protocol, hostname, port, path } = URL.parse(url);

      let options = {
        protocol,
        hostname,
        port,
        path,
        method: 'POST',
        headers: Object.assign(headers, {
          'Content-Type': 'application/json;charset=utf-8',
          'Content-Length': Buffer.byteLength(JSON.stringify(params)),
        }),
        timeout: 15000,
      };

      return this.sendRequest(options, params);
    } catch (e) {
      logger.error(e);

      return Promise.reject(e);
    }
  }

  /**
   * Send Http Request
   * @param {options} options - options
   * @param {objec} bodyParams - body params
   * @returns {object} Promise
   */
  sendRequest(options, bodyParams) {
    return new Promise((resolve, reject) => {
      const lib =
        options.protocol === 'https:' ? require('https') : require('http');

      // create http request and set timeout
      const req = lib.request(options).setTimeout(15000);
      const startTime = Date.now();

      req.on('response', res => {
        // body stream
        let bodyStr = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          bodyStr += chunk;
        });

        res.on('end', () => {
          let body = {};

          try {
            body = JSON.parse(bodyStr);
          } catch (err) {
            this.log(options, bodyParams, startTime, null, err);
            reject(err);
          }

          this.log(options, bodyParams, startTime, bodyStr);

          resolve(body);
        });
      });

      req.on('error', err => {
        this.log(options, bodyParams, startTime, null, err);
        req.abort();
        reject(err);
      });

      req.on('timeout', err => {
        this.log(options, bodyParams, startTime, null, err);
        req.abort();
        reject(err);
      })

      if (bodyParams) {
        req.write(JSON.stringify(bodyParams));
      }

      req.end();

    });
  }

  /**
   * log http request
   * @param {options} options - options
   * @param {object} body - body params
   * @param {*} startTime startTime
   * @param {*} result result
   * @param {*} error  error
   */
  log(options, body, startTime, result, error) {
    const runTime = Date.now() - startTime;

    logger.info(
      Message.format(Message.HTTP_REQ_OPT, JSON.stringify(options))
    );
    logger.info(
      Message.format(Message.HTTP_REQ_BODY, JSON.stringify(body))
    );

    if (error) {
      logger.error(Message.format(Message.HTTP_RES_ERROR, runTime, error));
    } else {
      logger.info(Message.format(Message.HTTP_RES_RESULT, runTime, result));
    }

  }

}

module.exports = HttpProvider;
