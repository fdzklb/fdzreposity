module.exports = {
  /**
   * Format Date
   * e.g.
   * format(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
   * format(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
   *
   * @param {object} date - the date to format
   * @param {string} formatStr - the format string
   * @returns {string} - date format string
   */
  format(date, formatStr) {
    if (!date) {
      return;
    }

    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };

    if (/(y+)/.test(formatStr)) {
      formatStr = formatStr.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(formatStr)) {
        formatStr = formatStr.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }

    return formatStr;
  },

  /**
   * add date interval
   * @param {object} dtTmp date
   * @param {string} strInterval interval type
   * @param {number} num interval number
   * @returns {object} date instance
   */
  add(dtTmp, strInterval, num) {
    switch (strInterval) {
      case 's':
        return new Date(Date.parse(dtTmp) + 1000 * num);
      case 'n':
        return new Date(Date.parse(dtTmp) + 60000 * num);
      case 'h':
        return new Date(Date.parse(dtTmp) + 3600000 * num);
      case 'd':
        return new Date(Date.parse(dtTmp) + 86400000 * num);
      case 'w':
        return new Date(Date.parse(dtTmp) + 86400000 * 7 * num);
      case 'q':
        return new Date(
          dtTmp.getFullYear(),
          dtTmp.getMonth() + num * 3,
          dtTmp.getDate(),
          dtTmp.getHours(),
          dtTmp.getMinutes(),
          dtTmp.getSeconds()
        );
      case 'm':
        return new Date(
          dtTmp.getFullYear(),
          dtTmp.getMonth() + num,
          dtTmp.getDate(),
          dtTmp.getHours(),
          dtTmp.getMinutes(),
          dtTmp.getSeconds()
        );
      case 'y':
        return new Date(
          dtTmp.getFullYear() + num,
          dtTmp.getMonth(),
          dtTmp.getDate(),
          dtTmp.getHours(),
          dtTmp.getMinutes(),
          dtTmp.getSeconds()
        );
      default:
        return dtTmp;
    }
  },

  /**
   * dateStr transfer to date type
   * @param {string} dateStr 'yyyy-MM-dd hh:mm:ss'
   * @returns {object} Date Instance
   */
  toDate(dateStr = '') {
    const arr = dateStr.split(' ');

    if (arr && arr.length > 1) {
      const dateArr = arr[0].split('-');
      const timeArr = arr[1].split(':');

      return new Date(
        dateArr[0],
        parseInt(dateArr[1]) - 1,
        dateArr[2],
        timeArr[0],
        timeArr[1],
        timeArr[2]
      );
    }

    return null;
  },
};
