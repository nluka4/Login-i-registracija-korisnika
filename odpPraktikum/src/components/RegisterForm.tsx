import InputUsername from "./registerAndLoginComponents/InputUsername";
import InputFullName from "./registerAndLoginComponents/InputFullName";
import InputEmail from "./registerAndLoginComponents/InputEmail";
import InputPassword from "./registerAndLoginComponents/InputPassword";
import InputBio from "./registerAndLoginComponents/InputBio";
import { useState } from "react";
export default function RegisterForm() {
  const [validation, setValidation] = useState({
    password: false,
    email: false,
  });
  // function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
  //   e.preventDefault();
  //   try {
  //     localStorage.setItem("_e_mail_token", email);
  //     localStorage.setItem("_password_token", password);
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }

  //   async function SendReq() {
  //     try {
  //       const req = await fetch("http://localhost:3000/api/auth/login", {
  //         method: "post",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           _email: email,
  //           _password: password,
  //         }),
  //       });
  //       console.log(req);
  //     } catch (err) {
  //       console.log(err);
  //       return;
  //     }
  //   }

  //   SendReq();

  //   setEmail("");
  //   setErrorEmail("");
  //   setPassword("");
  //   setErrorPassword("");
  // }

  // email,setValidation,setEmail,setErrorEmail
  return (
    <>
      {localStorage.length > 0 ? <h1>Ima selameta</h1> : <h1>Nema selameta</h1>}
      <h1>Prijavi se</h1>
      {/* onSubmit={(e) => handleSubmit(e) */}
      <form>
        <InputUsername />
        <InputFullName />
        <InputEmail setValidation={setValidation} />
        <InputPassword setValidation={setValidation} />
        <InputBio />
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
