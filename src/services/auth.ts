import instance from "./axios";
import {
  LoginRequest,
  SignupRequest,
  UsernameCheckRequest,
} from "@models/auths";
import { UserInfoUpdateRequest } from "@models/mypage";

// 자체 로그인
export const login = async (payload: LoginRequest) => {
  const res = await instance.post("/auth/login", payload);
  return res.data;
};

// 아이디 중복 체크
export const usernameCheck = async (payload: UsernameCheckRequest) => {
  const res = await instance.post("/auth/check-username?username=", payload);
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
