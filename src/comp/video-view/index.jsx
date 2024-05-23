import { useEffect, useRef } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import ShortVideo from "../short-video";
import useVideoData from "../../hooks/use-video-data";

function VideoView({ id }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const videoData = useVideoData(id);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //document.location.hash = `/vid/${id}`;
            navigate(`/vid/${id}`, { replace: true });
            videoElement.currentTime = 0;
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  return (
    <div className="video-view">
      <ShortVideo id={id} videoRef={videoRef} />
      {videoData && (
        <>
          <div className="video-data">
            <Link to={`/profile/${videoData?.auth}`}>
              <img src={`${apiUrl}/img/profile/${videoData?.auth}`} alt="" />
              <i>@{videoData?.auth}</i>
            </Link>
            <p>{videoData?.title}</p>
            <p>
              <button>{videoData?.likes}👍</button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 -960 960 960"
                  width="16px"
                  fill="#e8eaed"
                >
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                </svg>
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoView;
