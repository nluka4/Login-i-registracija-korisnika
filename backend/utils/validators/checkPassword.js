function checkPassword(passValue) {
  const checkPasswordObj = {
    message: "Valid password",
    valid: true,
  };

  if (passValue === "") {
    checkPasswordObj.message = "Please enter a password.";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (passValue.length < 8) {
    checkPasswordObj.message = "Password must contain at least 8 characters.";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (!/[A-Z]/.test(passValue)) {
    checkPasswordObj.message =
      "Password must contain at least 1 uppercase letter.";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (!/[a-z]/.test(passValue)) {
    checkPasswordObj.message =
      "Password must contain at least 1 lowercase letter.";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (!/[0-9]/.test(passValue)) {
    checkPasswordObj.message = "Password must contain at least 1 number.";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (!/[^a-zA-Z0-9]/.test(passValue)) {
    checkPasswordObj.message =
      "Password must contain at least 1 special character.";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  return checkPasswordObj;
}

module.exports = checkPassword;
