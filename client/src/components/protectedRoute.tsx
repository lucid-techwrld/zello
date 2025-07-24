// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
