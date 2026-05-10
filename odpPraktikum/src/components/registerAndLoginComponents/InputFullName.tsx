import { useState } from "react";

export default function InputFullName() {
  const [fullName, setFullName] = useState("");
  const [errorFullName, setErrorFullName] = useState("");
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
  return (
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
  );
}
