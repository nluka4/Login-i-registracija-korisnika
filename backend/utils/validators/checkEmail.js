const { users } = require("../../model/users.json");

function checkEmail(emailVal, url) {
  const checkEmailObj = {
    message: "Valid email",
    valid: true,
  };
  if (emailVal === "") {
    checkEmailObj.message = "You must fill in the email field!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (emailVal.includes(" ")) {
    checkEmailObj.message = "Email must not contain spaces!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (/[A-Z]/.test(emailVal)) {
    checkEmailObj.message = "Email must not contain uppercase letters!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (!emailVal.includes("@")) {
    checkEmailObj.message = "Email must contain (@)!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  for (let i = 0; i < emailVal.length - 1; i++) {
    if (emailVal[i] !== "@") {
      continue;
    }
    for (let j = i + 1; j < emailVal.length; j++) {
      if (emailVal[i] == emailVal[j]) {
        checkEmailObj.message = "Email can contain only one (@)!";
        checkEmailObj.valid = false;
        return checkEmailObj;
      }
    }
  }

  const [localPart, domainPart] = emailVal.split("@");

  if (
    !/^[A-Za-z0-9._%+-]+$/.test(localPart) ||
    !/^[A-Za-z0-9._%+-]+$/.test(domainPart)
  ) {
    checkEmailObj.message = "Email must not contain special characters!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }
  if (localPart === "") {
    checkEmailObj.message = "Email must have a part before (@)!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (domainPart === "") {
    checkEmailObj.message = "Please provide a domain!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (!domainPart.includes(".")) {
    checkEmailObj.message = "Email must contain a dot (.)!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (emailVal.startsWith(".") || emailVal.endsWith(".")) {
    checkEmailObj.message = "Email cannot start or end with a dot (.)!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (emailVal.includes("..")) {
    checkEmailObj.message = "Email must not contain consecutive dots!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  const domainParts = domainPart.split(".");

  for (let i = 0; i < domainParts.length; i++) {
    if (domainParts[i] === "") {
      checkEmailObj.message = "Domain is not valid!";
      checkEmailObj.valid = false;
      return checkEmailObj;
    }
  }

  const lastDomainPart = domainParts[domainParts.length - 1];

  if (lastDomainPart.length < 2) {
    checkEmailObj.message =
      "The last domain part must contain at least 2 characters!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (url.includes("register")) {
    let user = users?.find((el) => el._email === emailVal);
    if (user) {
      checkEmailObj.message = "An account with this email already exists!";
      checkEmailObj.valid = false;
      return checkEmailObj;
    }
  }
  return checkEmailObj;
}

module.exports = checkEmail;
