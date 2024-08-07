import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import getRequestUrl from "../utils/get-request-url";

function useLike({ userData, setUserData, setVideoData, auth, videoId }) {
  const navigate = useNavigate();
  const liked = useMemo(() => {
    return userData?.liked?.includes?.(videoId);
  }, [userData]);

  const likeVideo = async (e) => {
    if (!auth) {
      return navigate("/auth");
    }
    e.target.classList.toggle("liked");

    setUserData((old) => {
      return {
        ...old,
        liked: old.liked.includes(videoId)
          ? old.liked.filter((id) => id !== videoId)
          : [...old.liked, videoId],
      };
    });

    setVideoData((old) => {
      return {
        ...old,
        likes: !liked ? old.likes + 1 : old.likes - 1,
      };
    });

    try {
      const res = await fetch(
        getRequestUrl("/toggle-like-video", { ...auth, videoId })
      );
      if (!res.ok) {
        alert("like error " + (await res.text()));
      }
    } catch (error) {
        alert(error)
    }
  };

  return [liked, likeVideo];
}
export default useLike;
