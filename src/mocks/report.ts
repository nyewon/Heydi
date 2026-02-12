import {
  CalendarResponse,
  MonthlyEmotionResponse,
  MonthlyReportResponse,
  MonthlyTopicsResponse,
} from "@models/report";

// Emotion Chart
export const MONTHLY_EMOTION_DUMMY: MonthlyEmotionResponse = {
  yearMonth: "2025-12",
  weeks: [
    {
      weekIndex: 1,
      startDate: "2025-12-01",
      endDate: "2025-12-07",
      topEmotion: "기쁨",
      emotionRate: 56,
    },
    {
      weekIndex: 2,
      startDate: "2025-12-08",
      endDate: "2025-12-14",
      topEmotion: "무난함",
      emotionRate: 42,
    },
    {
      weekIndex: 3,
      startDate: "2025-12-15",
      endDate: "2025-12-21",
      topEmotion: "슬픔",
      emotionRate: 18,
    },
    {
      weekIndex: 4,
      startDate: "2025-12-22",
      endDate: "2025-12-28",
      topEmotion: "행복",
      emotionRate: 63,
    },
    {
      weekIndex: 5,
      startDate: "2025-12-29",
      endDate: "2025-12-31",
      topEmotion: "짜증",
      emotionRate: 27,
    },
  ],
};

// Top Topics
export const MONTHLY_TOPICS_DUMMY: MonthlyTopicsResponse = {
  yearMonth: "2025-12",
  top1: {
    name: "학업",
    ratio: 32,
    description: "시험과 과제, 진로에 대한 주제가 가장 많이 등장했어요",
  },
  top2to4: [
    { name: "인간관계", ratio: 21 },
    { name: "취미", ratio: 17 },
    { name: "건강", ratio: 11 },
  ],
};

// Calendar
export const CALENDAR_DUMMY: CalendarResponse = {
  entries: [
    { date: "2025-12-03", diaryId: 1 },
    { date: "2025-12-05", diaryId: 2 },
    { date: "2025-12-06", diaryId: 3 },
    { date: "2025-12-07", diaryId: 4 },
    { date: "2025-12-20", diaryId: 5 },
    { date: "2025-12-21", diaryId: 6 },
    { date: "2025-12-22", diaryId: 7 },
    { date: "2025-12-25", diaryId: 8 },
  ],
};

// Full Report
export const MONTHLY_REPORT_DUMMY: MonthlyReportResponse = {
  yearMonth: "2025-12",
  preferences: {
    like: "맛집 탐방",
    dislike: "발표",
  },
  activity: {
    summary:
      "이번 달에는 학교에서 친구들과 시간을 많이 보냈어요. 점심을 함께 먹고, 과제를 하면서 소소한 대화를 나누는 시간이 잦았어요.",
  },

  insight: {
    content:
      "운동을 계획했지만 실행으로 이어지지 않았어요. 다음 달에는 하루 10분이라도 몸을 움직이는 목표를 세워보는 건 어떨까요?",
  },

  lastMonthReminder: {
    sourceYearMonth: "2025-11",
    diaryId: 0,
    date: "2025-11-20",
    title: "11월 20일의 일기",
    topics: ["친구"],
    emotion: "짜증",
  },
};
