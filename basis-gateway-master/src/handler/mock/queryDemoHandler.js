const MockHandler = require('./mockHandler');

/**
 * demo for mocking query request
 */
class QueryDemoHandler extends MockHandler {

  /**
   * Query Demo
   * @constructor
   */
  constructor() {
    super();
    this.dataKey = 'Demo';
  }

  /**
   * set mock data
   */
  setMockData() {
    this.mockData = {
      dataKey: this.dataKey,
      data: this.Mock.mock({
        'demo|10': [
          {
            'id|+1': 1,
            'adv_id|+1': 10,
            ip: /\d\.\d\.\d\.\d/,
            'note|1': [
              'Guangzhou', 'Ramat Gan', 'Ho Chi Minh',
            ],
            createDate: new Date(),
            updateDate: new Date(),
          },
        ],
      }).demo,
    };
  }

  /**
   * fetch mock data by MockJSProvider
   * @param {object} commonProtocol - common protocol
   * @returns {object} Promise
   */
  request(commonProtocol) {
    // using BaseMock request method to mock
    return super
      .request(commonProtocol)
      .then(data =>
        // return the response data if query successully
        ({
          isSuccess: true,
          list: data.list,
          total: data.total,
        })
      )
      .catch(err =>
        // return the error msg if query failed
        ({
          isSuccess: false,
          error: err,
        })
      );
  }

}

module.exports = QueryDemoHandler;
