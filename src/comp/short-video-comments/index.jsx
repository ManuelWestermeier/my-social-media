import { useState } from "react";
import useVideoViews from "../../hooks/use-video-views";
import "./index.css";
import useVideoComments from "../../hooks/use-video-comments";
import { Link } from "react-router-dom";

function VideoComments({ id, auth }) {
  const [videoComments, pushComment, navigate] = useVideoComments(id);

  function Comments() {
    if (!videoComments) {
      return <p>loading....</p>;
    }

    if (videoComments.length === 0) {
      return <p>No comments yet</p>;
    }

    return videoComments.map(({ auth, text }) => (
      <div className="video-comment" key={`${auth}@${text}`}>
        <p>{text}</p>
        <Link to={`/profile/${auth}`} target="_blank">
          <img src={`${apiUrl}/img/profile/${auth}`} alt="" />
          <i>@{auth}</i>
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

          pushComment({
            text: fd.get("comment"),
            auth: auth.user,
          });
        }}
      >
        <h3>Add Comment</h3>
        <input type="text" name="comment" placeholder="Add a comment..." />
        <button>Send</button>
      </form>
    </>
  );
}

function ShortVideoComments({ id, videoData, videoSectionRef, auth }) {
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
