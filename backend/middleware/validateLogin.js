function validateLogin(req, res, next) {
  const { _email, _password } = req.body;

  if (!_email || !_password) {
    res.status(404).send("Nepotpun request");
  }

  next();
}

module.exports = { validateLogin };
