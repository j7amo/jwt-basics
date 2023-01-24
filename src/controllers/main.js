// JWT stands for JSON Web Token.
// It is widely used for authentication purposes.
// In authentication, when the user successfully logs in using their credentials,
// a JSON Web Token will be returned. Whenever the user wants to access
// a protected route or resource, the user agent should send the JWT,
// typically in the Authorization header using the Bearer schema.
// The content of the header should look like the following:
// Authorization: Bearer <token>
// The server's protected routes will check for a valid JWT in the Authorization header,
// and if it's present, the user will be allowed to access protected resources.
// If the JWT contains the necessary data, the need to query the database
// for certain operations may be reduced.

// The token itself consists of 3 parts:
// - header (which is "token type" + "encoding algorithm")
// - payload (which is some useful NON-SECRET data, e.g. user id/name etc.)
// - signature (which is a combination of encoded (1)header, (2)payload and (3)secret)
// As a result the token looks like this:
// "HJGjghvjhGVRy5uy.lskdmcksdl78HJKbd7ced8.kdsjc56jkHBCDT"
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  // to validate these values we have several options:
  // - Mongoose built-in validation
  // - Joi (3rd party library)
  // - we can write our own basic validation right here
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  // to create the token we use "jwt.sign"
  const token = jwt.sign(
    // we pass payload (the smaller the better)
    { username },
    // we pass the secret
    process.env.JWT_SECRET,
    // and some options
    { expiresIn: '30d' },
  );

  // after we created the token we send it back to the user(generally
  // this token should be stored somewhere in the browser for future use)
  res.status(200).json({ msg: 'user created', token });
};

// this controller is supposed to handle requests to "/dashboard" resource
// that is a protected one and requires the token
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your lucky number: ${luckyNumber}`,
  });
};

module.exports = {
  dashboard,
  login,
};
