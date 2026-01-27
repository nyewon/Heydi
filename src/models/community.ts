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
