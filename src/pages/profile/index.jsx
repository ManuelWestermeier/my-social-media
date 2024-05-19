import React from 'react'
import Loading from '../../comp/loading'
import { Link } from 'react-router-dom'

function ProfilePage({ userData, setUserData }) {
  if (!userData) {
    return <Loading />
  }

  const userName = userData.name;
  const userUrl = `/profile/${userData.id}`;
  const userDescription = userData.name;

  return (
    <>
      <p>{userName}</p>
      <p>
        <Link target='_blank' to={userUrl} >{userUrl}</Link>
      </p>
    </>
  )
}

export default ProfilePage