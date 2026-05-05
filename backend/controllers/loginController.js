function loginController(req, res) {
  res.status(200).json({
    message: "Uspesno si se prijavio",
    email: req.body._email,
    password: req.body._password,
  });
}

module.exports = { loginController };
