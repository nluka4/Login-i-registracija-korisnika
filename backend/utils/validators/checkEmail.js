function checkEmail(emailVal) {
  const checkEmailObj = {
    message: "Ispravan mail",
    valid: true,
  };
  if (emailVal === "") {
    checkEmailObj.message = "Moras popuniti email polje!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (emailVal.includes(" ")) {
    checkEmailObj.message = "Email ne sme sadrzati razmake!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (/[A-Z]/.test(emailVal)) {
    checkEmailObj.message = "Email ne moze sadrzati veliko slovo !";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (!emailVal.includes("@")) {
    checkEmailObj.message = "Email mora posedovati (@)";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  for (let i = 0; i < emailVal.length - 1; i++) {
    if (emailVal[i] !== "@") {
      continue;
    }
    for (let j = i + 1; j < emailVal.length; j++) {
      if (emailVal[i] == emailVal[j]) {
        checkEmailObj.message = "Email moze imati samo jedan (@)!";
        checkEmailObj.valid = false;
        return checkEmailObj;
      }
    }
  }

  const [localPart, domainPart] = emailVal.split("@");

  if (localPart === "") {
    checkEmailObj.message = "Email mora imati deo pre (@)!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (domainPart === "") {
    checkEmailObj.message = "Navedi domen!";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (!domainPart.includes(".")) {
    checkEmailObj.message = "Email mora posedovati (.) !";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (emailVal.startsWith(".") || emailVal.endsWith(".")) {
    checkEmailObj.message =
      "Email ne moze pocinjati ili se zavrsavati sa (.) !";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  if (emailVal.includes("..")) {
    checkEmailObj.message = "Ne smes imati sekvencu tacaka (...) !";
    checkEmailObj.valid = false;
    return checkEmailObj;
  }

  const domainParts = domainPart.split(".");

  for (let i = 0; i < domainParts.length; i++) {
    if (domainParts[i] === "") {
      checkEmailObj.message = "Domen nije ispravan!";
      checkEmailObj.valid = false;
      return checkEmailObj;
    }
  }

  const lastDomainPart = domainParts[domainParts.length - 1];

  if (lastDomainPart.length < 2) {
    ("Zavrsni domen mora imati bar 2 karaktera!");
    checkEmailObj.valid = false;
    return checkEmailObj;
  }
  return checkEmailObj;
}

module.exports = checkEmail;
