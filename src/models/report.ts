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
