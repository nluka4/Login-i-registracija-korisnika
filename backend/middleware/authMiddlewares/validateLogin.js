const checkEmail = require("../../utils/validators/checkEmail");
const checkPassword = require("../../utils/validators/checkPassword");

function validateLogin(req, res, next) {
  const { _email, _password } = req.body;

  if (!_email || !_password) {
    return res.status(404).send("Nepotpun request");
  }

  const notifyIfEmailIsValid = checkEmail(_email, req.originalUrl);
  if (!notifyIfEmailIsValid.valid) {
    res.status(404).send(notifyIfEmailIsValid.message);
    return;
  }

  const notifyIfPasswordIsValid = checkPassword(_password);
  if (!notifyIfPasswordIsValid.valid) {
    res.status(404).send(notifyIfPasswordIsValid.message);
    return;
  }

  next();
}

module.exports = { validateLogin };
