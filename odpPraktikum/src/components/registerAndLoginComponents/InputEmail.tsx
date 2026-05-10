import { useState } from "react";

type ValidationState = {
  email: boolean;
  password: boolean;
};

type InputEmailProps = {
  setValidation: React.Dispatch<React.SetStateAction<ValidationState>>;
};

export default function InputEmail({ setValidation }: InputEmailProps) {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

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
  return (
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
  );
}
