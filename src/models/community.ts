// Community Post List
export interface PostListItem {
  post_id: number;
  user_id: number;
  nickname: string;
  profile_url: string;
  post_title: string;
  post_topics: string[];
  post_emotion: string;
  post_content: string;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  created_at: string;
}

export interface PostListResponse {
  posts: PostListItem[];
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

// Community Post Creation / Editing
export interface CommunityPostUpsertRequest {
  diary_id: number;
  post_title: string;
  diary_date: string;
  conversation_duration?: number;
  post_emotion: string;
  post_content: string;
  post_topics: string[];
}
