import React from "react";
import "../styles/Register.css";
import TextField from "@mui/material/TextField";

const RegisterPage = () => {
  return (
    <React.Fragment>
      <h2 className="register-title">REGISTER NOW</h2>
      <h5 className="register-subtitle">Become a party of our community.</h5>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Email"
          variant="standard"
        />
      </div>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="First Name"
          variant="standard"
        />
      </div>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Last Name"
          variant="standard"
        />
      </div>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Password"
          variant="standard"
        />
      </div>
      <div className="register-container">
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Re-type Password"
          variant="standard"
        />
      </div>
      <div className="register-button-position">
        <button className="register-button">REGISTER NOW</button>
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
