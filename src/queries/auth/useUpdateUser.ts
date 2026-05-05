import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from "@services/auth";
import { queryKeys } from "@queries/queryKeys";

export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.auth.user });
    },
  });
};
