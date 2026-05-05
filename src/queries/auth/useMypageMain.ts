import { useQuery } from "@tanstack/react-query";
import { getMypageMain } from "@services/auth";
import { queryKeys } from "@queries/queryKeys";

export const useMypageMain = () => {
  return useQuery({
    queryKey: queryKeys.user.mypage,
    queryFn: getMypageMain,
    select: data => data.result,
  });
};
