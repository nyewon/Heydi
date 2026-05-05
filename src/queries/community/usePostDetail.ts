import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "@services/community";
import { queryKeys } from "@queries/queryKeys";

export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: queryKeys.community.post(postId),
    queryFn: () => getPostDetail(postId),
  });
};
