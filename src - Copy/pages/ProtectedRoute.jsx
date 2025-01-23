import React from "react";
import { Navigate } from "react-router-dom"; // To handle navigation
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // Check if user is logged in and has the correct role
  if (!user) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    // If the user doesn't have the required role, redirect to the home page
    return <Navigate to="/" />;
  }

  // If the user has the required role, render the children
  return children;
};

export default ProtectedRoute;
