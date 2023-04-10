import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../utils/axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../utils/useAxiosPrivate";
import useLogout from "../utils/useLogout";

const Home = () => {
  const { auth, setAuth } = useAuth();
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosPrivate.get(`/user/me`);

        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  const handleLogout = async () => {
    logout();
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosPrivate.delete("/user/me");

      logout();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      Welcome <b>{`${auth.username}#${auth.hashtag}`}</b>
      <div className="form">
        <button onClick={handleLogout}>Log out</button>
        <button onClick={handleDeleteAccount}>Delete account</button>
      </div>
      {data && (
        <div className="form">
          <p>id: {data._id}</p>
          <p>username: {data.username}</p>
          <p>hashtag: {data.hashtag}</p>
          <p>role: {data.roles}</p>
        </div>
      )}
      <div>
        <h1>Links:</h1>
        <NavLink to="/edit">Edit page</NavLink>
      </div>
    </div>
  );
};

export default Home;
