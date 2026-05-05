import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@services/auth";
import { queryKeys } from "@queries/queryKeys";

export const useUserInfo = () => {
  return useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: getUserInfo,
    select: data => data.result,
  });
};
