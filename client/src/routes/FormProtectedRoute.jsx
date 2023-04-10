import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const FormProtectedRoute = () => {
  const { auth } = useAuth();

  return auth?.accessToken ? <Navigate to="/home" /> : <Outlet />;
};

export default FormProtectedRoute;
