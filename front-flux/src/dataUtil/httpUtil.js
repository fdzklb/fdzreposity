import StatusCode from '../common/statusCode';

/**
 * Http Request Util
 */
class HttpUtil {

  /**
   * post request
   * @param {string} url - url
   * @param {object} params - params
   * @param {object} headerOptions - header options from fetch()
   * @returns {object} Promise
   */
  static post(url, params = {}, headerOptions = {}) {
    const method = 'POST';

    // body stringify when content-type: application/json
    const body =
      (headerOptions['Content-Type'] || '').indexOf('application/json') > -1
        ? JSON.stringify(params)
        : params;

    return HttpUtil.fetchData(
      method,
      url,
      headerOptions,
      body
    );
  }

  /**
   * get request
   * @param {string} url - url
   * @param {object} params - params
   * @param {object} headerOptions - header options from fetch()
   * @returns {object} Promise
   */
  static get(url, params = {}, headerOptions = {}) {
    const method = 'GET';

    // if has params, add to url
    if (params && Object.keys(params).length > 0) {
      let paramsArray = [];

      Object.keys(params)
        .forEach(key => paramsArray.push(key + '=' + params[key]))

      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }

    return HttpUtil.fetchData(
      method,
      url,
      headerOptions
    )
  }

  /**
   * fetchData
   * @param {string} method method
   * @param {string} url - url
   * @param {object} headerOptions - header options from fetch()
   * @param {object} body - params
   * @returns {object} Promise
   */
  static fetchData(method, url, headerOptions, body) {
    let options = {
      method: method,
      headers: new Headers(headerOptions),
      mode: 'cors',
    }

    // post must be with body
    if (method === 'POST') {
      options.body = body;
    }

    return fetch(url, options)
      .then(response => {
        // return the json format if request success
        if (response.ok) {
          return response.json();
        }

        // return the response status if request failed
        return {
          data: {},
          errors: [{
            code: response.status,
            message: response.statusText,
          }],
          statusCode: response.status,
        };
      })
      .then(data => data)
      .catch(error => {
        console.error(`Fetch Error: ${error} `);

        return {
          data: {},
          errors: [{
            code: StatusCode.SERVER_ERROR,
            message: error,
          }],
          statusCode: StatusCode.SERVER_ERROR,
        }
      });
  }

}

export default HttpUtil;
