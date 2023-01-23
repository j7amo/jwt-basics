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

  res.send('fake Login/Register/SignUp');
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: 'Hello, John Doe',
    secret: `Here is your lucky number: ${luckyNumber}`,
  });
};

module.exports = {
  dashboard,
  login,
};
