import React, { useState } from "react";
import "../CSS/LoginSignup.css";
import axios from 'axios';
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { ToastContainer, toast } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const LoginSignup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation to the login page
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(BASEURL + '/api/users/register', { name, email, password });
      console.log(response);

      // Show success toast notification
      toast.success("Registration successful! You can now log in.");

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");

      // Navigate to login page after successful registration
      setTimeout(() => {
        navigate("/login"); // Navigate to the login page after delay
      }, 2000); // Delay to let the toast message show

    } catch (error) {
      console.log(error);

      // Show error toast notification if there's an issue
      toast.error("Registration failed. Please try again.");
    }
  };

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
          <button type="submit">Continue</button>
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

      {/* Toast Container for showing toast messages */}
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
    </form>
  );
};

export default LoginSignup;
