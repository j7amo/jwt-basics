// this helps us bring all exported custom errors under one file
// to simplify the future importing of these error classes
const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
};
