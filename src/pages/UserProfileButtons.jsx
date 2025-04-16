/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useState, useContext, useCallback } from "react"
import axios from "axios"
import { ShopContext } from "../context/ShopContext"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import profile_icon from "../components/Assets/profile_icon.png"
import "../pages/CSS/UserProfile.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import OrderItems from "../components/OrderItems/OrderItems"

const UserProfileButtons = () => {
  // eslint-disable-next-line no-unused-vars
  const { token } = useContext(ShopContext)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("info")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [userProducts, setUserProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [debugMode, setDebugMode] = useState(false)

  const menuItems = [
    { id: "info", title: "Info", icon: "👤" },
    { id: "orders", title: "My Orders", icon: "📦" },
    { id: "logout", title: "Logout", icon: "🚪" },
  ]

  useEffect(() => {
    fetchUserData()
    fetchUserProducts()
  }, [])

  const fetchUserData = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("token")
      if (!authToken) {
        toast.error("No authentication token found. Please log in.")
        return
      }
      const response = await axios.get("https://api.silksew.com/api/userProfileDetail/user-profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      setUserData(response.data)
    } catch (err) {
      console.error("Error fetching user data:", err)
      toast.error("Failed to fetch user data. Please try again later.")
    }
  }, [])

  const fetchUserProducts = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("token")
      if (!authToken) {
        toast.error("No authentication token found. Please log in.")
        return
      }
      const response = await axios.get("https://api.silksew.com/api/orders", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      setUserProducts(response.data)
    } catch (err) {
      console.error("Error fetching user products:", err)
      toast.error("Failed to fetch user products. Please try again later.")
    }
  }, [])

  const handleLogoutClick = () => {
    logout()
    navigate("/login")
  }

  // eslint-disable-next-line no-unused-vars
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token")
    // Clear any user-related state
    setUserData(null)
    setUserProducts([])
    // Show a success message
    toast.success("Logged out successfully")
    // Redirect to the login page or home page
    navigate("/login") // Adjust this path as needed
  }

  const handleTabClick = (tabId) => {
    if (tabId === "logout") {
      handleLogoutClick()
    } else {
      setActiveTab(tabId)
      setIsSidebarOpen(false)
      setIsEditing(false)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div className="tab-content">
            <h2 style={{ color: "#000" }}>User Information</h2>
            {isEditing ? renderUserForm() : renderUserCard()}
          </div>
        )
      case "orders":
        return <OrderItems />
      default:
        return null
    }
  }

  const renderUserCard = () => (
    <section className="container-fluid">
      <div className="profile-bg container">
        <div className="content">
          <img src={profile_icon || "/placeholder.svg"} alt="Logo" />
          <h4>
            <strong>User Name : </strong>
            {userData?.name}
          </h4>
          <br />
          <h4>
            <strong>Phone : </strong> {userData?.phone || "Not provided"}
          </h4>
          <br />
          <h4>
            <strong>Email : </strong> {userData?.email}
          </h4>
        </div>
        <button className="btn btn-default" onClick={() => setIsEditing(true)}>
          Edit Profile
        </button>
      </div>
    </section>
  )

  const renderUserForm = () => (
    <section className="container-fluid">
      <div className="profile-bg container">
        <div className="content">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" defaultValue={userData?.name} />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input type="tel" className="form-control" id="phone" defaultValue={userData?.phone} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" id="email" defaultValue={userData?.email} />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </section>
  )

  return (
    <div className="user-profile-container">
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">User Profile</h2>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-menu-item">
              <button
                className={`sidebar-menu-button ${activeTab === item.id ? "active" : ""}`}
                onClick={() => handleTabClick(item.id)}
              >
                <span className="sidebar-menu-icon">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <main className="main-content">
        <h1>Welcome to Your Profile</h1>
        {renderContent()}
      </main>
      <ToastContainer />
    </div>
  )
}

export default UserProfileButtons

