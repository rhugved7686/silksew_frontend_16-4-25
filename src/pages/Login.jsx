import React, { useEffect, useState } from "react";
import "../CSS/LoginSignup.css";
import axios from "axios";
import { BASEURL } from "../config"; // Your API base URL
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation to the signup page
  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to backend to authenticate the user
      const response = await axios.post(BASEURL + "/api/users/login", {
        email,
        password,
      });

      console.log(response);

      if (response.status === 200) {
        // Store JWT token and user info in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user info
        localStorage.setItem("token", response.data.token); // Store JWT token

        setEmail("");
        setPassword("");

        // Navigate to home/dashboard after successful login
        navigate("/"); // Adjust the route as necessary
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password. Please try again."); // Set error message
    }
  };

  useEffect(()=>{
    console.log(localStorage.getItem("token"));
  },[])

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
          <button>Continue</button>
          <p className="loginsignup-login">
            Don't have an account?{" "}
            <span className="loginsignup-link" onClick={handleSignupClick}>
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
