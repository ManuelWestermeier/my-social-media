import React, { useRef, useState } from "react";
import "./index.css";
import uploadVideo from "../../utils/upload-video";
import Loading from "../../comp/loading";
import { useNavigate } from "react-router-dom";

function UploadPage({ auth }) {
  const [coverBlob, setCoverBlob] = useState(false);
  const [videoBlob, setVideoBlob] = useState(false);
  const [uploadingState, setUploadingState] = useState(false);
  const titleInput = useRef();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  if (uploadingState) {
    return <Loading state={uploadingState} />;
  }

  return (
    <div className="upload-page">
      <h2>Upload</h2>
      <p>Title</p>
      <input
        type="text"
        placeholder="Title..."
        defaultValue="My new Video"
        ref={titleInput}
      />
      <p>Cover</p>
      {coverBlob && <img src={URL.createObjectURL(coverBlob)} alt="no cover" />}
      <input
        type="file"
        accept="image/jpg"
        onChange={(e) => setCoverBlob(e.target.files?.[0])}
      />
      <p>Video</p>
      {videoBlob && (
        <video controls src={URL.createObjectURL(videoBlob)} alt="no video" />
      )}
      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => setVideoBlob(e.target.files?.[0])}
      />
      <p style={{ color: "red", minHeight: "20px" }}>{error}</p>
      <button
        onClick={uploadVideo(
          auth,
          coverBlob,
          videoBlob,
          titleInput?.current?.value ?? "",
          navigate,
          setUploadingState,
          setError
        )}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadPage;
