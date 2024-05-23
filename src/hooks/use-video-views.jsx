import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

function useVideoViews(videoId) {
  const [videoViews, setVideoViews] = useLocalStorage(
    `video-views-${videoId}`,
    0
  );
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`${apiUrl}/videos/${videoId}/views.txt`).then(async (res) => {
        try {
          const views = parseInt(await res.text());
          setVideoViews(views);
        } catch (error) {
          navigate("/vid/");
        }
      });
    } catch (error) {
      navigate("/vid/");
    }
  }, []);

  return videoViews;
}

export default useVideoViews;
