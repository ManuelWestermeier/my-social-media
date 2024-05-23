import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useVideoComments(videoId) {
  const [comments, setComments] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`${apiUrl}/videos/${videoId}/comments.txt`).then(async (res) => {
        try {
          setComments(JSON.parse(await res.text()));
        } catch (error) {
          navigate("/vid/");
        }
      });
    } catch (error) {
      navigate("/vid/");
    }
  }, []);

  return [
    comments,
    (_new) => {
      setComments((old) => [_new, ...old]);
    },
    navigate,
  ];
}

export default useVideoComments;
