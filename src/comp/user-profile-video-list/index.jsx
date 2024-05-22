import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function UserProfileVideoList({ videos = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="profile-video-list">
        <button onClick={(e) => setIsOpen(true)}>Videos</button>
      </div>
    );
  }

  const videoList = videos.map((videoId) => {
    return (
      <Link to={`/vid/${videoId}`} key={videoId} className="video">
        <img src={`${apiUrl}/videos/${videoId}/cover.jpg`} alt="video" />
        <p>
            Hello
        </p>
      </Link>
    );
  });

  return (
    <div className="profile-video-list">
      <button onClick={(e) => setIsOpen(false)}>Less</button>
      {videoList}
    </div>
  );
}

export default UserProfileVideoList;
