import { useState } from "react";

function useVideoComments() {
  const [comments, setComments] = useState(false);

  return [
    { auth: "admin", text: "Hello, world" },
    { auth: "client", text: "Hello, world" },
    { auth: "admin", text: "Hello, world" },
  ];

  return comments;
}
export default useVideoComments;
