import axios from "axios";
import { LoginRequest } from "@models/auths";

export const login = async (payload: LoginRequest) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/login`,
    payload,
  );
  return res.data;
};
