import { useState } from "react";

type ValidationState = {
  email: boolean;
  password: boolean;
};

type InputEmailProps = {
  setValidation: React.Dispatch<React.SetStateAction<ValidationState>>;
};

export default function InputPassword({ setValidation }: InputEmailProps) {
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

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
  );
}
