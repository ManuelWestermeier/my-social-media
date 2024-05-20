import { Link } from "react-router-dom";
import "./index.css";

function RequestAuthPage() {
  return (
    <div className="request-auth-page">
      <h3>You have to authenticate first</h3>
      <Link className="btn" to="/auth">authenticate</Link>
    </div>
  );
}

export default RequestAuthPage;
