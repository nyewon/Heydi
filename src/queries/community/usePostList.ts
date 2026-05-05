import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostList } from "@services/community";
import { queryKeys } from "@queries/queryKeys";

export const usePostList = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.community.posts,

    queryFn: ({ pageParam = null }) =>
      getPostList(pageParam as number | null, 10),

    initialPageParam: null,

    getNextPageParam: lastPage => lastPage.result.nextCursor ?? undefined,
  });
};
