/**
 * transfer to thousands
 * for example
 * let num = toThousands(12345556);
 * @param {number} num - the number to be format
 * @returns {string} e.g. 455,555,666.00
 */
export const toThousands = num => {
  let numArr = (num || 0).toString().split('.');
  let result = numArr[0].replace(/(\d+?)(?=(\d{3})+$)/g, '$1,');

  if (numArr.length > 1) {
    result += '.' + numArr[1];
  }

  return result;
};
