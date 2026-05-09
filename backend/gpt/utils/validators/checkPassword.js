function checkPassword(passValue) {
  const checkPasswordObj = {
    message: "Ispravna sifra",
    valid: true,
  };

  if (passValue === "") {
    checkPasswordObj.message = "Unesi sifru";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (passValue.length < 8) {
    checkPasswordObj.message = "Sifra mora imati najmanje 8 karaktera";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (!/[A-Z]/.test(passValue)) {
    checkPasswordObj.message = "Sifra mora sadrzati barem 1 veliko slovo";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (!/[a-z]/.test(passValue)) {
    checkPasswordObj.message = "Sifra mora sadrzati barem 1 malo slovo";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (!/[0-9]/.test(passValue)) {
    checkPasswordObj.message = "Sifra mora sadrzati barem 1 broj";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  if (!/[^a-zA-Z0-9]/.test(passValue)) {
    checkPasswordObj.message =
      "Sifra mora imati najmanje 1 specijalan karakter";
    checkPasswordObj.valid = false;
    return checkPasswordObj;
  }

  return checkPasswordObj;
}

module.exports = checkPassword;
