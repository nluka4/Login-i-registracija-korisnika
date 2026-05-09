const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const path = require("path");
const swaggerUI = require("swagger-ui-express");

async function loginController(req, res) {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../model") + "/users.json",
      "utf8",
    );

    const dataJSON = JSON.parse(data);

    const { users } = dataJSON;

    const user = users.find((el) => el._email === req.body._email);

    if (!user) {
      return res.status(404).json({
        message: "Cannot find user, try again.",
      });
    }
    if (!(await bcrypt.compare(req.body._password, user._password))) {
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
  } catch (err) {
    console.log(err);
  }
}

module.exports = { loginController };
