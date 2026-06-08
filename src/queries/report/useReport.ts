import { useQuery } from "@tanstack/react-query";
import {
  getMonthlyReport,
  getMonthlyCalendar,
  getMonthlyTopics,
  getMonthlyEmotions,
  getAvailableMonths,
} from "@services/report";
import { queryKeys } from "@queries/queryKeys";

export const useMonthlyReport = (ym: string) => {
  return useQuery({
    queryKey: queryKeys.report.monthly(ym),
    queryFn: () => getMonthlyReport(ym),
  });
};

export const useMonthlyCalendar = (ym: string) => {
  return useQuery({
    queryKey: queryKeys.report.calendar(ym),
    queryFn: () => getMonthlyCalendar(ym),
  });
};

export const useMonthlyTopics = (ym: string) => {
  return useQuery({
    queryKey: queryKeys.report.topics(ym),
    queryFn: () => getMonthlyTopics(ym),
  });
};

export const useMonthlyEmotions = (ym: string) => {
  return useQuery({
    queryKey: queryKeys.report.emotions(ym),
    queryFn: () => getMonthlyEmotions(ym),
  });
};

export const useAvailableMonths = () => {
  return useQuery({
    queryKey: queryKeys.report.availableMonths,
    queryFn: getAvailableMonths,
  });
};
