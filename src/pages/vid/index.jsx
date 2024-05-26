import React from "react";
import VideoView from "../../comp/video-view";
import "./index.css";
import useInfiniteScroll from "../../hooks/use-infinite-scroll";

function VidPage({ auth, userData, setUserData }) {
  const [containerRef, videoIds] = useInfiniteScroll();

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
