const bcrypt = require("bcrypt");

async function cryptPassword(req, res, next) {
  const { _password } = req.body;

  const hash = await bcrypt.hash(_password, 10);

  req.body._password = hash;

  next();
}

module.exports = cryptPassword;
