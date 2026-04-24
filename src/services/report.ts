import instance from "./axios";

// 월간 리포트 통합 조회
export const getMonthlyReport = async (yearMonth: string) => {
  const res = await instance.get(`/reports/monthly/${yearMonth}`);
  return res.data;
};

// 월간 캘린더 데이터 조회
export const getMonthlyCalendar = async (yearMonth: string) => {
  const res = await instance.get(`/reports/monthly/${yearMonth}/calendar`);
  return res.data;
};

// 월간 자주 나온 주제 조회
export const getMonthlyTopics = async (yearMonth: string) => {
  const res = await instance.get(`/reports/monthly/${yearMonth}/topics`);
  return res.data;
};

// 월간 감정 변화 조회
export const getMonthlyEmotions = async (yearMonth: string) => {
  const res = await instance.get(`/reports/monthly/${yearMonth}/emotions`);
  return res.data;
};
