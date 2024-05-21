import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Loading from "../../comp/loading";
import getRequestUrl from "../../utils/get-request-url";

function UserPage({ userData: authUserData }) {
  const { id } = useParams();

  const [userData, setUserData] = useLocalStorage("user-data" + id, false);
  const navigate = useNavigate();

  const textAreaRef = useRef();

  useEffect(() => {
    const textarea = textAreaRef.current
    textarea.style.height = `${textarea.scrollHeight}px`
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
      <textarea
        value={userDescription}
        title="max:1500 characteracters"
        readOnly
        ref={textAreaRef}
      ></textarea>
      <div className="footer">
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default UserPage;
