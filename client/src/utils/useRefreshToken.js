import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "./axios";
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axiosPrivate.post("/auth/refresh");

      const { accessToken, username, hashtag, role } = response.data;

      setAuth((prev) => {
        return {
          ...prev,
          accessToken: accessToken,
          username: username,
          hashtag: hashtag,
          role: role,
        };
      });
      return accessToken;
    } catch (e) {
      await axiosPrivate.post("/auth/clearRefreshToken");

      setAuth({});
      navigate("/login");
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
