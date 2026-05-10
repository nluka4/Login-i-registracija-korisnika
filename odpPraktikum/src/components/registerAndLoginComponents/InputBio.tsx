import { useState } from "react";

export default function InputBio() {
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");
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
  );
}
