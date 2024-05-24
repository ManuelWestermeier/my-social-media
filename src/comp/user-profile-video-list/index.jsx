import "./index.css";
import { Link } from "react-router-dom";
import useVideoViews from "../../hooks/use-video-views";
import useVideoData from "../../hooks/use-video-data";
import getRequestUrl from "../../utils/get-request-url";

function VideoElem({ videoId, auth, deleteVideoWithId }) {
  const [videoData] = useVideoData(videoId);
  const videoViews = useVideoViews(videoId);

  return (
    <Link to={`/vid/${videoId}`} className="video">
      <img src={`${apiUrl}/videos/${videoId}/cover.jpg`} alt="video" />
      {videoData && (
        <p>
          <span>
            {videoData.likes}👍 | {videoViews || 0} | {videoData.title}
          </span>
        </p>
      )}
      {auth?.user == videoData.auth && (
        <button
          className="delete-button"
          onClick={async (e) => {
            e.preventDefault();
            
            if (!confirm("Are you sure you want to delete this video?")) {
              return;
            }
            try {
              const res = await fetch(
                getRequestUrl("/delete-video", { ...auth, videoId })
              );
              if (!res.ok) {
                return alert("error deleting video");
              }
              deleteVideoWithId(videoId)
            } catch (error) {
              alert(error);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      )}
    </Link>
  );
}

function UserProfileVideoList({ videos = [], auth, deleteVideoWithId }) {
  return (
    <div className="profile-video-list">
      {videos.map((videoId) => (
        <VideoElem
          key={videoId}
          deleteVideoWithId={deleteVideoWithId}
          auth={auth}
          videoId={videoId}
        />
      ))}
    </div>
  );
}

export default UserProfileVideoList;
