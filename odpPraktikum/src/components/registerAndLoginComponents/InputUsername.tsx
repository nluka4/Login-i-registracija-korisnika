import { useState } from "react";

export default function InputUsername() {
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
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

  return (
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
  );
}
