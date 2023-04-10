import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            const newAccessToken = await refresh();
            prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;

            return axiosPrivate(prevRequest);
          } catch (e) {
            return Promise.reject(error);
          }
        } else if (error?.response?.status === 403) {
          // await axiosPrivate.post("/auth/clearRefreshToken");
          navigate("/unauthorized");
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
