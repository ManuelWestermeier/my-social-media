import { useEffect, useRef } from "react";

function Description({ userDescription }) {
  const textAreaRef = useRef();

  useEffect(() => {
    try {
      const textarea = textAreaRef.current;
      textarea.style.height = `${textarea.scrollHeight}px`;
    } catch (error) {}
  }, [textAreaRef]);

  return (
    <textarea
      value={userDescription}
      title="max:1500 characters"
      readOnly
      ref={textAreaRef}
    ></textarea>
  );
}

export default Description;
