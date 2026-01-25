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
