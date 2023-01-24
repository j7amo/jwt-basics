const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-error');

// this class will help make our code more human friendly because it is easier to understand
// from the name of the class what went wrong than to memorize numerous status codes
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
