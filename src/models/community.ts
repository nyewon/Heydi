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
  userId: number;
  nickname: string;
  profileUrl: string;
}

export interface PostDetailResponse {
  postId: number;
  author: PostAuthor;
  diaryId: number;
  diaryDate: string;
  postTitle: string;
  postTopics: string[];
  postEmotion: string;
  postContent: string;
  photos: {
    id: number;
    imageUrl: string;
    order: number;
  }[];
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface CommunityComment {
  commentId: number;
  userId: number;
  nickname: string;
  profileUrl: string;
  content: string;
  isMine: boolean;
  createdAt: string;
}

export interface CommunityCommentListResponse {
  comments: CommunityComment[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface CreateCommentRequest {
  content: string;
}

export interface CommunityCommentMutationResult {
  commentId: number;
  userId: number;
  nickname: string;
  profileUrl: string;
  content: string;
  isMine: boolean;
  createdAt: string;
  updatedAt: string | null;
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
  existingPhotos: {
    imageUrl: string;
  }[];
}
