import { useQuery } from "@tanstack/react-query";
import { getDiaryList } from "@services/diary";
import { queryKeys } from "@queries/queryKeys";

export const useDiaryList = (page: number) => {
  return useQuery({
    queryKey: [...queryKeys.diary.list, page],
    queryFn: () => getDiaryList(page),
  });
};
