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
