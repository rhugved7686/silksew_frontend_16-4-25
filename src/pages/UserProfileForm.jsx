/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./UserProfileForm.css";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { ToastContainer, toast } from "react-toastify";


const UserProfileForm = () => {
  const { token } = useContext(ShopContext);
  const [profile, setProfile] = useState({});

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const fetchUserDetails = async (authToken) => {
    try {
      const response = await axios.get("https://api.silksew.com/api/userProfileDetail/user-profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setProfile(response.data); // Fix: Update state with user profile
      console.log("User Profile Data:", response);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");

    if (authToken) {
      fetchUserDetails(authToken);
    } else {
      console.log("Admin token not found in localStorage. Please log in.");
    }
  }, [token]); // Dependency on `token`


  const updateProfile = async (e) => {
    // Prevent form submission from reloading the page
    e.preventDefault();
    
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.log("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await axios.put(
        "https://api.silksew.com/api/updateUserProfileDetail/update-user-profile",
        profile, // Send the updated state dynamically
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Toast will now show after a successful update
      toast.success("Profile Successfully Updated.");
      
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };
  
  
  

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form className="profile-form" onSubmit={updateProfile}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email ID:</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Pin Code:</label>
          <input type="text" name="pincode" value={profile.zipcode} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={profile.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>State:</label>
          <input type="text" name="state" value={profile.state} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea name="street" value={profile.street} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn" >Save</button>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
      </form>
      
    </div>
  );
};

export default UserProfileForm;
