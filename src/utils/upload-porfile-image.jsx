import getRequestUrl from "./get-request-url";

export default function uploadProfileImage(setIsLoading, auth) {
  return (e) => {
    e.preventDefault();

    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/jpg");

    fileInput.onchange = async (e) => {
      setIsLoading(true);

      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(getRequestUrl("/upload-profile-image", auth), {
          body: formData,
          method: "POST",
        });

        if (!res.ok) {
          return setIsLoading(false);
        }

        const jsonRes = await res.json();

        if (jsonRes.error) {
          alert(jsonRes.error);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fileInput.click();
  };
}
