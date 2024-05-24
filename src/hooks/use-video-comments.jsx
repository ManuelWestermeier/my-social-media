import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getRequestUrl from "../utils/get-request-url";

function useVideoComments(videoId, auth) {
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
    async (newComment) => {
      setComments((old) => [newComment, ...old]);
      try {
        const res = await fetch(
          getRequestUrl("/add-comment", { ...auth, text: newComment, videoId })
        );

        if (!res.ok) {
          alert("error " + (await res.text()));
          navigate("/vid/");
        }
      } catch (error) {
        alert("error " + error);
        navigate("/vid/");
      }
    },
    navigate,
  ];
}

export default useVideoComments;
