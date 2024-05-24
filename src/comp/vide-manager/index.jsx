import useLocalStorage from "use-local-storage";
import UserProfileVideoList from "../user-profile-video-list";
import "./index.css"

function VideManager({ auth, videos = [] }) {
  const [showViedos, setShowViedos] = useLocalStorage("show-videos", false);

  return (
    <div className="video-manager">
      <button onClick={(e) => setShowViedos((o) => !o)}>
        {showViedos ? "Hide" : "Show"} Videos
      </button>
      {showViedos && <UserProfileVideoList auth={auth} videos={videos} />}
    </div>
  );
}
export default VideManager;
