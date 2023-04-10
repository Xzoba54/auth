import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "./useRefreshToken";

const VerifyToken = () => {
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const [serverError, setServerError] = useState(false);

  const refresh = useRefreshToken();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refresh();

        setLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken ? refreshToken() : setLoading(false);
  }, []);

  return loading ? <span>Loading...</span> : <Outlet />;
};

export default VerifyToken;
