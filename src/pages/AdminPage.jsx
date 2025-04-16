/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../pages/CSS/AdminPage.css"
import { AuthContext } from "../context/AuthContext"
import AdminComplaints from "../pages/AdminComplaints"
import ConfirmedOrder from "./ShippedOrders"
import AdminAddProduct from "./AdminAddProduct"
import AdminProductlist from "./AdminProductlist"
import AdminNavbar from "../components/Navbar/AdminNavbar"
import {
  faHome,
  faShoppingCart,
  faSignOutAlt,
  faPlus,
  faList,
  faComments,
  faTruck,
  faCheck,
  faUndo
} from "@fortawesome/free-solid-svg-icons"
import AdminUser from "./AdminUser"
import ShippedOrders from "./ConfirmedOrders"
import ReturnOrderList from "../components/ReturnOrderList/ReturnOrderList"

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Dashboard")
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [confirmedOrdersCount, setConfirmedOrdersCount] = useState(0)
  const [totalSales, setTotalSales] = useState(() => {
    const storedTotalSales = localStorage.getItem("totalSales")
    return storedTotalSales ? Number.parseFloat(storedTotalSales) : 0
  })

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

  const updateConfirmedOrdersCount = (count) => {
    setConfirmedOrdersCount(count)
  }

  const updateTotalSales = (amount) => {
    setTotalSales(amount)
    localStorage.setItem("totalSales", amount.toString())
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

        // Calculate total sales and confirmed orders count
        let totalSales = 0
        let confirmedCount = 0
        ordersData.forEach((order) => {
          if (order.status === "ConfirmedOrder") {
            totalSales += order.totalAmount || 0
            confirmedCount++
          }
        })
        updateTotalSales(totalSales)
        setConfirmedOrdersCount(confirmedCount)
      } catch (error) {
        console.error("Error fetching initial counts:", error)
      }
    }
  }

  useEffect(() => {
    fetchInitialCounts()
  }, [fetchInitialCounts]) // Removed token from dependency array

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
              Add Product
            </li>
            <li onClick={() => handleMenuClick("ListProducts")}>
              <FontAwesomeIcon icon={faList} />
              List of Products
            </li>
            <li onClick={() => handleMenuClick("Orders")}>
              <FontAwesomeIcon icon={faShoppingCart} />
              Orders
            </li>
            <li onClick={() => handleMenuClick("ReturnRequest")}>
           
              <FontAwesomeIcon icon={faUndo} />
              Return Request
            </li>
            <li onClick={() => handleMenuClick("ShippedOrders")}>
              <FontAwesomeIcon icon={faCheck} />
              Confirmed Order
            </li>
            <li onClick={() => handleMenuClick("ConfirmedOrder")}>
              <FontAwesomeIcon icon={faTruck} />
              Shipped Orders
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
                <p>Rs.{totalSales.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Total Products</h3>
                <p>{totalProducts}</p>
              </div>
              <div className="stat-card">
                <h3>Orders Request</h3>
                <p>{totalOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Confirmed Orders</h3>
                <p>{confirmedOrdersCount}</p>
              </div>
            </section>
          )}
          {selectedOption === "AddProduct" && <AdminAddProduct />}
          {selectedOption === "ListProducts" && <AdminProductlist updateTotalProducts={updateTotalProducts} />}
          {selectedOption === "Orders" && <AdminUser updateTotalOrders={updateTotalOrders} />}
          {selectedOption === "complaints" && <AdminComplaints updateTotalOrders={updateTotalOrders} />}
          {selectedOption === "ConfirmedOrder" && (
            <ConfirmedOrder
              updateTotalOrders={updateTotalOrders}
              updateTotalSales={updateTotalSales}
              updateConfirmedOrdersCount={updateConfirmedOrdersCount}
            />
          )}
          {selectedOption === "ShippedOrders" && <ShippedOrders updateTotalOrders={updateTotalOrders} />}

          {selectedOption === "ReturnRequest" && <ReturnOrderList />}
        </div>
      </div>
    </>
  )
}

export default Dashboard

