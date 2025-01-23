import React, { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import profile_icon from "../Assets/profile_icon.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogoutClick = () => {
    logout(); // Call logout from AuthContext
    navigate("/login"); // Redirect to login page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".profile-info-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>SILKSEW</p>
      </div>
    </div>
  );
};

export default AdminNavbar;
