import React from "react";
import "../styles/Login.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

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
        />
      </div>
      <div className="login-container">
        <TextField
          sx={{ width: 400 }}
          id="standard-basic"
          label="Password"
          variant="standard"
        />
      </div>
      <div className="button-position">
        <button className="login-button">SIGN IN</button>
      </div>
      <h2 className="register-redirect-title"> New to MINIMALIST STUDIO?</h2>
      <h5 className="register-redirect-subtitle">
        Get faster checkouts, access your order history and create a wishlist
      </h5>
      <div className="button-position-redirect">
        <button className="register-redirect-button" onClick={registerHandler}>
          REGISTER NOW
        </button>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
