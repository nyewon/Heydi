import axios from "axios";
import {
  LoginRequest,
  SignupRequest,
  UsernameCheckRequest,
} from "@models/auths";

export const login = async (payload: LoginRequest) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/login`,
    payload,
  );
  return res.data;
};

export const usernameCheck = async (payload: UsernameCheckRequest) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/check-username?username=`,
    payload,
  );
  return res.data;
};

export const signup = async (payload: SignupRequest) => {
  const formData = new FormData();

  formData.append("username", payload.username);
  formData.append("password", payload.password);
  formData.append("nickname", payload.nickname);

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  }

  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    },
  );

  return res.data;
};
