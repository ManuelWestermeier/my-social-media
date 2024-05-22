import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function VideoElem({ videoId }) {
  const [videoData, setVideoData] = useState(false);

  useEffect(() => {
    try {
      fetch(`${apiUrl}/videos/${videoId}/data.txt`).then(async (res) => {
        try {
          setVideoData(JSON.parse(await res.text()));
        } catch (error) {}
      });
    } catch (error) {}
  }, []);

  return (
    <Link to={`/vid/${videoId}`} className="video">
      <img src={`${apiUrl}/videos/${videoId}/cover.jpg`} alt="video" />
      {videoData && (
        <p>
          {videoData.likes}👍 | {videoData.title}
        </p>
      )}
    </Link>
  );
}

function UserProfileVideoList({ videos = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="profile-video-list">
        <button onClick={(e) => setIsOpen(true)}>Videos</button>
      </div>
    );
  }

  const videoList = videos.map((videoId) => (
    <VideoElem key={videoId} videoId={videoId} />
  ));

  return (
    <div className="profile-video-list">
      <button onClick={(e) => setIsOpen(false)}>Less</button>
      {videoList}
    </div>
  );
}

export default UserProfileVideoList;
