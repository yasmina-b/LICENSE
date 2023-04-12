import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/Login.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        console.log("User logged in succesfully!");
        console.log(res.data);
        setUser(res.data);
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const registerHandler = () => {
    navigate("/register");
  };
  return (
    <React.Fragment>
      <h2 className="login-title">LOG IN</h2>
      <h5 className="login-subtitle">
        Already registered? Sign in to access your account.
      </h5>
      <div className="login-container">
        <TextField
          sx={{ width: 400 }}
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login-container">
        <TextField
          sx={{ width: 400 }}
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-position">
        <button className="login-button" onClick={(e) => handleUserLogin(e)}>
          SIGN IN
        </button>
      </div>
      <h2 className="register-redirect-title"> New to MINIMALIST STUDIO?</h2>
      <div className="button-position-redirect">
        <button className="register-redirect-button" onClick={registerHandler}>
          REGISTER NOW
        </button>
      </div>
    </React.Fragment>
  );
};
export default LoginPage;
