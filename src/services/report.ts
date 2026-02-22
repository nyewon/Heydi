import instance from "./axios";

// 월간 리포트 통합 조회
export const getMonthlyReport = async (yearMonth: string) => {
  const res = await instance.get(`/reports/monthly/${yearMonth}`);
  return res.data;
};
