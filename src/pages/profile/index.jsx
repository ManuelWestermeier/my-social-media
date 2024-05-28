import React, { useState } from "react";
import Loading from "../../comp/loading";
import { Link } from "react-router-dom";
import "./index.css";
import getRequestUrl from "../../utils/get-request-url";
import uploadProfileImage from "../../utils/upload-porfile-image";
import VideManager from "../../comp/vide-manager";

function ProfilePage({ userData, setUserData, auth }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!userData || isLoading) {
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
        alert(error);
      }
    };
  };

  const userName = userData.name;
  const userUrl = `/profile/${userData.id}`;
  const iconUrl = `${apiUrl}/img/profile/${userData.id}`;
  const userDescription = userData.description;

  return (
    <div className="profile-page">
      <div className="header">
        <img src={iconUrl} alt="Icon" title="click to upload" />
        <img
          onClick={uploadProfileImage(setIsLoading, auth)}
          src="https://raw.githubusercontent.com/ManuelWestermeier/my-social-media/main/docs/edit.jpeg"
          alt="edit"
        />
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
      <p>{userData.follower} Follower</p>
      <p>
        <Link to={userUrl}>{userUrl}</Link>
      </p>
      <textarea
        value={userDescription}
        title="max:1500 characteracters"
        onChange={onValueChange("description")}
      ></textarea>
      <VideManager
        deleteVideoWithId={(id) =>
          setUserData((old) => {
            return {
              ...old,
              videos: old.videos.filter((v) => v != id),
            };
          })
        }
        auth={auth}
        videos={userData?.videos?.reverse()}
      />
    </div>
  );
}

export default ProfilePage;
