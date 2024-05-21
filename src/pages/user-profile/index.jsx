import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Loading from "../../comp/loading";
import getRequestUrl from "../../utils/get-request-url";
import toggleSubscribe from "../../utils/toggle-subscribe";
import "./index.css";

function UserPage({ authUserData, setAuthUserData, auth }) {
  const { id } = useParams();

  const [userData, setUserData] = useLocalStorage("user-data" + id, false);
  const [follower, setFollower] = useState();
  const navigate = useNavigate();

  const textAreaRef = useRef();

  const subscribed = useMemo(() => {
    return authUserData?.abonnements?.includes(id);
  }, [authUserData, userData]);

  useEffect(() => {
    try {
      const textarea = textAreaRef.current;
      textarea.style.height = `${textarea.scrollHeight}px`;
    } catch (error) {}
  }, [textAreaRef]);

  //fetch the data
  useEffect(() => {
    try {
      fetch(getRequestUrl("/get-public-user-data", { user: id }))
        .then((res) => res.json())
        .then((jsonData) => {
          if (!jsonData) navigate("/abonnements", { replace: true });
          setUserData(jsonData);
        });
    } catch (error) {}
  }, []);

  useEffect(() => {
    setFollower(userData.follower);
  }, [userData]);

  if (!userData) {
    return <Loading />;
  }

  const iconUrl = `${apiUrl}/img/profile/${id}`;
  const userName = userData.name;
  const userDescription = userData.description;

  return (
    <div className="profile-page">
      <div className="header">
        <img src={iconUrl} alt="Icon" title="click to upload" />
        <h3>{userName}</h3>
      </div>
      <div className="footer">
        <p>{follower} Follower</p>
        <button
          className={(subscribed ? "not-active " : "") + "subscribe-btn"}
          onClick={toggleSubscribe(
            subscribed,
            setAuthUserData,
            setFollower,
            auth,
            id,
            navigate
          )}
        >
          {subscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
      <textarea
        value={userDescription}
        title="max:1500 characteracters"
        readOnly
        ref={textAreaRef}
      ></textarea>
    </div>
  );
}

export default UserPage;