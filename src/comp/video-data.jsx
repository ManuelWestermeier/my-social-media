import { Link } from "react-router-dom";

function VideoData({ videoData, commentPageRef }) {
  return (
    videoData && (
      <>
        <div className="video-data">
          <Link to={`/profile/${videoData?.auth}`}>
            <img src={`${apiUrl}/img/profile/${videoData?.auth}`} alt="" />
            <i>@{videoData?.auth}</i>
          </Link>
          <p>{videoData?.title}</p>
          <p>
            <button>{videoData?.likes}👍</button>
            <button
              onClick={(e) =>
                commentPageRef.current?.scrollIntoView({
                  block: "center",
                  behavour: "smooth",
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#e8eaed"
              >
                <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg>
            </button>
          </p>
        </div>
      </>
    )
  );
}
export default VideoData;
