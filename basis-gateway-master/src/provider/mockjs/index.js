const BaseProvider = require('../baseProvider');
const logger = require('log4js').getLogger();

/**
 * Mock Provider Class
 * author: sharon
 */
class MockJSProvider extends BaseProvider {

  /**
   * mockjs provider
   * @constructor
   */
  constructor() {
    super();
    this._dataSource = {};
  }

  /**
   * Get Instance
   * @returns {object} instance
   */
  static getInstance() {
    if (MockJSProvider._instance === undefined) {
      MockJSProvider._instance = new MockJSProvider();
    }

    return MockJSProvider._instance;
  }

  /**
   * init dataSource
   * @param {string} config mockData config
   */
  init(config) {
    // get mock data
    if (config && config.dataKey) {
      if (this._dataSource[config.dataKey] == undefined) {
        this._dataSource[config.dataKey] = config.data;
      }

      logger.debug(
        `[Init DataSource]: ${JSON.stringify(this._dataSource[config.dataKey])}`
      );
    }
  }

  /**
   * query data by filter
   * @param {string} key - query key
   * @param {object} protocol - commom protocal
   * @returns {object} - query result
   */
  query(key, protocol) {
    let data, total, updateCount, deleteCount, insertCount;

    // data source map
    if (!this._dataSource || !this._dataSource[key]) {
      throw new Error(`dataSource[${key}] is not be inited, please check.`);
    }

    data = this._dataSource[key];
    total = data.length;

    // data filter
    if (protocol.where) {
      data = this._filterData(data, protocol.where);
      total = data.length;
      logger.debug(`Mock Filter: ${JSON.stringify(data)}`);
    }

    switch (protocol.operation) {
      case 'select':
        // data groupBy
        if (protocol.group) {
          data = this._groupByData(
            data,
            protocol.group,
            protocol.having,
            protocol.fields
          );
          total = data.length;
        }

        // data order
        if (protocol.order) {
          data = this._orderByData(data, protocol.order);
        }

        // data limit
        if (protocol.limit) {
          data = this._limitData(data, protocol.limit);
        }

        // select fields
        if (protocol.fields) {
          data = this._selectFields(data, protocol.fields);
        }

        break;
      case 'update':
        if (protocol.fields && protocol.values) {
          updateCount = data.length;
          data = this._updateData(key, data, protocol.fields, protocol.values);
        }

        break;
      case 'insert':
        if (protocol.fields && protocol.values) {
          data = this._insertData(key, protocol.fields, protocol.values);
          insertCount = 1;
          total += 1;
        }

        break;
      case 'delete':
        deleteCount = data.length;
        data = this._deleteData(key, data);
        total -= deleteCount;
        break;
      default:
        throw new Error(
          `CommonProtocol.operation is ${
            protocol.operation
          } that cannot be resolved.`
        );
    }

    // return data
    let result = {
      list: data,
      total: total,
      updateCount: updateCount,
      deleteCount: deleteCount,
      insertCount: insertCount,
    };

    logger.info(`MockProvider Query Result: ${JSON.stringify(result)}`);

    // asyc return
    return Promise.resolve(result);
  }

  /**
   *  filter data by condition
   * @param {object} data - the data to filter
   * @param {object} where - the where condition
   * @returns {object} - the filter data
   */
  _filterData(data, where) {
    return data.filter(src => this._recursiveFilter(where, src));
  }

  /**
   * recursion analysis filter
   * @param {object} where select condition
   * @param {object} src  data source
   * @param {string} logic condition logic: 'and', 'or'
   * @returns {object} - the filter data
   */
  _recursiveFilter(where, src, logic) {
    // the first floor is 'and' logic;
    logic = logic || 'and';
    let isFilter = logic == 'and';

    where.forEach(item => {
      let res;

      if (item.type === 'atom') {
        let srcVal = src[item.field];

        switch (item.expression) {
          case 'in':
            res = item.value.indexOf(srcVal) > -1;
            break;
          case 'not in':
            res = item.value.indexOf(srcVal) < 0;
            break;
          case 'eq':
            res = item.value[0] == srcVal;
            break;
          case 'not eq':
            res = item.value[0] != srcVal;
            break;
          case 'ge':
            res = srcVal >= item.value[0];
            break;
          case 'gt':
            res = srcVal > item.value[0];
            break;
          case 'lt':
            res = srcVal < item.value[0];
            break;
          case 'le':
            res = srcVal <= item.value[0];
            break;
          case 'between':
            res = srcVal <= item.value[1] && srcVal >= item.value[0];
            break;
          case 'not between':
            res = srcVal > item.value[1] || srcVal < item.value[0];
            break;
          case 'like':
            res = srcVal.indexOf(item.value[0]) > -1;
            break;
          case 'not like':
            res = srcVal.indexOf(item.value[0]) < 0;
            break;
          default:
            throw new Error(
              `MockJSProvider ${item.expression} cannot be resolved.`
            );
        }

        res = !item.value || item.value.length == 0 || res;
      } else {
        res = this._recursiveFilter(item.filters, src, item.logic);
      }

      if (logic == 'or') {
        isFilter = isFilter || res;
      } else {
        isFilter = isFilter && res;
      }
    });

    return isFilter;
  }

  /**
   * group by data by condition
   * @param {object} data the data to group by
   * @param {object} group the group rule
   * @param {object} having the having rule
   * @param {object} fields fields to be selected
   * @returns {object} the group by result
   */
  _groupByData(data, group, having, fields) {
    let groupArr = this._groupBy(data, item => group.map(field => item[field]));

    logger.debug(`Group Dicts: ${JSON.stringify(groupArr)}`);

    // grouped fields mapping
    let aggreDict = this._getGroupField(fields);

    logger.debug(`aggreDict: ${JSON.stringify(aggreDict)}`);

    // group result
    let result = [];
    groupArr.forEach(group => {
      let groupItem = {};

      group.forEach(item => {
        let aggreVal = {};

        for (let field in item) {
          let aggreItem = aggreDict[field];

          if (aggreItem) {
            // init calculate value
            if (aggreVal[field] === undefined) {
              aggreVal[field] = 0;
            }

            // calculate the grouped field
            switch (aggreItem.method) {
              // sum()
              case 'sum':
                aggreVal[field] += item[field];
                break;
              // count()
              case 'count':
                aggreVal[field] += 1;
                break;
              default:
                break;
            }
          } else {
            // set the non-grouped field
            groupItem[field] = item[field];
          }
        }

        Object.keys(aggreVal).forEach(field => {
          groupItem[aggreDict[field].groupFieldName] = aggreVal[field];
        });
      });

      result.push(groupItem);
    });

    logger.info(
      `grouped data count: ${result.length}\ngrouped data: ${JSON.stringify(
        result
      )}`
    );

    // TODO: resolve having
    return result;
  }

  /**
   * get group fields mapping
   * @param {object} fields - fields
   * @returns {object} returns the group field
   */
  _getGroupField(fields) {
    let aggreDict = {};
    fields.forEach(field => {
      let repSum = /sum\((\S+)\) as (\S+)/.exec(field.trim());
      let repCount = /count\((\S+)\) as (\S+)/.exec(field.trim());

      if (repSum) {
        aggreDict[repSum[1]] = {
          method: 'sum',
          groupFieldName: repSum[2],
        };
      } else if (repCount) {
        aggreDict[repCount[1]] = {
          method: 'count',
          groupFieldName: repCount[2],
        };
      }
    });

    return aggreDict;
  }

  /**
   * groupBy array
   * @param {object} array - the data source
   * @param {function} func - the function
   * @returns {object} groupby result
   */
  _groupBy(array, func) {
    let groups = {};
    array.forEach(item => {
      let group = JSON.stringify(func(item));
      groups[group] = groups[group] || [];
      groups[group].push(item);
    });

    return Object.keys(groups).map(group => groups[group]);
  }

  /**
   * filter selected fields
   * @param {object} data the datasource
   * @param {object} fields fields to be selected
   * @returns {object} returns the selected data
   */
  _selectFields(data, fields) {
    return data.map(item => {
      let select = {};
      fields.forEach(field => {
        let repSum = /sum\((\S+)\) as (\S+)/.exec(field.trim());
        let repCount = /count\((\S+)\) as (\S+)/.exec(field.trim());

        if (repSum) {
          select[repSum[2]] = item[repSum[2]];
        } else if (repCount) {
          select[repCount[2]] = item[repCount[2]];
        } else {
          select[field] = item[field];
        }
      });

      return select;
    });
  }

  /**
   * data order
   * @param {object} data the datasource
   * @param {object} order the order
   * @returns {object} returns the selected data
   */
  _orderByData(data, order) {
    order.forEach(item => {
      let orderField = item.field;
      let isAsc = item.type ? item.type.toUpperCase() == 'ASC' : true;

      data.sort(function(a, b) {
        let compare = isAsc
          ? a[orderField] - b[orderField]
          : b[orderField] - a[orderField];

        return compare;
      });
    });

    return data;
  }

  /**
   * data pagination
   * @param {object} data the datasource
   * @param {object} limit the limit
   * @returns {object} returns the limit data
   */
  _limitData(data, limit) {
    let total = data.length;
    let start = (limit.page - 1) * limit.pageSize;
    let end =
      limit.page * limit.pageSize > total ? total : limit.page * limit.pageSize;

    data = data.filter((item, index) => index >= start && index <= end - 1);

    return data;
  }

  /**
   * mutate data by filter
   * @param {string} key - the key of datasource
   * @param {object} data - the data of datasource
   * @param {object} fields - the fields to be updated
   * @param {object} values - the values to be updated
   * @returns {object} returns the datasource
   */
  _updateData(key, data, fields, values) {
    for (let i = 0, len = data.length; i < len; i++) {
      let item = data[i];
      fields.forEach((field, index) => {
        item[field] = values[index];
      });

      this._dataSource[key] = this._dataSource[key].map(source => {
        if (source.id == item.id) {
          return item;
        }

        return source;
      });
    }

    return this._dataSource[key];
  }

  /**
   * remove data by filter
   * @param {string} key - the key of datasource
   * @param {object} fields - the fields to be inserted
   * @param {object} values - the values to be inserted
   * @returns {object} returns the datasource
   */
  _insertData(key, fields, values) {
    let item = {
      id: Math.floor(Math.random() * 1000) + 100,
    };

    fields.forEach((field, index) => {
      if (field !== 'id') {
        item[field] = values[index];
      }
    });

    this._dataSource[key].push(item);

    return this._dataSource[key];
  }

  /**
   * remove data
   * @param {string} key - the key of datasource
   * @param {object} data - the data to be removed
   * @returns {object} returns the data after delete
   */
  _deleteData(key, data) {
    let delIds = data.map(item => item.id);

    this._dataSource[key] = this._dataSource[key].filter(
      source => delIds.indexOf(source.id) < 0
    );

    return this._dataSource[key];
  }

}

module.exports = MockJSProvider;
