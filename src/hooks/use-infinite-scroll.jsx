import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import getRandomVideo from "../utils/ger-random-video";

function useInfiniteScroll() {
  const { id } = useParams();
  const [videoIds, setVideoIds] = useState([id]);
  const containerRef = useRef(null);

  const loadMoreVideos = useCallback(async () => {
    let nextRandomVideoId = await getRandomVideo();

    if (videoIds.includes(nextRandomVideoId)) {
      return loadMoreVideos();
    }

    setVideoIds((prevVideoList) => [...prevVideoList, nextRandomVideoId]);
  }, [videoIds]);

  const containerChildren = containerRef?.current?.children;
  const lastConttainerChild =
    containerChildren?.[containerChildren?.length - 1];

  useEffect(() => {
    if (!lastConttainerChild) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreVideos();
      }
    });

    observer.observe(lastConttainerChild);

    return () => {
      observer.unobserve(lastConttainerChild);
      observer.disconnect();
    };
  }, [lastConttainerChild, loadMoreVideos]);

  return [containerRef, videoIds];
}

export default useInfiniteScroll;