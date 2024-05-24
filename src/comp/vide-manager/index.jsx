import useLocalStorage from "use-local-storage";
import UserProfileVideoList from "../user-profile-video-list";
import "./index.css";
import { Link } from "react-router-dom";

function VideManager({ auth, videos = [], deleteVideoWithId }) {
  const [showViedos, setShowViedos] = useLocalStorage("show-videos", false);

  return (
    <div className="video-manager">
      <button onClick={(e) => setShowViedos((o) => !o)}>
        {showViedos ? "Hide" : "Show"} Videos
      </button>
      {videos.length == 0 && <p>No videos yet <Link to="/upload">[upload video]</Link></p>}
      {showViedos && (
        <UserProfileVideoList
          deleteVideoWithId={deleteVideoWithId}
          auth={auth}
          videos={videos}
        />
      )}
    </div>
  );
}
export default VideManager;
