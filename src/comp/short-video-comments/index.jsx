import { useState } from "react";
import useVideoViews from "../../hooks/use-video-views";
import "./index.css";
import useVideoComments from "../../hooks/use-video-comments";
import { Link } from "react-router-dom";

function VideoComments(id) {
  const videoComments = useVideoComments(id);

  if (!videoComments) {
    return <p>loading....</p>;
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

function ShortVideoComments({ id, videoData, videoSectionRef }) {
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
        <p>{videoData?.date}</p>
        <p>
          {videoViews}👁️ | {videoData?.likes}👍
        </p>
      </div>
      <div className="data" style={{ marginTop: "10px" }}>
        {!viewComments ? (
          <button onClick={(e) => setViewComments(true)}>View Comments</button>
        ) : (
          <VideoComments id={id} />
        )}
      </div>
    </div>
  );
}

export default ShortVideoComments;
