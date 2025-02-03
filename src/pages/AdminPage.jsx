/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../pages/CSS/AdminPage.css"
import { AuthContext } from "../context/AuthContext"
import AdminComplaints from "../pages/AdminComplaints"
import AdminAddProduct from "./AdminAddProduct"
import AdminProductlist from "./AdminProductlist"
import AdminNavbar from "../components/Navbar/AdminNavbar"
// eslint-disable-next-line no-unused-vars
import { faHome, faBox, faShoppingCart, faSignOutAlt, faChevronDown ,faPlus,faList,faComments } from "@fortawesome/free-solid-svg-icons"
import AdminUser from "./AdminUser"

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, token, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Dashboard")
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }



  const handleMenuClick = (option) => {
    setSelectedOption(option)
    setSidebarOpen(false)
  }

  const updateTotalProducts = (count) => {
    setTotalProducts(count)
  }

  const updateTotalOrders = (count) => {
    setTotalOrders(count)
  }

  const handleLogoutClick = () => {
    logout()
    navigate("/login")
  }

  const fetchInitialCounts = async () => {
    if (token) {
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          axios.get("http://localhost:5001/api/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5001/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const productsData = Array.isArray(productsResponse.data)
          ? productsResponse.data
          : productsResponse.data.products || []
        setTotalProducts(productsData.length)

        const ordersData = Array.isArray(ordersResponse.data) ? ordersResponse.data : ordersResponse.data.orders || []
        setTotalOrders(ordersData.length)
      } catch (error) {
        console.error("Error fetching initial counts:", error)
      }
    }
  }

  useEffect(() => {
    fetchInitialCounts()
  }, [token, fetchInitialCounts]) // Added fetchInitialCounts to dependencies

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  if (!token) {
    return <div>Loading...</div>
  }

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-container">
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-logo">Admin Panel</div>
          <ul className="sidebar-menu">
        <li onClick={() => handleMenuClick("Dashboard")}>
          <FontAwesomeIcon icon={faHome} />
          Dashboard
        </li>
        <li onClick={() => handleMenuClick("AddProduct")}>
        <FontAwesomeIcon icon={faPlus} />
          Add Product</li>
        <li onClick={() => handleMenuClick("ListProducts")}>
        <FontAwesomeIcon icon={faList} />
          List of Products</li>
        <li onClick={() => handleMenuClick("Orders")}>
          <FontAwesomeIcon icon={faShoppingCart} />
          Orders
        </li>
        <li onClick={() => handleMenuClick("complaints")}>
          <FontAwesomeIcon icon={faComments} />
          Complaints
        </li>
        <li onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </li>
      </ul>
        </div>

        <div className="hamburger-menu" onClick={toggleSidebar}>
          &#9776;
        </div>

        <div className="main-content">
          {selectedOption === "Dashboard" && (
            <section className="stats-cards">
              <div className="stat-card">
                <h3>Total Sales</h3>
                <p>Rs.5,230</p>
              </div>
              <div className="stat-card">
                <h3>Total Products</h3>
                <p>{totalProducts}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>{totalOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>350</p>
              </div>
            </section>
          )}
          {selectedOption === "AddProduct" && <AdminAddProduct />}
          {selectedOption === "ListProducts" && <AdminProductlist updateTotalProducts={updateTotalProducts} />}
          {selectedOption === "Orders" && <AdminUser updateTotalOrders={updateTotalOrders} />}
          {selectedOption === "complaints" && <AdminComplaints updateTotalOrders={updateTotalOrders} />}
        </div>
      </div>
    </>
  )
}

export default Dashboard

