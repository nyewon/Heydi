// Community Post List
export interface PostListItem {
  postId: number;
  userId: number;
  nickname: string;
  profileUrl: string;
  postTitle: string;
  postTopics: string[];
  postEmotion: string;
  postContent: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface PostListResponse {
  posts: PostListItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

// Community Post Detail
export interface PostAuthor {
  user_id: number;
  nickname: string;
  profile_url: string;
}

export interface PostDetailResponse {
  post_id: number;
  author: PostAuthor;
  diary_id: number;
  diary_date: string;
  post_title: string;
  post_topics: string[];
  post_emotion: string;
  post_content: string;
  photos: {
    id: number;
    imageUrl: string;
    order: number;
  }[];
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  created_at: string;
}

export interface CommunityComment {
  comment_id: number;
  user_id: number;
  nickname: string;
  profile_url: string;
  content: string;
  is_mine: boolean;
  created_at: string;
}

export interface CommunityCommentListResponse {
  comments: CommunityComment[];
  next_cursor: number | null;
  has_next: boolean;
}

export interface CreateCommentRequest {
  content: string;
}

export interface CommunityCommentMutationResult {
  comment_id: number;
  user_id: number;
  nickname: string;
  profile_url: string;
  content: string;
  is_mine: boolean;
  created_at: string;
  updated_at: string | null;
}

// select diary for post id creation
export interface SelectDiaryRequest {
  diaryId: number;
}

// Community Post Creation / Editing
export interface CommunityPostUpsertRequest {
  diaryId: number;
  postTitle: string;
  diaryDate: string;
  conversationDuration?: number;
  postEmotion: string;
  postContent: string;
  postTopics: string[];
}
