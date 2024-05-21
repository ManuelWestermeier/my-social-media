import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

async function logIn({ userName, password, email }) {
  try {
    const url = new URL(apiUrl + "/login");
    url.searchParams.set("user", userName);
    url.searchParams.set("password", password);
    url.searchParams.set("email", email);

    const res = await fetch(url);
    if (!res.ok) {
      return [false, "No Internet"];
    }

    const jsonRes = await res.json();

    if (!jsonRes[0]) {
      return [false, jsonRes[1]];
    }

    return [true, { user: userName, password, email }];
  } catch (error) {
    return [false, error];
  }
}

function Login({ setAuth }) {
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

    const result = await logIn({ userName, password, email });

    if (result[0]) {
      setError("Auth successfully");

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
      <h2>Login</h2>
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
        type="password"
        ref={passwordInput}
        placeholder="Password..."
      />
      <p style={{ color: "red" }}>{error}</p>
      <button>Login</button>
    </form>
  );
}

export default Login;
