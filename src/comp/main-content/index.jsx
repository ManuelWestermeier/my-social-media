import React from "react";
import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home";
import VidPage from "../../pages/vid";
import UploadPage from "../../pages/upload";
import AbonnementsPage from "../../pages/abonnements";
import ProfilePage from "../../pages/profile";
import useFetchUserData from "../../hooks/fetch-user-data";
import AuthPage from "../../pages/auth";
import UserPage from "../../pages/user-profile";
import RequestAuthPage from "../../pages/request-auth";

function MainContent({ auth, setAuth }) {
  const [userData, setUserData, isAuth] = useFetchUserData(auth);

  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/vid/:id"
          element={
            <VidPage
              setUserData={setUserData}
              userData={userData}
              auth={auth}
            />
          }
        />
        <Route
          path="/upload"
          element={isAuth ? <UploadPage auth={auth} /> : <RequestAuthPage />}
        />
        <Route
          path="/abonnements"
          element={
            isAuth ? (
              <AbonnementsPage userData={userData} />
            ) : (
              <RequestAuthPage />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuth ? (
              <ProfilePage
                auth={auth}
                userData={userData}
                setUserData={setUserData}
              />
            ) : (
              <RequestAuthPage />
            )
          }
        />
        <Route
          path="/profile/:id"
          element={
            <UserPage
              auth={auth}
              authUserData={userData}
              setAuthUserData={setUserData}
            />
          }
        />
        <Route
          path="/auth"
          element={<AuthPage setAuth={setAuth} isAuth={isAuth} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default MainContent;
