import { useEffect, useRef } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

function VideoView({ id }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();

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
      <video
        loop
        ref={videoRef}
        poster={`${apiUrl}/videos/${id}/cover.jpg`}
        controls
        src={`${apiUrl}/videos/${id}/video.mp4`}
      ></video>
    </div>
  );
}

export default VideoView;
