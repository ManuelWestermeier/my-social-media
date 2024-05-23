import "./index.css";

function ShortVideo({ id, videoRef }) {
  const handlePlayPauseToggle = (e) => {
    const video = e.target;
    if (video.paused) video.play();
    else video.pause();
  };

  const handleFullScreenToggle = (e) => {
    e.preventDefault();
    if (!document.fullscreenElement) {
      // Request fullscreen
      e.target.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
      e.target.setAttribute("controlls", true);
    } else {
      // Exit fullscreen
      document.exitFullscreen().catch((err) => {
        alert(
          `Error attempting to exit fullscreen mode: ${err.message} (${err.name})`
        );
      });
      e.target.setAttribute("controlls", false);
    }
  };

  return (
    <div className="video-controlls">
      <video
        onClick={handlePlayPauseToggle}
        onContextMenu={handleFullScreenToggle}
        loop
        ref={videoRef}
        poster={`${apiUrl}/videos/${id}/cover.jpg`}
        src={`${apiUrl}/videos/${id}/video.mp4`}
      ></video>
    </div>
  );
}

export default ShortVideo;
