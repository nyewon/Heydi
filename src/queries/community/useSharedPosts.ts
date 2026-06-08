import { useInfiniteQuery } from "@tanstack/react-query";

import { getSharedPosts } from "@services/auth";
import { queryKeys } from "@queries/queryKeys";

export const useSharedPosts = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.community.shared,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getSharedPosts(pageParam, 10);

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
