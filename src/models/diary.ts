// Diary List
export interface DiaryListItem {
  id: number;
  date: string;
  title: string;
  topic: string[];
  emotion: string;
}

export interface DiaryListResponse {
  content: DiaryListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Diary Detail & Edit
export interface DiaryDetailResponse {
  id: number;
  title: string;
  createdDate: string;
  emotionCategory: string;
  topic: string[];
  oneLineDiary: string;
  content: string;
  conversationSessionId: string;
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
  sessionId: string;
  messages: ConversationMessage[];
}

export interface ConversationMessage {
  role: string;
  text: string;
  createdAt: string;
}
