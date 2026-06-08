import { useQueryClient } from "@tanstack/react-query";

import { togglePostLike } from "@services/community";
import { queryKeys } from "@queries/queryKeys";

export const useLiked = () => {
  const queryClient = useQueryClient();

  const toggleLike = async (postId: number) => {
    await togglePostLike(postId);

    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.posts,
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.shared,
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.liked,
      }),
    ]);
  };

  return { toggleLike };
};
