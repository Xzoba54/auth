import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosPrivate } from "../../utils/axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosPrivate.post("/auth/login", payload);
      const { id, username, hashtag, role, accessToken } = response.data;

      setAuth((prev) => ({ id: id, username: username, hashtag: hashtag, role: role, accessToken: accessToken }));

      navigate("/home");
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <input onChange={handleEmail} type="text" placeholder="Email" />
      <input onChange={handlePassword} type="password" placeholder="Password" />
      {error && <span className="error">{error}</span>}
      <button onClick={handleSubmit}>Log in</button>
      <NavLink to="/register">Create account</NavLink>
    </div>
  );
};

export default Login;
