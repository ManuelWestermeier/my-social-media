import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import getRandomVideo from "../utils/ger-random-video";

function useInfiniteScroll() {
  const { id } = useParams();
  const [videoIds, setVideoIds] = useState([id]);
  const containerRef = useRef(null);

  const loadMoreVideos = useCallback(async () => {
    let nextRandomVideoId;
    do {
      nextRandomVideoId = await getRandomVideo();
    } while (videoIds.includes(nextRandomVideoId));

    setVideoIds((prevVideoList) => [...prevVideoList, nextRandomVideoId]);
  }, [videoIds]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = containerRef.current;
    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [containerRef, loadMoreVideos]);

  return [containerRef, videoIds];
}

export default useInfiniteScroll;
