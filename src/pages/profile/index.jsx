import React from "react";
import Loading from "../../comp/loading";
import { Link } from "react-router-dom";
import "./index.css";
import getRequestUrl from "../../utils/get-request-url";

function ProfilePage({ userData, setUserData, auth }) {
  if (!userData) {
    return <Loading />;
  }

  const onValueChange = (change) => {
    return (e) => {
      setUserData((userData) => {
        return {
          ...userData,
          [change]: e.target.value,
        };
      });

      try {
        //set the new user name
        fetch(
          getRequestUrl("/set-user-data", {
            ...auth,
            change,
            [change]: e.target.value,
          })
        );
      } catch (error) {
        log(error);
      }
    };
  };

  const userName = userData.name;
  const userUrl = `/user/${userData.id}`;
  const iconUrl = `${apiUrl}/img/profile/${userData.id}`;
  const userDescription = userData.description;

  return (
    <div className="profile-page">
      <div className="header">
        <img src={iconUrl} alt="Icon" />
        <h3>
          <input
            type="text"
            value={userName}
            name="name"
            title="max:50 characteracters"
            onChange={onValueChange("name")}
          />
        </h3>
      </div>
      <p>
        <Link to={userUrl}>{userUrl}</Link>
      </p>
      <textarea
        value={userDescription}
        title="max:1500 characteracters"
        onChange={onValueChange("description")}
      ></textarea>
      <Link to="/abonnements">Abbonements</Link>
    </div>
  );
}

export default ProfilePage;
