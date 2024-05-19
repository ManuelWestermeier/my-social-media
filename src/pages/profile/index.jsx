import React from 'react'
import Loading from '../../comp/loading'
import { Link } from 'react-router-dom'

function ProfilePage({ userData, setUserData }) {
  if (!userData) {
    return <Loading />
  }

  const userName = userData.name;
  const userUrl = `/user/${userData.id}`;
  const userDescription = userData.description;

  return (
    <>
      <p>{userName}</p>
      <p>
        <Link to={userUrl} >{userUrl}</Link>
      </p>
      <textarea value={userDescription}></textarea>
      <Link to="/abonnements">
        Abbonements
      </Link>
    </>
  )
}

export default ProfilePage