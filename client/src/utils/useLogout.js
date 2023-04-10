import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axiosPrivate.post("/auth/clearRefreshToken");

      setAuth({});
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return logout;
};

export default useLogout;
