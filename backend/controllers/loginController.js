const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const path = require("path");

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

    const payload = {
      id: user._id,
      username: user._username,
      roles: user._role,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN);

    res.status(200).json({
      message: "Uspesno si se prijavio",
      jwt: accessToken,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { loginController };
