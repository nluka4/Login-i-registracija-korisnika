const { users } = require("../model/users.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginController(req, res) {
  const user = users.find((el) => el._email == req.body._email);

  if (!user) {
    return res.status(404).json({
      message: "Cannot find user, try again.",
    });
  }

  if (!(await bcrypt.compare(user._password, req.body._password))) {
    return res.status(404).json({
      message: "Not allowed.",
    });
  }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);

  res.status(200).json({
    message: "Uspesno si se prijavio",
    email: req.body._email,
    password: req.body._password,
    jwt: accessToken,
  });
}

module.exports = { loginController };
