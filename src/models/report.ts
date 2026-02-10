// Emotion Chart
export interface MonthlyEmotionResponse {
  yearMonth: string;
  weeks: {
    weekIndex: number;
    startDate: string;
    endDate: string;
    topEmotion: string;
    emotionRate: number;
  }[];
}

// Top Topics
export interface MonthlyTopicsResponse {
  yearMonth: string;
  top1: {
    name: string;
    ratio: number;
    description: string;
  };
  top2to4: {
    name: string;
    ratio: number;
  }[];
}

// Calendar
export interface CalendarResponse {
  entries: {
    date: string;
    diaryId: number;
  }[];
}

// Monthly Report
export interface MonthlyReportResponse {
  yearMonth: string;
  preferences: {
    like: string;
    dislike: string;
  };
  activity: {
    summary: string;
  };
  insight: {
    content: string;
  };
  lastMonthReminder: LastMonthReminder;
}

export interface LastMonthReminder {
  sourceYearMonth: string;
  diaryId: number;
  date: string;
  title: string;
  topics: string[];
  emotion: string;
}
