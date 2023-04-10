import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../utils/axios.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      await axios.post("/auth/register", payload);

      navigate("/login");
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="form">
      <h1>Register</h1>
      <input onChange={handleUsername} type="text" placeholder="username" />
      <input onChange={handleEmail} type="text" placeholder="email" />
      <input onChange={handlePassword} type="text" placeholder="password" />
      <input onChange={handleConfirmPassword} type="text" placeholder="confirm password" />
      {error && <span className="error">{error}</span>}
      <button onClick={handleSubmit}>Sign in</button>
      <NavLink to="/login">Log in</NavLink>
    </div>
  );
};

export default Register;
