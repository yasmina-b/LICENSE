import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
import TextField from "@mui/material/TextField";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCofirmPassword] = useState("");

  const handleUserRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      });

      if (res.status === 200) {
        console.log("User registered succesfully!");
        console.log(res.data);
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <React.Fragment>
      <h2 className="register-title">REGISTER NOW</h2>
      <h5 className="register-subtitle">Become a part of our community.</h5>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="First Name"
          variant="standard"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Last Name"
          variant="standard"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Re-type Password"
          variant="standard"
          type="password"
          value={confirmPassword}
          onChange={(e) => setCofirmPassword(e.target.value)}
        />
      </div>
      <div className="register-button-position">
        <button
          className="register-button"
          onClick={(e) => handleUserRegister(e)}
        >
          REGISTER NOW
        </button>
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
