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
          </div>
        </>
      )}
    </div>
  );
}

export default VideoView;
