import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useVideoData(id) {
  const [videoData, setVideoData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`${apiUrl}/videos/${id}/data.txt`).then(async (res) => {
        try {
          setVideoData(JSON.parse(await res.text()));
        } catch (error) {
          navigate("/vid/");
        }
      });
    } catch (error) {
      navigate("/vid/");
    }
  }, []);

  return videoData;
}

export default useVideoData;
