import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Login } from "@pages/index";
import { useAuthStore } from "@stores/useAuthStore";
import { useFCM } from "@hooks/useFCM";
import { registerFcmToken } from "@services/auth";

const InitRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const fcmToken = useFCM();

  const [isFcmSent, setIsFcmSent] = useState(false);

  useEffect(() => {
    const isSocialLogin = sessionStorage.getItem("socialLogin");

    if (!isSocialLogin) {
      setIsFcmSent(true);
      return;
    }

    if (!isAuthenticated) return;
    if (!fcmToken) return;

    const sendToken = async () => {
      try {
        await registerFcmToken({ fcmToken });
        sessionStorage.removeItem("socialLogin");
        setIsFcmSent(true);
      } catch (e) {
        console.error("FCM 토큰 등록 실패", e);
      }
    };

    sendToken();
  }, [isAuthenticated, fcmToken]);

  if (isLoading) return null;

  if (isAuthenticated && !isFcmSent) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/diary" replace /> : <Login />;
};

export default InitRoute;
