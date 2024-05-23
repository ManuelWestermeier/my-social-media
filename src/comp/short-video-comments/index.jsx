import useVideoViews from "../../hooks/use-video-views";

function ShortVideoComments({ id, videoData }) {
  const videoViews = useVideoViews(id);

  return (
    <div>
      <h2>
        <button>{"<<"}</button>
        <span>{videoData?.title}</span>
      </h2>
      <p>
        {videoData?.date}
      </p>
      <p>{videoViews}👁️ | {videoData?.likes}👍</p>
    </div>
  );
}

export default ShortVideoComments;
