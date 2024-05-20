import { useState } from "react";
import "./index.css";
import AuthPage from "../auth";

function RequestAuthPage({ isAuth, setAuth }) {
  const [isOnAuthPage, setIsOnAuthPage] = useState(false);

  if (isOnAuthPage) {
    return <AuthPage isAuth={isAuth} setAuth={setAuth} />;
  }

  return (
    <div className="request-auth">
      <p>You Have to authenticate first</p>
      <button onClick={(e) => setIsOnAuthPage(true)}>Authenticate</button>
    </div>
  );
}

export default RequestAuthPage;
