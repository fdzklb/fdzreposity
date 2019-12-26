/**
 * custom app error
 */
class AppError extends Error {

  /**
   * constructor
   * @param {object} params {code, message} code
   * @param {number} httpCode httpCode
   */
  constructor({ code, message }) {
    super(message);

    this.code = code;
  }

}

module.exports = AppError;
