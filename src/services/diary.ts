import instance from "./axios";
import {
  DiaryListResponse,
  DiaryDetailResponse,
  ConversationMessagesResponse,
} from "@models/diary";

// 일기 목록 조회 (메인 리스트)
export const getDiaryList = async (page: number = 0, size: number = 20) => {
  const res = await instance.get<DiaryListResponse>("/api/diaries", {
    params: {
      page,
      size,
    },
  });

  return res.data;
};

// 일기 상세 조회
export const getDiaryDetail = async (diaryId: number) => {
  const res = await instance.get<DiaryDetailResponse>(
    `/api/diaries/${diaryId}`,
  );
  return res.data;
};

// 일기 대화 조회
export const getDiaryConversation = async (diaryId: number) => {
  const res = await instance.get<ConversationMessagesResponse>(
    `/api/diaries/${diaryId}/conversation`,
  );
  return res.data;
};

// 일기 삭제
export const deleteDiary = async (diaryId: number) => {
  const res = await instance.delete(`/api/diaries/${diaryId}`);

  return res.data;
};
