const jwt = require('jsonwebtoken');
require('dotenv').config();
const CustomAPIError = require('../errors/custom-error');

const authMiddleware = async (req, res, next) => {
  // we extract the "Authorization" header
  const authHeader = req.headers.authorization;

  // check if it's missing OR incorrect (does not start with what we need)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401);
  }

  // if we've this far then the header is OK, and we just need to extract the token
  const token = authHeader.split(' ')[1];

  try {
    // to decode AND verify the token we use "jwt.verify"
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // we extract the properties we need
    const { id, username } = decodedData;
    // we attach these properties to "req" object
    req.user = { id, username };
    // and go to the next middleware (which is in our case is "dashboard") where
    // we can inspect the "req" object and use the newly added "user" prop
    next();
  } catch (err) {
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
};

module.exports = authMiddleware;
