// Diary List
export interface DiaryListItem {
  diaryId: number;
  date: string;
  title: string;
  topics: string[];
  emotion: string;
}

export interface DiaryListResponse {
  content: DiaryListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Diary Detail
export interface DiaryDetailResponse {
  id: number;
  title: string;
  createdDate: string;
  emotionCategory: string;
  topic: string[];
  oneLineDiary: string;
  content: string;
  conversationDurationSec: number;
  photos: {
    id: number;
    imageUrl: string;
    order: number;
  }[];
  report: {
    included: boolean;
    month: string;
  };
}

export interface ConversationMessagesResponse {
  messages: ConversationMessage[];
}

export interface ConversationMessage {
  role: string;
  text: string;
  createdAt: string;
}

// Diary & Community Photo
export interface PhotoItem {
  id?: number;
  imageUrl: string;
  file?: File;
}

// Diary Edit
export interface DiaryEditRequest {
  emotionCategory: string;
  topic: string[];
  oneLineDiary: string;
  content: string;
}

// Send To Report
export interface SendToReportRequest {
  diaryId: number;
}
