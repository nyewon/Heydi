export interface LoginRequest {
  username: string;
  password: string;
  fcm_token: string | null;
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
