import { useEffect, useRef } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import ShortVideo from "../short-video";
import useVideoData from "../../hooks/use-video-data";
import VideoData from "../video-data";

function VideoView({ id }) {
  const videoRef = useRef();
  const commentPageRef = useRef();
  const navigate = useNavigate();
  const videoData = useVideoData(id);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
      observer.disconnect();
    };
  }, []);

  return (
    <div className="video-view">
      <div>
        <ShortVideo id={id} videoRef={videoRef} />
        <VideoData videoData={videoData} commentPageRef={commentPageRef} />
      </div>
      <div ref={commentPageRef}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere nulla
        debitis optio dolorum obcaecati quas nam quisquam voluptatibus,
        praesentium, illo nobis consectetur reprehenderit dignissimos eligendi
        quam laborum necessitatibus voluptas. Dolor.
      </div>
    </div>
  );
}

export default VideoView;
