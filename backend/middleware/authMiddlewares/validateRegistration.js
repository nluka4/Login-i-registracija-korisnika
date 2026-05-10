const checkEmail = require("../../utils/validators/checkEmail");
const checkPassword = require("../../utils/validators/checkPassword");
const usersObj = require("../../model/users.json");

function validateRegistration(req, res, next) {
  let { users } = usersObj;
  console.log("ALOOOOOOOOOOOOOO");
  const { _username, _fullName, _email, _password, _bio } = req.body;
  let user = null;
  let tmp = {
    username: _username,
    fullname: _fullName,
    email: _email,
    password: _password,
    bio: _bio,
  };

  if (!_username || !_fullName || !_email || !_password || !_bio) {
    return res.status(404).send("Nepotpun request");
  }

  if (!req.file) {
    return res.status(404).send("Nepotpun request");
  }

  // Check if username is correct
  let usernameTrimmed = _username.trim() || 0;
  let usernameLength = usernameTrimmed.length;

  if (
    usernameTrimmed[0] === "." ||
    usernameTrimmed[usernameTrimmed.length - 1] === "."
  ) {
    return res.status(404).json({
      message: "kosrisnicko ime ne sme pocinjati ili se zavrsavati sa tackom",
    });
  }

  if (usernameTrimmed.includes(" ")) {
    return res.status(404).json({ message: "username ne sme sadrzati space" });
  }

  if (usernameLength > 20) {
    return res
      .status(404)
      .json({ message: "username ne moze imati vise od 20 karaktea" });
  }

  if (!/^[A-Za-z0-9._%+-]+$/.test(usernameTrimmed)) {
    return res
      .status(404)
      .json({ message: "username ne moze sadrzati specijalne karaktere" });
  }

  user = users?.find((el) => el._username === usernameTrimmed);

  if (user) {
    return res.status(404).json({ message: "username je vec u upotrebi" });
  }

  //check full name
  const [firstName, lastName] = _fullName.split(" ");
  if (!firstName || !lastName) {
    return res.status(404).json({ message: "Unesi ime i prezime" });
  }

  if (firstName.length < 2) {
    return res
      .status(404)
      .json({ message: "Ime mora sadrzati barem 2 karaktera" });
  }

  if (firstName.length > 30) {
    return res
      .status(404)
      .json({ message: "Ime ne moze sadrzati vise od 30 karaktera" });
  }

  if (lastName.length < 2) {
    return res
      .status(404)
      .json({ message: "Prezime mora sadrzati barem 2 karaktera" });
  }

  if (lastName.length > 30) {
    return res
      .status(404)
      .json({ message: "Prezime ne moze sadrzati vise od 30 karaktera" });
  }

  //dozvoljava slova,space,' i -
  const fullNameRegex = /^[\p{L} '-]+$/u;

  if (!fullNameRegex.test(firstName)) {
    return res
      .status(404)
      .json({ message: "Ime ne moze sadrzati specijalne karaktere" });
  }

  if (!fullNameRegex.test(lastName)) {
    return res
      .status(404)
      .json({ message: "Prezime ne moze sadrzati specijalne karaktere" });
  }

  //check bio

  let bioTrimmed = _bio.trim() || 0;
  let bioLength = bioTrimmed.length;

  if (bioLength > 300) {
    return res
      .status(404)
      .json({ message: "Biografija ne sme sadrzati vise od 300 karaktera" });
  }

  //check image

  //check email
  const notifyIfEmailIsValid = checkEmail(_email, req.originalUrl);
  if (!notifyIfEmailIsValid.valid) {
    res.status(404).send(notifyIfEmailIsValid.message);
    return;
  }

  //check password
  const notifyIfPasswordIsValid = checkPassword(_password);
  if (!notifyIfEmailIsValid.valid) {
    res.status(404).send(notifyIfPasswordIsValid.message);
    return;
  }

  next();
}

module.exports = validateRegistration;
