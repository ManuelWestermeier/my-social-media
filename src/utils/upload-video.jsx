import getRequestUrl from "./get-request-url";

export default function uploadVideo(
  auth,
  cover,
  video,
  title,
  navigate,
  setUploadingState,
  setError
) {
  return () => {
    if (!cover || !video) {
      return setError("Cover and Video are required");
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("cover", cover);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", getRequestUrl("/upload-video", { ...auth, title }), true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadingState(percentComplete.toFixed(2) + "%");
      }
    };

    xhr.onload = () => {
      setUploadingState(false);
      if (xhr.status === 200) {
        log(JSON.parse(xhr.responseText));
        const id = JSON.parse(xhr.responseText).id;

        setError("Video uploaded successfully!");

        setTimeout(() => navigate(`/vid/${id}`), 1000);
      } else {
        setError("Error uploading video.");
      }
    };

    xhr.onerror = () => {
      setUploadingState(false);
      setError("Error uploading video.");
    };

    xhr.send(formData);
  };
}
