import { useState } from "react";

export default function LoginForm() {
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
        const req = await fetch("http://localhost:3000/api/auth/loginn", {
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
  return (
    <>
      {localStorage.length > 0 ? <h1>Ima selameta</h1> : <h1>Nema selameta</h1>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Prijavi se</h1>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          name="_email"
          placeholder="email@gmail.com"
          onChange={(e) => handleSetEmail(e)}
        />
        <p>{errorEmail}</p>
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
        {validation.email === true && validation.password === true ? (
          <button>Prijavi se</button>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
