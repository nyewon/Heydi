import { useInfiniteQuery } from "@tanstack/react-query";

import { getLikedPosts } from "@services/auth";
import { queryKeys } from "@queries/queryKeys";

export const useLikedPosts = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.user.liked,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getLikedPosts(pageParam, 10);

      const posts = Array.isArray(res.result)
        ? res.result
        : (res.result?.posts ?? []);

      const totalCount = res.result?.totalCount ?? posts.length;

      return {
        posts,
        totalCount,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.flatMap(page => page.posts).length;

      return loadedCount < lastPage.totalCount ? allPages.length : undefined;
    },
  });
};
