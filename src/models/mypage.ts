// Mypage Info
export interface MypageInfoResponse {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  likedPostCount: number;
  sharedPostCount: number;
  alarm: {
    enabled: boolean;
  };
}

// Profile(User) Info
export interface UserInfoResponse {
  userId: number;
  username: string;
  profileImageUrl: string;
  nickname: string;
  password: string;
}

// Profile(User) Update Request
export interface UserInfoUpdateRequest {
  nickname: string;
  currentPassword?: string;
  newPassword?: string;
  profileImage?: File | null;
  deleteProfileImage: boolean;
}

// Like Posts & Shared Posts List Response
export interface MypagePostListResponse {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  postId: number;
  diaryId: number;
  title: string;
  preview: string;
  emotion: string;
  topics: string[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

// Alarm Response & Request
export interface AlarmResponseRequest {
  enabled: boolean;
  meridiem: "AM" | "PM";
  hour: number;
  minute: number;
}
