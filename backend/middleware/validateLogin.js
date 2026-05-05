const checkEmail = require("../utils/validators/checkEmail");

function validateLogin(req, res, next) {
  const { _email, _password } = req.body;

  if (!_email || !_password) {
    res.status(404).send("Nepotpun request");
  }

  const notifyIfEmailIsValid = checkEmail(_email);
  if (!notifyIfEmailIsValid.valid) {
    res.status(404).send(notifyIfEmailIsValid.message);
  }

  next();
}

module.exports = { validateLogin };
