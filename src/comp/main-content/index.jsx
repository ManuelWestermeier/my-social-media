import React from 'react'
import "./index.css"
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/home'
import VidPage from '../../pages/vid'
import UploadPage from '../../pages/upload'
import AbonnementsPage from '../../pages/abonnements'
import ProfilePage from '../../pages/profile'

function MainContent() {
  const [userData, setUserData] = useFetchUserData()
  return (
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/vid' element={<VidPage />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/abonnements' element={<AbonnementsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  )
}

export default MainContent