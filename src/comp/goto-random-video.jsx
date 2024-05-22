import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import { useEffect } from "react";
import getRequestUrl from "../utils/get-request-url";

function GotoRandomVideo() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(getRequestUrl("/random-video"))
  }, []);

  return <Loading />;
}
export default GotoRandomVideo;
