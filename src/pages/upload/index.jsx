import React, { useState } from "react";
import "./index.css";

function UploadPage({ auth }) {
  const [coverBlob, setCoverBlob] = useState(false);
  const [videoBlob, setVideoBlob] = useState(false);

  return (
    <div className="upload-page">
      <h2>Upload</h2>
      <br />
      <p>Cover</p>
      {coverBlob && <img src={URL.createObjectURL(coverBlob)} alt="no cover" />}
      <input
        type="file"
        accept="image/jpg"
        onChange={(e) => setCoverBlob(e.target.files?.[0])}
      />
      <br />
      <p>Video</p>
      {videoBlob && <video controls src={URL.createObjectURL(videoBlob)} alt="no video" />}
      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => setVideoBlob(e.target.files?.[0])}
      />
      <br />
      <button>Upload</button>
    </div>
  );
}

export default UploadPage;
