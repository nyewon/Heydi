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
  userId: number;
  username: string;
  profileImage: string;
  nickname: string;
  newpassword?: string;
}
