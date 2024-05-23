import React, { useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import getRequestUrl from "../../utils/get-request-url";

function Abonnement({ id }) {
  const profileImageUrl = `${apiUrl}/img/profile/${id}`;
  const userUrl = `/profile/${id}`;

  const [name, setName] = useLocalStorage(`user-name-${id}`, id);

  useEffect(() => {
    fetch(getRequestUrl("/get-user-name", { id })).then(async (res) => {
      setName(await res.text());
    });
  }, []);

  return (
    <Link to={userUrl} key={id} className="abonnement">
      <img src={profileImageUrl} alt="logo" />
      <b>{name}</b>
      <small>
        <i>@{id}</i>
      </small>
    </Link>
  );
}

function AbonnementsPage({ userData }) {
  return (
    <div className="p10">
      <h1>Abonnements</h1>
      <div className="abonnement-list">
        {userData.abonnements.map((id) => (
          <Abonnement id={id} key={id} />
        ))}
      </div>
    </div>
  );
}

export default AbonnementsPage;
