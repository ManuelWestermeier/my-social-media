import { useState } from "react";
import useVideoViews from "../../hooks/use-video-views";
import "./index.css";
import useVideoComments from "../../hooks/use-video-comments";
import { Link } from "react-router-dom";
import TextView from "../../utils/text-view";

function VideoComments({ id, auth, userData, setUserData }) {
  const [videoComments, pushComment, navigate] = useVideoComments(id, auth);

  function Comments() {
    if (!videoComments) {
      return <p>loading....</p>;
    }

    if (videoComments.length === 0) {
      return <p>No comments yet</p>;
    }

    const me = auth?.user;

    return videoComments.map(({ auth, text }) => (
      <div className="video-comment" key={`${auth}@${text}`}>
        <TextView text={text} />
        <Link to={`/profile/${auth}`} target="_blank">
          <img src={`${apiUrl}/img/profile/${auth}`} alt="user-profile" />
          <i>@{auth}</i>
          {auth == me && (
            <button
              style={{ marginLeft: "auto" }}
              onClick={(e) => {
                e.preventDefault();
                alert(id)
              }}
            >
              Delete Comment
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
      </div>
    ));
  }

  return (
    <>
      <div>
        <Comments />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.target);

          if (!auth) {
            return navigate("/auth");
          }

          pushComment(fd.get("comment"));
        }}
      >
        <h3>Add Comment</h3>
        <input type="text" name="comment" placeholder="Add a comment..." />
        <button>Send</button>
      </form>
    </>
  );
}

function ShortVideoComments({
  id,
  videoData,
  videoSectionRef,
  auth,
  userData,
  setUserData,
}) {
  const videoViews = useVideoViews(id);
  const [viewComments, setViewComments] = useState(false);

  return (
    <div className="comments-page">
      <h2>
        <button
          onClick={(e) =>
            videoSectionRef.current?.scrollIntoView({
              block: "center",
              behavour: "smooth",
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
        <span>{videoData?.title}</span>
      </h2>
      <div className="data">
        <Link to={`/profile/${videoData?.auth}`}>@{videoData?.auth}</Link>
        <p>{videoData?.date}</p>
        <TextView text={videoData?.description} />
        <p>
          {videoViews}👁️ | {videoData?.likes}👍
        </p>
      </div>
      <div className="data" style={{ marginTop: "10px" }}>
        {!viewComments ? (
          <button onClick={(e) => setViewComments(true)}>View Comments</button>
        ) : (
          <VideoComments auth={auth} id={id} />
        )}
      </div>
    </div>
  );
}

export default ShortVideoComments;
