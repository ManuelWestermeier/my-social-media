import "./index.css";
import { Link } from "react-router-dom";
import useVideoViews from "../../hooks/use-video-views";
import useVideoData from "../../hooks/use-video-data";

function VideoElem({ videoId }) {
  const videoData = useVideoData(videoId);
  const videoViews = useVideoViews(videoId)

  return (
    <Link to={`/vid/${videoId}`} className="video">
      <img src={`${apiUrl}/videos/${videoId}/cover.jpg`} alt="video" />
      {videoData && (
        <p>
          {videoData.likes}👍 | {videoViews || 0} | {videoData.title}
        </p>
      )}
    </Link>
  );
}

function UserProfileVideoList({ videos = [] }) {
  return (
    <div className="profile-video-list">
      {videos.map((videoId) => (
        <VideoElem key={videoId} videoId={videoId} />
      ))}
    </div>
  );
}

export default UserProfileVideoList;
