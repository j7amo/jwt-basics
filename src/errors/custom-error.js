// we keep this class to distinguish our own custom errors that we explicitly throw
// in the code from the ones that are thrown implicitly
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomAPIError;
