import { useQuery } from "@tanstack/react-query";
import { getDiaryDetail, getDiaryConversation } from "@services/diary";
import { queryKeys } from "@queries/queryKeys";

export const useDiaryDetail = (id: number) => {
  return useQuery({
    queryKey: queryKeys.diary.detail(id),
    queryFn: () => getDiaryDetail(id),
    enabled: !!id,
  });
};

export const useDiaryConversation = (id: number) => {
  return useQuery({
    queryKey: queryKeys.diary.conversation(id),
    queryFn: () => getDiaryConversation(id),
    enabled: !!id,
  });
};
