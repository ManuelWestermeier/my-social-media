import getRequestUrl from "./get-request-url";

export default function uploadVideo(
  auth,
  cover,
  video,
  title,
  description,
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
    xhr.open(
      "POST",
      getRequestUrl("/upload-video", { ...auth, title, description }),
      true
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadingState(percentComplete.toFixed(2) + "%");
      }
    };

    xhr.onload = () => {
      setUploadingState(false);
      if (xhr.status === 200) {
        const id = JSON.parse(xhr.responseText).id;

        setError("Video uploaded successfully!");

        setTimeout(() => navigate(`/vid/${id}`), 500);
      } else {
        setError(
          "Error uploading video. Mybe your cover isn't a .png or .jpg or your video isn't a .mp4 file."
        );
      }
    };

    xhr.onerror = () => {
      setUploadingState(false);
      setError(
        "Error uploading video. Mybe your cover isn't a .png or .jpg or your video isn't a .mp4 file."
      );
    };

    xhr.send(formData);
  };
}
