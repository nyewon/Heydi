import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({
  hasMore,
  isFetching,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isFetching) {
        onLoadMore();
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, isFetching, onLoadMore]);

  return observerRef;
};
