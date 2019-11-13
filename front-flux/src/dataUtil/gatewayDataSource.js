import DataSource from './dataSource';
import LocalStorage from './localStorage';
import LocalStorageKey from '../common/localStoreKey';
import HttpUtil from './httpUtil';
import { InnerServerCode } from '../common/constant';

/**
 * DataSource provider by gateway
 */
class GatewayDataSource extends DataSource {

  /**
   * GatewayDataSource
   * @param {object} options - options {afterResponse: function(){} }
   *
   */
  constructor(options) {
    super();
    this.afterResponse = options.afterResponse;
    this.defaultAPI = '/graphql';
    this.defaultHeader = {
      'Content-Type': 'application/json;charset=UTF-8',
    };

    // localStorage
    this.localStorage = LocalStorage.getInstance();
  }

  /**
   * send request by http post method
   * @param {string} url - url
   * @param {object} params - params
   * @param {object} options - options: header options from fetch()
   * @returns {object} promise
   */
  post(url, params = {}, options = {}) {
    // body stringify when content-type: application/json
    const body =
      (options['Content-Type'] || '').indexOf('application/json') > -1
        ? JSON.parse(JSON.stringify(params))
        : params;

    return HttpUtil.post(url, body, options)
      .then(response => {
        // request intercept
        if (response.statusCode && this.afterResponse) {
          this.afterResponse(response.statusCode);
        }

        if (response.errors) {
          response.errors.forEach(error => {
            if (error.code !== InnerServerCode) {
              throw error;
            }
          })
        }

        return response && response.data;
      })
      .catch(err => {
        console.log(`[post error]: ${JSON.stringify(err)}`);
        throw err;
      });
  }

  /**
   * send request by graphql protocal
   * @param {object} graphql - graphql object
   * @param {object} variables - graphql variables object
   * @param {object} options - graphql options
   * @returns {object} Promise
   */
  query(graphql, variables = {}, options = {}) {
    const token = this.localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
    let { url, ...headerOptions } = options;
    url = url || this.defaultAPI;

    const urlParams = {
      query: graphql.loc.source.body,
      operationName: '',
      variables: JSON.parse(JSON.stringify(variables)),
    };

    // merge header
    headerOptions = {
      ...headerOptions,
      ...this.defaultHeader,
      'x-ms-access-token': token,
    };

    return HttpUtil.post(url, urlParams, headerOptions)
      .then(response => {
        // request intercept
        if (response.statusCode && this.afterResponse) {
          this.afterResponse(response.statusCode);
        }

        // throw server errors
        if (response.errors) {
          response.errors.forEach(error => {
            if (error.code !== InnerServerCode.SUCCESS) {
              throw error;
            }
          })
        }

        // throw data empty error
        if (!response.data) {
          throw {
            code: InnerServerCode.GRAPHQL_EMPTY,
          }
        }

        /**
         * returns the different operationName data by Array
         */
        const dataArr = Object.keys(response.data)
          .map(key => response.data[key]);

        // if length=1, return the first json object
        if (dataArr.length === 1) {
          return dataArr[0];
        }

        return dataArr;
      })
      .catch(error => {
        console.log(`[query Error]: ${JSON.stringify(error)}`);

        throw error;
      });
  }

}

export default GatewayDataSource;
