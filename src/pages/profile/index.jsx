import React from "react";
import Loading from "../../comp/loading";
import { Link } from "react-router-dom";
import "./index.css";

function ProfilePage({ userData, setUserData }) {
  if (!userData) {
    return <Loading />;
  }

  const userName = userData.name;
  const userUrl = `/user/${userData.id}`;
  const iconUrl = `${apiUrl}/img/profile/${userData.id}`;
  const userDescription = userData.description;

  return (
    <div className="profile-page">
      <div className="header">
        <Link to={userUrl}>
          <img src={iconUrl} alt="Icon" />
        </Link>
        <h3>{userName}</h3>
      </div>
      <p>
        <Link to={userUrl}>{userUrl}</Link>
      </p>
      <textarea value={userDescription}></textarea>
      <Link to="/abonnements">Abbonements</Link>
    </div>
  );
}

export default ProfilePage;
