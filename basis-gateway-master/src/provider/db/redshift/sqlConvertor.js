/**
 * recursive for query.where
 * @param {object} filter filter
 * @returns {object} {res:{}, sqlParams:[]}
 */
const filterRecursive = filter => {
  let res = '';
  let sqlParams = [];

  for (let i = 0; i < filter.length; i++) {
    if (filter[i].type === 'atom') {
      let tmpValue;

      switch (filter[i].expression) {
        case 'eq':
          res = res + filter[i].field + ' = ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'not eq':
          res = res + filter[i].field + ' != ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'ge':
          res = res + filter[i].field + ' >= ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'gt':
          res = res + filter[i].field + ' > ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'lt':
          res = res + filter[i].field + ' < ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'le':
          res = res + filter[i].field + ' <= ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'in':
          tmpValue = '(';

          for (let j = 0; j < filter[i].value.length; j++) {
            tmpValue += '?';
            sqlParams = sqlParams.concat([filter[i].value[j]]);

            if (j !== filter[i].value.length - 1) {
              tmpValue += ',';
            }
          }

          tmpValue += ')';
          res = res + filter[i].field + ' in ' + tmpValue;
          break;
        case 'not in':
          tmpValue = '(';

          for (let j = 0; j < filter[i].value.length; j++) {
            tmpValue += '?';
            sqlParams = sqlParams.concat([filter[i].value[j]]);

            if (j !== filter[i].value.length - 1) {
              tmpValue += ',';
            }
          }

          tmpValue += ')';
          res = res + filter[i].field + ' not in ' + tmpValue;
          break;
        case 'between':
          res =
            res +
            '(' +
            filter[i].field +
            ' between ' +
            '?' +
            ' and ' +
            '?' +
            ')';
          sqlParams = sqlParams.concat([filter[i].value[0]]);
          sqlParams = sqlParams.concat([filter[i].value[1]]);
          break;
        case 'not between':
          res =
            res +
            '(' +
            filter[i].field +
            ' not between ' +
            '?' +
            ' and ' +
            '?' +
            ')';
          sqlParams = sqlParams.concat([filter[i].value[0]]);
          sqlParams = sqlParams.concat([filter[i].value[1]]);
          break;
        case 'like':
          res = res + filter[i].field + ' like ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'not like':
          res = res + filter[i].field + ' not like ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'is':
          res = res + filter[i].field + ' is ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'is not':
          res = res + filter[i].field + ' is not ?';
          sqlParams = sqlParams.concat(filter[i].value);
          break;
        case 'exp':
          break;
        default:
          break;
      }
    } else if (filter[i].type === 'complex') {
      res =
        '( ' +
        res +
        '( ' +
        filterRecursive(filter[i].filters).res +
        ' )' +
        ' )';
      sqlParams = sqlParams.concat(
        filterRecursive(filter[i].filters).sqlParams
      );
    }

    if (i !== filter.length - 1) {
      if (filter[i].logic) {
        res = res + ' ' + filter[i].logic + ' ';
      } else {
        res += ' and ';
      }
    }
  }

  return { res, sqlParams };
};

/**
 * convert protocol to mysql clause.
 * @param {object} protocol - common protocol
 * @returns {object} {sql:'', sqlParams:[]}
 */
const sqlConvertor = protocol => {
  let sql = '';
  let sqlParams = [];

  const operation = protocol.operation;

  if (operation) {
    if (operation === 'select') {
      sql += 'SELECT ';
    } else if (operation === 'update') {
      sql += 'UPDATE ';
    } else if (operation === 'delete') {
      sql += 'DELETE ';
    } else if (operation === 'insert') {
      sql += 'INSERT INTO ';
    }
  }

  const fields = protocol.fields;
  const values = protocol.values;
  const from = protocol.from;
  const where = protocol.where;
  const group = protocol.group;
  const having = protocol.having;
  const order = protocol.order;
  const limit = protocol.limit;

  let tmpField, tmpValue;

  switch (operation) {
    case 'select':
      if (fields) {
        for (let i = 0; i < fields.length; i++) {
          sql += fields[i];

          if (i !== fields.length - 1) {
            sql += ', ';
          }
        }
      }

      if (from) {
        sql = sql + ' FROM ' + from;
      }

      if (where) {
        sql = sql + ' WHERE ' + filterRecursive(where).res;
        sqlParams = sqlParams.concat(filterRecursive(where).sqlParams);
      }

      if (group) {
        sql += ' GROUP BY ';

        for (let i = 0; i < group.length; i++) {
          sql += group[i];

          if (i !== group.length - 1) {
            sql += ', ';
          }
        }
      }

      if (having) {
        sql = sql + ' HAVING (' + filterRecursive(having).res + ')';
        sqlParams = sqlParams.concat(filterRecursive(having).sqlParams);
      }

      if (order) {
        sql += ' ORDER BY ';

        for (let i = 0; i < order.length; i++) {
          sql = sql + order[i].field + ' ' + order[i].type;

          if (i !== order.length - 1) {
            sql += ', ';
          }
        }
      }

      if (limit) {
        let page = limit.page;

        if (page <= 0) {
          page = 1;
        }

        sql =
          sql +
          ' LIMIT ' +
          limit.pageSize +
          ' OFFSET ' +
          (page - 1) * limit.pageSize;
      }

      break;
    case 'update':
      if (from) {
        sql += from;
      }

      sql += ' set ';

      if (fields && values) {
        for (let i = 0; i < fields.length; i++) {
          sql = sql + fields[i] + '=?';
          sqlParams = sqlParams.concat([values[i]]);

          if (i !== fields.length - 1) {
            sql += ', ';
          }
        }
      }

      if (where) {
        sql = sql + ' WHERE ' + filterRecursive(where).res;
        sqlParams = sqlParams.concat(filterRecursive(where).sqlParams);
      }

      break;
    case 'delete':
      if (from) {
        sql = sql + ' FROM ' + from;
      }

      if (where) {
        sql = sql + ' WHERE ' + filterRecursive(where).res;
        sqlParams = sqlParams.concat(filterRecursive(where).sqlParams);
      }

      break;
    case 'insert':
      if (from) {
        sql = sql + from + ' ';
      }

      tmpField = '( ';
      tmpValue = '( ';

      if (fields && values) {
        for (let i = 0; i < fields.length; i++) {
          tmpField += fields[i];
          tmpValue += '?';
          sqlParams = sqlParams.concat([values[i]]);

          if (i !== fields.length - 1) {
            tmpField += ', ';
            tmpValue += ', ';
          }
        }

        tmpField += ' )';
        tmpValue += ' )';
        sql = sql + tmpField + ' values ' + tmpValue;
      }

      break;
    default:
      break;
  }

  return { sql, sqlParams };
};

module.exports = sqlConvertor;
