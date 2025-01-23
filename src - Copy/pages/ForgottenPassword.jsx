import React from "react";
import "../CSS/ForgottenPassword.css";
// import { useState } from "react";
// import axios from "axios";
// import { BASEURL } from "../config";
// import { useNavigate } from "react-router-dom";

const ForgottenPassword = () => {
 
  return (
            <div className="loginsignup">
              <div className="loginsignup-container">
                <h1>Forgot Password</h1>
                <div className="loginsignup-fields">
                  <input type="email" placeholder="Email Address" />
                </div>
                <button>Submit</button>
              </div>
            </div>
          );
        };

export default ForgottenPassword;
