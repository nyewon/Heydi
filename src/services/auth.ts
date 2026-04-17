import instance from "./axios";
import {
  FcmTokenRequest,
  LoginRequest,
  SignupRequest,
  UsernameCheckRequest,
} from "@models/auths";
import { AlarmResponseRequest, UserInfoUpdateRequest } from "@models/mypage";

// 자체 로그인
export const login = async (payload: LoginRequest) => {
  const res = await instance.post("/auth/login", payload);
  return res.data;
};

// 아이디 중복 체크
export const usernameCheck = async (payload: UsernameCheckRequest) => {
  const res = await instance.post("/auth/check-username", payload);
  return res.data;
};

// 회원가입
export const signup = async (payload: SignupRequest) => {
  const formData = new FormData();

  formData.append("username", payload.username);
  formData.append("password", payload.password);
  formData.append("nickname", payload.nickname);

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  }

  const res = await instance.post("/auth/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// 소셜 로그인
export const socialLogin = (provider: "google" | "kakao") => {
  sessionStorage.setItem("socialLogin", "true");
  window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/${provider}`;
};

// 유저 정보 수정
export const updateUserInfo = async (payload: UserInfoUpdateRequest) => {
  const formData = new FormData();

  formData.append("nickname", payload.nickname);

  if (payload.currentPassword) {
    formData.append("currentPassword", payload.currentPassword);
  }

  if (payload.newPassword) {
    formData.append("newPassword", payload.newPassword);
  }

  if (payload.profileImage !== undefined) {
    if (payload.profileImage === null) {
      formData.append("profileImage", "");
    } else {
      formData.append("profileImage", payload.profileImage);
    }
  }

  formData.append(
    "deleteProfileImage",
    payload.deleteProfileImage ? "true" : "false",
  );

  const res = await instance.patch("/mypage/profile/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// 유저 정보 조회
export const getUserInfo = async () => {
  const res = await instance.get("/mypage/profile/me");
  return res.data;
};

// 로그아웃
export const logout = async () => {
  const res = await instance.post("/auth/logout");
  return res.data;
};

// 회원 탈퇴
export const withdraw = async () => {
  const res = await instance.delete("/auth/withdraw");
  return res.data;
};

// 마이페이지 메인 조회
export const getMypageMain = async () => {
  const res = await instance.get("/users/me");
  return res.data;
};

// 내가 공유한 글 목록 조회
export const getSharedPosts = async (page = 0, size = 10) => {
  const res = await instance.get("/mypage/shared", {
    params: { page, size },
  });

  return res.data;
};

// 내가 좋아요 한 글 목록 조회
export const getLikedPosts = async (page = 0, size = 10) => {
  const res = await instance.get("/mypage/likes", {
    params: { page, size },
  });

  return res.data;
};

// 알림 비활성화
export const disableReminder = async () => {
  const res = await instance.put("/settings/reminder/disable");
  return res.data;
};

// 알림 설정 조회
export const getReminder = async () => {
  const res = await instance.get("/settings/reminder");
  return res.data;
};

// 알림 설정 변경
export const updateReminder = async (payload: AlarmResponseRequest) => {
  const res = await instance.put("/settings/reminder", payload);
  return res.data;
};

// FCM 토큰 등록
export const registerFcmToken = async (payload: FcmTokenRequest) => {
  const res = await instance.post("/settings/fcmtoken", payload);
  return res.data;
};
