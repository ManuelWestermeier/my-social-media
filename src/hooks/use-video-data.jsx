import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

function useVideoData(id) {
  const [videoData, setVideoData] = useLocalStorage(`video-data-${id}`, false);
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

  return [videoData, setVideoData];
}

export default useVideoData;
