import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const TokenProtectedRoute = () => {
  const { auth } = useAuth();

  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default TokenProtectedRoute;
