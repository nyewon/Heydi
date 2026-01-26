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
