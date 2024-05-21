import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

async function createUser({ userName, password, email }) {
  try {
    const url = new URL(apiUrl + "/create-user");
    url.searchParams.set("user", userName);
    url.searchParams.set("password", password);
    url.searchParams.set("email", email);

    const res = await fetch(url);
    if (!res.ok) {
      return [false, "No Internet"];
    }

    const jsonRes = await res.json();

    if (jsonRes.error) {
      return [false, jsonRes.error];
    }

    return [true, { user: userName, password, email }];
  } catch (error) {
    return [false, error];
  }
}

function CreateAccount({ setAuth }) {
  const [error, setError] = useState();

  const navigate = useNavigate();

  const userNameInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    const userName = userNameInput.current?.value;
    const password = passwordInput.current?.value;
    const email = emailInput.current?.value;

    const result = await createUser({ userName, password, email });

    if (result[0]) {
      setError("User Created");

      setAuth(result[1]);

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } else {
      setError(result[1]);
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>Create Account</h2>
      <input
        name="username"
        type="text"
        ref={userNameInput}
        placeholder="Username..."
      />
      <input
        name="email"
        type="email"
        ref={emailInput}
        placeholder="Email..."
      />
      <input
        name="password"
        type="text"
        ref={passwordInput}
        placeholder="Password..."
      />
      <p style={{ color: "red" }}>{error}</p>
      <button>Create Account</button>
    </form>
  );
}

export default CreateAccount;
