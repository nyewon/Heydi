import instance from "./axios";
import { DiaryListResponse } from "@models/diary";

// 일기 목록 조회 (메인 리스트)
export const getDiaryList = async (
  page: number = 0,
  size: number = 20,
): Promise<DiaryListResponse> => {
  const res = await instance.get<DiaryListResponse>("/api/diaries", {
    params: {
      page,
      size,
    },
  });

  return res.data;
};
