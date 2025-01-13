import React from "react";
import "../CSS/Login.css";
import { useState } from "react";
import axios from "axios";
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/"); // Navigate to the home page
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password'); // Redirect to Forgot Password page
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(BASEURL + "/api/user/userlogin", {
        email,
        password,
      });
      console.log(response);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} action="">
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className="loginsignup-link" onClick={handleLoginClick}>
            Continue
          </button>
          <p className="login-forgotpassword">
            Forgot password ? 
            <span
            className="login-forgotpassword-link"
            onClick={handleForgotPasswordClick} // Attach the handler here
          >
            Reset it
          </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
