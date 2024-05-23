import "./index.css";

function ShortVideo({ id, videoRef }) {
  const handlePlayPauseToggle = (e) => {
    const video = e.target;
    if (video.paused) video.play();
    else video.pause();
  };

  const handleFullScreenToggle = (e) => {
    e.preventDefault();
    try {
      if (!document.fullscreenElement) {
        // Request fullscreen
        e.target.requestFullscreen();
        e.target.setAttribute("controlls", true);
      } else {
        // Exit fullscreen
        document.exitFullscreen();
        e.target.setAttribute("controlls", false);
      }
    } catch (error) {}
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
