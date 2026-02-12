import { create } from "zustand";
import { getUserInfo } from "@services/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  loginSuccess: (user: any | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  checkAuth: async () => {
    try {
      const res = await getUserInfo();
      set({
        isAuthenticated: true,
        user: res.result,
        isLoading: false,
      });
    } catch {
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  },

  loginSuccess: (user: any) => {
    set({
      isAuthenticated: true,
      user,
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
