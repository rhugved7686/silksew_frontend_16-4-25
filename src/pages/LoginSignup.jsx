import React from "react";
import "../CSS/LoginSignup.css";
import { useState } from "react";
import axios from 'axios'
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const LoginSignup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation to the login page
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.post(BASEURL + '/api/users/register', { name, email, password })
      console.log(response);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} action="">
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          </div>
          <button>Continue</button>
          <p className="loginsignup-login">
            Already have an account? 
            <span
            className="loginsignup-link"
            onClick={handleLoginClick} // Attach the handler here
          >
            Login here
          </span>
          </p>
         
          <div className="loginsignup-agree">
            <input type="checkbox" />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;
