// import React, { useEffect, useState, useContext } from "react";
// import "../CSS/LoginSignup.css";
// import axios from "axios";
// import { BASEURL } from "../config"; // Your API base URL
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// import { AuthContext } from "../context/AuthContext"; // Import AuthContext
// import { toast } from "react-toastify"; // Import toast from react-toastify
// import "react-toastify/dist/ReactToastify.css"; // Import styles for react-toastify

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // To handle error messages

//   const { login, user } = useContext(AuthContext); // Use login function from AuthContext
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Function to handle navigation to the signup page
//   const handleSignupClick = () => {
//     navigate("/signup"); // Navigate to the signup page
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     setError(""); // Clear previous error messages

//     try {
//       // Send POST request to backend to authenticate the user
//       const response = await axios.post(BASEURL + "/api/users/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         const { user, token } = response.data;

//         // Use AuthContext login function to store user and token
//         login(user, token);

//         setEmail("");
//         setPassword("");

//         // Show success message
//         toast.success("Login successful!");

//         // Navigate based on user role
//         if (user.role === "admin") {
//           navigate("/admin"); // Navigate to admin dashboard
//         } else {
//           navigate("/"); // Navigate to home page for non-admin users
//         }
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       const message =
//         error.response && error.response.data && error.response.data.message
//           ? error.response.data.message
//           : "Invalid email or password. Please try again.";

//       setError(message); // Set error message

//       // Show error toast
//       toast.error(message);
//     }
//   };

//   useEffect(() => {
//     // Check if the user is already logged in and redirect them if needed
//     const token = localStorage.getItem("token");

//     // Check if token exists and if the user is not logged in
//     if (token && !user) {
//       navigate("/"); // Redirect to home if already logged in
//     }
//   }, [navigate, user]); // Re-run if `user` or `navigate` changes

//   return (
//     <form onSubmit={onSubmitHandler}>
//       <div className="loginsignup">
//         <div className="loginsignup-container">
//           <h1>Login</h1>
//           <div className="loginsignup-fields">
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               placeholder="Email Address"
//               required
//             />
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Password"
//               required
//             />
//           </div>
//           {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
//           <button type="submit">Continue</button>
//           <p className="loginsignup-login">
//             Don't have an account?{" "}
//             <span className="loginsignup-link" onClick={handleSignupClick}>
//               Sign up here
//             </span>
//           </p>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Login;



import React, { useEffect, useState, useContext } from "react";
import "../CSS/LoginSignup.css";
import axios from "axios";
import { BASEURL } from "../config"; // Your API base URL
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import styles for react-toastify

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages

  const { login, user } = useContext(AuthContext); // Use login function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation to the signup page
  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to the signup page
  };
  const handlePasswordReset = () => {
    navigate("/password-reset"); // Navigate to the signup page
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous error messages

    try {
      // Send POST request to backend to authenticate the user
      const response = await axios.post(BASEURL + "/api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token } = response.data;

        // Use AuthContext login function to store user and token
        login(user, token);

        setEmail("");
        setPassword("");

        // Show success message
        toast.success("Login successful!");

        // Navigate based on user role
        if (user.role === "admin") {
          navigate("/admin"); // Navigate to admin dashboard
        } else {
          navigate("/"); // Navigate to home page for non-admin users
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Invalid email or password. Please try again.";

      setError(message); // Set error message

      // Show error toast
      toast.error(message);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in and redirect them if needed
    const token = localStorage.getItem("token");

    // Check if token exists and if the user is not logged in
    if (token && !user) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [navigate, user]); // Re-run if `user` or `navigate` changes

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
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
          <button type="submit">Continue</button>
          <p className="loginsignup-login">
            Don't have an account?{" "}
            <span className="loginsignup-link" onClick={handleSignupClick}>
              Sign up here
            </span>
          </p>
          <p style={{ color: "#666", fontWeight: "bold", margin: "20px 120px" }}>Forgot Password 
            <span style={{color:"#ff4141",textDecoration: "underline",cursor: "pointer", fontWeight: "600", marginLeft:"9px"}} onClick={handlePasswordReset}>
            Click here
          </span></p>
        </div>
      </div>
    </form>
  );
};

export default Login;
