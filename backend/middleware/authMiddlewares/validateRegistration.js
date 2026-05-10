const checkEmail = require("../../utils/validators/checkEmail");
const checkPassword = require("../../utils/validators/checkPassword");
const usersObj = require("../../model/users.json");
function validateRegistration(req, res, next) {
  let { users } = usersObj;
  const { _username, _fullName, _email, _password, _bio } = req.body;
  let user = null;

  if (!_username || !_fullName || !_email || !_password || !_bio) {
    return res.status(400).json({ message: "Incomplete request." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Profile image is required." });
  }

  // Check if username is correct
  let usernameTrimmed = _username.trim() || 0;
  let usernameLength = usernameTrimmed.length;

  if (
    usernameTrimmed[0] === "." ||
    usernameTrimmed[usernameTrimmed.length - 1] === "."
  ) {
    return res.status(400).json({
      message: "Username cannot start or end with a dot.",
    });
  }

  if (usernameTrimmed.includes(" ")) {
    return res.status(400).json({
      message: "Username must not contain spaces.",
    });
  }

  if (usernameLength > 20) {
    return res.status(400).json({
      message: "Username cannot contain more than 20 characters.",
    });
  }

  if (!/^[A-Za-z0-9._%+-]+$/.test(usernameTrimmed)) {
    return res.status(400).json({
      message:
        "Username can contain only letters, numbers, dots, underscores, percent signs, plus signs and hyphens.",
    });
  }

  user = users?.find((el) => el._username === usernameTrimmed);

  if (user) {
    return res.status(400).json({
      message: "Username is already in use.",
    });
  }

  // Check full name
  const [firstName, lastName] = _fullName.split(" ");

  if (!firstName || !lastName) {
    return res.status(400).json({
      message: "Please enter both first name and last name.",
    });
  }

  if (firstName.length < 2) {
    return res.status(400).json({
      message: "First name must contain at least 2 characters.",
    });
  }

  if (firstName.length > 30) {
    return res.status(400).json({
      message: "First name cannot contain more than 30 characters.",
    });
  }

  if (lastName.length < 2) {
    return res.status(400).json({
      message: "Last name must contain at least 2 characters.",
    });
  }

  if (lastName.length > 30) {
    return res.status(400).json({
      message: "Last name cannot contain more than 30 characters.",
    });
  }

  // Allows letters, spaces, apostrophes and hyphens
  const fullNameRegex = /^[\p{L} '-]+$/u;

  if (!fullNameRegex.test(firstName)) {
    return res.status(400).json({
      message: "First name must not contain special characters.",
    });
  }

  if (!fullNameRegex.test(lastName)) {
    return res.status(400).json({
      message: "Last name must not contain special characters.",
    });
  }

  // Check bio
  let bioTrimmed = _bio.trim() || 0;
  let bioLength = bioTrimmed.length;

  if (bioLength > 300) {
    return res.status(400).json({
      message: "Biography cannot contain more than 300 characters.",
    });
  }

  // Check email
  const notifyIfEmailIsValid = checkEmail(_email, req.originalUrl);

  if (!notifyIfEmailIsValid.valid) {
    return res.status(400).json({ message: notifyIfEmailIsValid.message });
  }

  // Check password
  const notifyIfPasswordIsValid = checkPassword(_password);

  if (!notifyIfPasswordIsValid.valid) {
    return res.status(400).json({ message: notifyIfPasswordIsValid.message });
  }

  next();
}

module.exports = validateRegistration;
