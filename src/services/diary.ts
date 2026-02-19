import instance from "./axios";
import {
  DiaryListResponse,
  DiaryDetailResponse,
  ConversationMessagesResponse,
  SendToReportRequest,
  DiaryEditRequest,
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

// 일기 수정
export const updateDiary = async (diaryId: number, data: DiaryEditRequest) => {
  const res = await instance.put(`/api/diaries/${diaryId}`, data);
  return res.data;
};

// 일기 삭제
export const deleteDiary = async (diaryId: number) => {
  const res = await instance.delete(`/api/diaries/${diaryId}`);

  return res.data;
};

// 일기 PDF 내보내기
export const exportDiaryPdf = async (diaryId: number) => {
  const res = await instance.post(`/api/diaries/${diaryId}/export/pdf`);

  return res.data;
};

// 일기 월간 리포트에 보내기
export const sendDiaryToMonthlyReport = async (
  yearMonth: string,
  payload: SendToReportRequest,
) => {
  const res = await instance.post(
    `/reports/monthly/${yearMonth}/entries`,
    payload,
  );

  return res.data;
};
