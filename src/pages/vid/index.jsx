import React from "react";
import { useParams } from "react-router-dom";

function VidPage({ auth, userData, setUserData }) {
  const { id } = useParams();
  return <div>VidPage {id}</div>;
}

export default VidPage;
