import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@stores/useAuthStore";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
