import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorFullName, setErrorFullName] = useState("");
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [validation, setValidation] = useState({
    password: false,
    email: false,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    try {
      localStorage.setItem("_e_mail_token", email);
      localStorage.setItem("_password_token", password);
    } catch (err) {
      console.log(err);
      return;
    }

    async function SendReq() {
      try {
        const req = await fetch("http://localhost:3000/api/auth/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _email: email,
            _password: password,
          }),
        });
        console.log(req);
      } catch (err) {
        console.log(err);
        return;
      }
    }

    SendReq();

    setEmail("");
    setErrorEmail("");
    setPassword("");
    setErrorPassword("");
  }

  function handleSetUsername(e: React.ChangeEvent<HTMLInputElement>): void {
    const usernameTrimmed = e.target.value.trim() || "";
    const usernameLength = usernameTrimmed.length;
    console.log(usernameTrimmed);
    setUsername(usernameTrimmed);
    if (usernameLength === 0) {
      setErrorUsername("");
      return;
    }
    if (
      usernameTrimmed[0] === "." ||
      usernameTrimmed[usernameTrimmed.length - 1] === "."
    ) {
      setErrorUsername("Username cannot start or end with a dot.");
      return;
    }

    if (usernameTrimmed.includes(" ")) {
      setErrorUsername("Username must not contain spaces.");
      return;
    }

    if (usernameLength > 20) {
      setErrorUsername("Username cannot contain more than 20 characters.");
      return;
    }

    if (!/^[A-Za-z0-9._%+-]+$/.test(usernameTrimmed)) {
      setErrorUsername(
        "Username can contain only letters, numbers, dots, underscores, percent signs, plus signs and hyphens.",
      );
      return;
    } else {
      setErrorUsername("");
      return;
    }

    // let user = users?.find((el) => el._username === usernameTrimmed);

    // if (user) {
    //   return res.status(400).json({
    //     message: "Username is already in use.",
    //   });
    // }
  }

  function handleSetFullName(e: React.ChangeEvent<HTMLInputElement>): void {
    const rawValue = e.target.value;

    const value = rawValue.replace(/ {2,}/g, " ");

    const fullNameRegex = /^[\p{L} '-]+$/u;

    setFullName(value);

    const [firstName, lastName] = value.split(" ");

    if (!firstName || !lastName) {
      setErrorFullName("Please enter both first name and last name.");
    }

    if (firstName.length < 2) {
      setErrorFullName("First name must contain at least 2 characters.");
    }

    if (firstName.length > 30) {
      setErrorFullName("First name cannot contain more than 30 characters.");
    }

    if (lastName) {
      if (lastName.length != 0 && firstName.length != 0) {
        setErrorFullName("");
      }
      if (lastName.length < 2) {
        setErrorFullName("Last name must contain at least 2 characters.");
      }

      if (lastName.length > 30) {
        setErrorFullName("Last name cannot contain more than 30 characters.");
      }

      if (/[a-z]/.test(firstName[0]) || /[a-z]/.test(lastName[0])) {
        setErrorFullName("Name and surname must begin with a capital error.");
      }
      if (!fullNameRegex.test(firstName)) {
        setErrorFullName("First name must not contain special characters.");
      }
      if (!fullNameRegex.test(lastName)) {
        setErrorFullName("Last name must not contain special characters.");
      }
    }
  }

  function handleSetEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    const emailVal: string = e.target.value.trim();
    setEmail(emailVal);

    if (emailVal === "") {
      setErrorEmail("Moras popuniti email polje!");
      return;
    }

    if (emailVal.includes(" ")) {
      setErrorEmail("Email ne sme sadrzati razmake!");
      return;
    }

    if (/[A-Z]/.test(emailVal)) {
      setErrorEmail("Email ne moze sadrzati veliko slovo !");
      return;
    }

    if (!emailVal.includes("@")) {
      setErrorEmail("Email mora posedovati (@)");
      return;
    }

    for (let i = 0; i < emailVal.length - 1; i++) {
      if (emailVal[i] !== "@") {
        continue;
      }
      for (let j = i + 1; j < emailVal.length; j++) {
        if (emailVal[i] == emailVal[j]) {
          setErrorEmail("Email moze imati samo jedan (@)!");
          return;
        }
      }
    }

    const [localPart, domainPart] = emailVal.split("@");

    if (localPart === "") {
      setErrorEmail("Email mora imati deo pre (@)!");
      return;
    }

    if (domainPart === "") {
      setErrorEmail("Navedi domen!");
      return;
    }

    if (!domainPart.includes(".")) {
      setErrorEmail("Email mora posedovati (.) !");
      return;
    }

    if (emailVal.startsWith(".") || emailVal.endsWith(".")) {
      setErrorEmail("Email ne moze pocinjati ili se zavrsavati sa (.) !");
      return;
    }

    if (emailVal.includes("..")) {
      setErrorEmail("Ne smes imati sekvencu tacaka (...) !");
      return;
    }

    const domainParts = domainPart.split(".");

    for (let i = 0; i < domainParts.length; i++) {
      if (domainParts[i] === "") {
        setErrorEmail("Domen nije ispravan!");
        return;
      }
    }

    const lastDomainPart = domainParts[domainParts.length - 1];

    if (lastDomainPart.length < 2) {
      setErrorEmail("Zavrsni domen mora imati bar 2 karaktera!");
      return;
    }

    setErrorEmail("");
    setValidation((prevState) => ({
      ...prevState,
      email: true,
    }));
  }

  function handleSetPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    const passValue = e.target.value;

    setPassword(passValue);

    if (passValue === "") {
      setErrorPassword("Unesi sifru");
      return;
    }

    if (passValue.length < 8) {
      setErrorPassword("Sifra mora imati najmanje 8 karaktera");
      return;
    }

    if (!/[A-Z]/.test(passValue)) {
      setErrorPassword("Sifra mora sadrzati barem 1 veliko slovo");
      return;
    }

    if (!/[a-z]/.test(passValue)) {
      setErrorPassword("Sifra mora sadrzati barem 1 malo slovo");
      return;
    }

    if (!/[0-9]/.test(passValue)) {
      setErrorPassword("Sifra mora sadrzati barem 1 broj");
      return;
    }

    if (!/[^a-zA-Z0-9]/.test(passValue)) {
      setErrorPassword("Sifra mora imati najmanje 1 specijalan karakter");
      return;
    }

    setErrorPassword("");
    setValidation((prevState) => ({
      ...prevState,
      password: true,
    }));
  }

  function handleSetBio(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const value = e.target.value;

    setBio(value);

    if (value.length > 300) {
      setBioError("Biography cannot contain more than 300 characters.");
      return;
    }

    setBioError("");
  }
  return (
    <>
      {localStorage.length > 0 ? <h1>Ima selameta</h1> : <h1>Nema selameta</h1>}
      <h1>Prijavi se</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            name="_username"
            placeholder="username"
            onChange={(e) => {
              handleSetUsername(e);
            }}
          />
          <p>{errorUsername}</p>
        </div>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            name="_fullName"
            placeholder="John Johnes"
            onChange={(e) => handleSetFullName(e)}
          />
          <p>{errorFullName}</p>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            name="_email"
            placeholder="email@gmail.com"
            onChange={(e) => handleSetEmail(e)}
          />
          <p>{errorEmail}</p>
        </div>

        <div>
          <label htmlFor="passowrd">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            name="_password"
            placeholder="********"
            onChange={(e) => handleSetPassword(e)}
          />
          <p>{errorPassword}</p>
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            name="_bio"
            placeholder="..."
            onChange={(e) => handleSetBio(e)}
          />
          <p>{bioError}</p>
        </div>
        <div>
          <input
            id="fileupload"
            name="myfile"
            type="file"
            accept="jpeg, jpg, png, gif"
          />
        </div>
        {validation.email === true && validation.password === true ? (
          <button>Prijavi se</button>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
