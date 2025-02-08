import { useEffect, useState, useContext, useCallback, useMemo } from "react"
import axios from "axios"
import { ShopContext } from "../context/ShopContext"
import moment from "moment"
import profile_icon from "../components/Assets/profile_icon.png"
import "../pages/CSS/UserProfile.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const UserProfileButtons = () => {
  // eslint-disable-next-line no-unused-vars
  const { token } = useContext(ShopContext)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("info")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [userProducts, setUserProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [debugMode, setDebugMode] = useState(false)

  const menuItems = [
    { id: "info", title: "Info", icon: "👤" },
    { id: "orders", title: "Your Orders", icon: "📦" },
  ]

  const fetchUserData = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("token")
      if (!authToken) {
        toast.error("No authentication token found. Please log in.")
        setLoading(false)
        return
      }
      const response = await axios.get("https://api.silksew.com/api/userProfileDetail/user-profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      setUserData(response.data)
      if (debugMode) console.log("User data fetched:", response.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching user data:", err)
      toast.error("Failed to fetch user data. Please try again later.")
      setLoading(false)
    }
  }, [debugMode])

  const fetchUserProducts = useCallback(async () => {
    setLoadingProducts(true)
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
      if (debugMode) console.log("User products fetched:", response.data)
      setLoadingProducts(false)
    } catch (err) {
      console.error("Error fetching user products:", err)
      toast.error("Failed to fetch user products. Please try again later.")
      setLoadingProducts(false)
    }
  }, [debugMode])

  useEffect(() => {
    fetchUserData()
    fetchUserProducts()
  }, [fetchUserData, fetchUserProducts])

  useEffect(() => {
    // console.log("userProducts or userData changed:")
    // console.log("userProducts:", userProducts)
    // console.log("userData:", userData)
  }, [userProducts, userData])

  const filteredOrders = useMemo(() => {
    // console.log("Filtering orders. User data:", userData)
    // console.log("All orders:", userProducts)

    if (!userData || !userProducts.length) {
      // console.log("No user data or no orders. Returning empty array.")
      return []
    }

    return userProducts.filter((order) => {
      // console.log("Checking order:", order)
      // console.log("Order address:", order.address)
      const orderEmail = order.address && order.address.email ? order.address.email.toLowerCase() : null
      const userEmail = userData.email ? userData.email.toLowerCase() : null
      // console.log("Order email (lowercase):", orderEmail)
      // console.log("User email (lowercase):", userEmail)

      const isMatch = orderEmail === userEmail
      // console.log("Is match?", isMatch)

      return isMatch
    })
  }, [userData, userProducts])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setIsSidebarOpen(false)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    if (userData) {
      setUserData({ ...userData, [e.target.name]: e.target.value })
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    if (!token) {
      toast.error("Please log in to update your profile.")
      return
    }

    try {
      const response = await axios.put(
        "https://api.silksew.com/api/updateUserProfileDetail/update-user-profile",
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      toast.success("Profile Successfully Updated.")
      setIsEditing(false)
      fetchUserData()
      if (debugMode) console.log(response)
    } catch (error) {
      console.error("Update failed:", error)
      toast.error("Update failed. Please try again.")
    }
  }

  const renderUserCard = () => (
<section className="container-fluid">
  <div className="profile-bg container">
    <div className="content">
      <img src={profile_icon || "/placeholder.svg"} alt="Logo" />
      <h4><strong>User Name : </strong>{userData?.name}</h4><br/>{/* Moved outside <p> */}
      <h4><strong>Phone : </strong> {userData?.phone || "Not provided"}</h4><br/>
      <h4><strong>Email : </strong> {userData?.email}</h4>
    </div>
    <button className="btn btn-default" onClick={() => setIsEditing(true)}>
      Edit Profile
    </button>
  </div>
</section>

  )

  const renderUserForm = () => (
    <>
      <form className="profile-form" onSubmit={updateProfile}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={userData?.name || ""} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input type="email" id="email" name="email" value={userData?.email || ""} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="text" id="phone" name="phone" value={userData?.phone || ""} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode">Pin Code:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={userData?.zipcode || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={userData?.city || ""} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={userData?.state || ""} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="street">Address:</label>
          <textarea id="street" name="street" value={userData?.street || ""} onChange={handleChange} required />
        </div>
      </form>
      <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save
          </button>
          <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
    </>
  )

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>
    }

    if (!userData) {
      return <div>No user data available.</div>
    }

    switch (activeTab) {
      case "info":
        return (
          <div className="tab-content">
            <h2 style={{ color: "#000" }}>User Information</h2>
            {isEditing ? renderUserForm() : renderUserCard()}
          </div>
        )
      case "orders":
        return (
          <>
          <h2 style={{ color: "#000" }}>Your Orders</h2>
            <div className="tab-content">
            {loadingProducts ? (
              <div>Loading orders...</div>
            ) : (
              <>
                {filteredOrders.length > 0 ? (
                  <table className="user-products-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product Details</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Tentative Delivery Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>
                            {order.items.map((item, index) => (
                              <div key={index}>
                                <p>Product Name: {item.productName}</p>
                                <p>Product Color : {item.color}</p>
                                <p>Size: {item.size}</p>
                                <p>Quantity: {item.quantity}</p>
                              </div>
                            ))}
                            {/* <div>
                              <p>Email: {order.address.email}</p>
                            </div> */}
                          </td>
                          <td>Rs.{order.totalAmount}</td>
                          <td>{order.status}</td>
                          <td>{moment(order.createdAt).format("MMMM D, YYYY")}</td>
                          <td data-label="Tentative Delivery Date">{order.tentativeDeliveryDate ? moment(order.tentativeDeliveryDate).format("YYYY-MM-DD") : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No orders found for your email address. Your email: {userData?.email}</p>
                )}
              </>
            )}
          </div>
          </>
        )
      default:
        return null
    }
  }

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
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
      {/* Debug mode toggle */}
      {/* <button onClick={() => setDebugMode(!debugMode)} style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        {debugMode ? "Disable Debug" : "Enable Debug"}
      </button> */}
    </div>
  )
}

export default UserProfileButtons

