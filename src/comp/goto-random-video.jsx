import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import { useEffect } from "react";
import getRandomVideo from "../utils/ger-random-video";

function GotoRandomVideo() {
  const navigate = useNavigate();

  useEffect(() => {
    getRandomVideo().then((id) => navigate(`/vid/${id}`));
  }, []);

  return <Loading />;
}

export default GotoRandomVideo;
