import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "@services/community";
import { queryKeys } from "@queries/queryKeys";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.posts,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.community.shared,
      });
    },
  });
};
