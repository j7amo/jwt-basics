const login = async (req, res) => {
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
