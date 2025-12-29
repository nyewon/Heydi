import type { EmotionKey } from "@/constants/emotions";

// Emotion Chart
export interface EmotionChartItem {
  week: string;
  percent: number;
  emotion: EmotionKey;
}

// Topics
export interface Topic {
  rank: number;
  title: string;
  percent: number;
  description?: string;
}

// Calendar
export interface CalendarProps {
  year: number;
  month: number;
}

export interface CalendarDate {
  day: number;
  current: boolean;
}

export interface CalendarEntry {
  diaryId: number;
  year: number;
  month: number;
  day: number;
}

// Diary Card
export interface DiaryCardDummy {
  diaryId: string;
  title: string;
  emotion: EmotionKey;
  topics: string[];
}

// Full Report
export interface ReportDummy {
  year: number;
  month: number;
  emotionChart: EmotionChartItem[];
  topTopics: Topic[];
  likes: string;
  dislikes: string;
  activitySummary: string;
  insight: string;
  calendar: CalendarEntry[];
  lastMonthDiary: DiaryCardDummy;
}

export const REPORT_DUMMY: ReportDummy = {
  year: 2025,
  month: 12,

  emotionChart: [
    { week: "1주", percent: 72, emotion: "happy" },
    { week: "2주", percent: 54, emotion: "sad" },
    { week: "3주", percent: 68, emotion: "joy" },
    { week: "4주", percent: 72, emotion: "happy" },
    { week: "5주", percent: 38, emotion: "neutral" },
  ],

  topTopics: [
    {
      rank: 1,
      title: "학업",
      percent: 32,
      description: "시험과 과제, 진로에 대한 주제가 가장 많이 등장했어요",
    },
    { rank: 2, title: "인간관계", percent: 21 },
    { rank: 3, title: "취미", percent: 17 },
    { rank: 4, title: "건강", percent: 11 },
  ],

  likes: "맛집 탐방",
  dislikes: "발표",

  activitySummary:
    "이번 달에는 학교에 가서 친구들과 점심을 많이 먹었어요! 학교 식당에 가기도 하고 배달 음식을 시켜 먹으며 좋은 추억을 만들었습니다.",

  insight:
    "운동을 한다고 했지만 계속 미루기만 했어요. 다음 달에는 누워있는 시간을 줄이고 잠깐이라도 운동을 하는 습관을 만들어보면 어떨까요?",

  calendar: [
    { diaryId: 1, year: 2025, month: 12, day: 3 },
    { diaryId: 2, year: 2025, month: 12, day: 5 },
    { diaryId: 3, year: 2025, month: 12, day: 6 },
    { diaryId: 4, year: 2025, month: 12, day: 7 },
    { diaryId: 5, year: 2025, month: 12, day: 20 },
    { diaryId: 6, year: 2025, month: 12, day: 21 },
    { diaryId: 7, year: 2025, month: 12, day: 22 },
    { diaryId: 8, year: 2025, month: 12, day: 25 },
  ],

  lastMonthDiary: {
    diaryId: "0",
    title: "11월 20일의 일기",
    emotion: "annoyed",
    topics: ["친구"],
  },
};
