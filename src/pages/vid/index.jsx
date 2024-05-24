import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import VideoView from "../../comp/video-view";
import "./index.css";
import getRandomVideo from "../../utils/ger-random-video";

function VidPage({ auth, userData, setUserData }) {
  const { id } = useParams();
  const [videoIds, setVideoIds] = useState([id]);

  const containerRef = useRef(null);

  const loadMoreVideos = useCallback(async () => {
    const nextRandomVideoId = await getRandomVideo();
    setVideoIds((prevVideoList) => [...prevVideoList, nextRandomVideoId]);
  }, []);

  useEffect(() => {
    const containerElement = containerRef.current;

    containerElement.onscroll = () => {
      if (
        containerElement.scrollLeft + containerElement.clientWidth >=
        containerElement.scrollWidth
      ) {
        loadMoreVideos();
      }
    };
  }, [loadMoreVideos]);

  useEffect(() => {
    loadMoreVideos();
  }, []);

  // Ensure the video list does not exceed 15 items
  useEffect(() => {
    if (videoIds.length > 15) {
      setVideoIds((oldVideoIds) => oldVideoIds.slice(-15));
    }
  }, [videoIds]);

  return (
    <div className="videos" ref={containerRef}>
      {videoIds.map((id) => (
        <VideoView
          userData={userData}
          setUserData={setUserData}
          auth={auth}
          key={id}
          id={id}
        />
      ))}
    </div>
  );
}

export default VidPage;
