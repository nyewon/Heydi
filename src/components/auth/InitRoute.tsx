import { Navigate } from "react-router-dom";
import { Login } from "@pages/index";
import { useAuthStore } from "@stores/useAuthStore";

const InitRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return null;

  return isAuthenticated ? <Navigate to="/diary" replace /> : <Login />;
};
export default InitRoute;
