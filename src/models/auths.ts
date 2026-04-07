export interface LoginRequest {
  username: string;
  password: string;
  fcmToken: string | null;
}

export interface SignupRequest {
  username: string;
  password: string;
  nickname: string;
  profileImage: File | null;
}

export interface UsernameCheckRequest {
  username: string;
}

export interface FcmTokenRequest {
  fcmToken: string;
}
