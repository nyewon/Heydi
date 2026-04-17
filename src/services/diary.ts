import instance from "./axios";
import { SendToReportRequest, DiaryEditRequest } from "@models/diary";

// 일기 목록 조회 (메인 리스트)
export const getDiaryList = async (page: number = 0, size: number = 10) => {
  const res = await instance.get("/api/diaries", {
    params: {
      pageNumber: page,
      pageSize: size,
    },
  });

  return res.data.result;
};

// 일기 상세 조회
export const getDiaryDetail = async (diaryId: number) => {
  const res = await instance.get(`/api/diaries/${diaryId}`);
  return res.data.result;
};

// 일기 대화 조회
export const getDiaryConversation = async (diaryId: number) => {
  const res = await instance.get(`/api/diaries/${diaryId}/conversation`);
  return res.data.result;
};

// 일기 수정
export const updateDiary = async (diaryId: number, data: DiaryEditRequest) => {
  const res = await instance.patch(`/api/diaries/${diaryId}`, data);
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

// 대화 세션 시작
export const startConversationSession = async (targetDate?: string) => {
  const res = await instance.post(
    "/api/conversations/sessions",
    targetDate ? { targetDate } : {},
  );

  return res.data;
};

// 대화 세션 종료 + 일기 생성
export const endConversationSession = async (
  diaryId: number,
  data: { generateDiary?: boolean } = { generateDiary: true },
) => {
  const res = await instance.post(
    `/api/conversations/sessions/${diaryId}/end`,
    data,
  );

  return res.data;
};
