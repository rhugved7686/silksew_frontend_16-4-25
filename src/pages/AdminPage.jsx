// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
// import "../pages/CSS/AdminPage.css";
// import { AuthContext } from "../context/AuthContext"; // Ensure you have AuthContext imported
// import AdminAddProduct from "./AdminAddProduct"; // Import the AdminAddProduct component
// import AdminProductlist from "./AdminProductlist"; // Import the AdminProductlist component
// import AdminNavbar from "../components/Navbar/AdminNavbar";
// import AdminOrders from "./AdminOrders"; // Import the AdminOrders component
// import AdminUser from "./AdminUser"; // Import the AdminOrders component

// const Dashboard = () => {
//   // eslint-disable-next-line no-unused-vars
//   const { user, token, logout } = useContext(AuthContext); // Destructure logout from AuthContext
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isDropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state for Products
//   const [selectedOption, setSelectedOption] = useState("Dashboard"); // Set default to 'Dashboard'
//   // eslint-disable-next-line no-unused-vars
//   const [srno, setSrno] = useState(1); // Track srno value
//   const [totalProducts, setTotalProducts] = useState(0); // Track the total number of products

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen); // Toggle the dropdown for Products
//   };

//   const handleMenuClick = (option) => {
//     setSelectedOption(option);
//     setSidebarOpen(false); // Close the sidebar after selecting an option
//   };

//   const updateTotalProducts = (count) => {
//     setTotalProducts(count); // Update totalProducts when called from AdminProductlist
//   };

//   const handleLogoutClick = () => {
//     logout(); // Call logout function from AuthContext
//     navigate("/login"); // Redirect to login page after logout
//   };

//   useEffect(() => {
//     // Redirect to login page if the user is not authenticated
//     if (!token) {
//       navigate("/login"); // Redirect to the login page
//     }
//   }, [token, navigate]);

//   // If the user is not authenticated, render a loading screen while redirecting
//   if (!token) {
//     return <div>Loading...</div>; // You can show a loading screen or message while redirecting
//   }

//   return (
//     <>
//       <AdminNavbar />
//       <div className="dashboard-container">
//         <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//           <div className="sidebar-logo">Admin Panel</div>
//           <ul className="sidebar-menu">
//             <li onClick={() => handleMenuClick("Dashboard")}>Dashboard</li>
//             <li>
//               Products
//               <span
//                 className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
//                 onClick={toggleDropdown}
//               >
//                 &#9660;
//               </span>
//               <ul className={`submenu ${isDropdownOpen ? "open" : ""}`}>
//                 <li onClick={() => handleMenuClick("AddProduct")}>Add Product</li>
//                 <li onClick={() => handleMenuClick("ListProducts")}>List of Products</li>
//               </ul>
//             </li>
//             <li onClick={() => handleMenuClick("Orders")}>Orders</li>
//             <li onClick={() => handleMenuClick("Users")}>Users</li> 
//             <li onClick={handleLogoutClick}>Logout</li>
//           </ul>
//         </div>

//         <div className="hamburger-menu" onClick={toggleSidebar}>
//           &#9776;
//         </div>

//         <div className="main-content">
//           {selectedOption === "Dashboard" && (
//             <section className="stats-cards">
//               <div className="stat-card">
//                 <h3>Total Sales</h3>
//                 <p>Rs.5,230</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Total Products</h3>
//                 <p>{totalProducts}</p> {/* Display total products */}
//               </div>
//               <div className="stat-card">
//                 <h3>Total Orders</h3>
//                 <p>89</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Total Users</h3>
//                 <p>350</p>
//               </div>
//             </section>
//           )}
//           {selectedOption === "AddProduct" && <AdminAddProduct srno={srno} />} {/* Pass srno to AdminAddProduct */}
//           {selectedOption === "ListProducts" && (
//             <AdminProductlist
//               updateTotalProducts={updateTotalProducts}
//               srno={srno}
//             /> // Pass updateTotalProducts function to AdminProductlist
//           )}
//           {selectedOption === "Orders" && <AdminOrders />} 
//           {selectedOption === "User" && <AdminUser />} {/* Render OrderItems when 'Users' is selected */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;



import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../pages/CSS/AdminPage.css";
import { AuthContext } from "../context/AuthContext"; // Ensure you have AuthContext imported
import AdminAddProduct from "./AdminAddProduct"; // Import the AdminAddProduct component
import AdminProductlist from "./AdminProductlist"; // Import the AdminProductlist component
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AdminOrders from "./AdminOrders"; // Import the AdminOrders component
import AdminUser from "./AdminUser"; // Import the AdminOrders component

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext); // Destructure logout from AuthContext
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state for Products
  const [selectedOption, setSelectedOption] = useState("Dashboard"); // Set default to 'Dashboard'
  const [srno, setSrno] = useState(1); // Track srno value
  const [totalProducts, setTotalProducts] = useState(0); // Track the total number of products

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle the dropdown for Products
  };

  const handleMenuClick = (option) => {
    setSelectedOption(option);
    setSidebarOpen(false); // Close the sidebar after selecting an option
  };

  const updateTotalProducts = (count) => {
    setTotalProducts(count); // Update totalProducts when called from AdminProductlist
  };

  const handleLogoutClick = () => {
    logout(); // Call logout function from AuthContext
    navigate("/login"); // Redirect to login page after logout
  };

  useEffect(() => {
    // Redirect to login page if the user is not authenticated
    if (!token) {
      navigate("/login"); // Redirect to the login page
    }
  }, [token, navigate]);

  // If the user is not authenticated, render a loading screen while redirecting
  if (!token) {
    return <div>Loading...</div>; // You can show a loading screen or message while redirecting
  }

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-container">
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-logo">Admin Panel</div>
          <ul className="sidebar-menu">
            <li onClick={() => handleMenuClick("Dashboard")}>Dashboard</li>
            <li>
              Products
              <span
                className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
                onClick={toggleDropdown}
              >
                &#9660;
              </span>
              <ul className={`submenu ${isDropdownOpen ? "open" : ""}`}>
                <li onClick={() => handleMenuClick("AddProduct")}>Add Product</li>
                <li onClick={() => handleMenuClick("ListProducts")}>List of Products</li>
              </ul>
            </li>
            <li onClick={() => handleMenuClick("Orders")}>Orders</li>
            {/* <li onClick={() => handleMenuClick("Users")}>Users</li>  */}
            <li onClick={handleLogoutClick}>Logout</li>
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
                <p>{totalProducts}</p> {/* Display total products */}
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>89</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>350</p>
              </div>
            </section>
          )}
          {selectedOption === "AddProduct" && <AdminAddProduct srno={srno} />} {/* Pass srno to AdminAddProduct */}
          {selectedOption === "ListProducts" && (
            <AdminProductlist
              updateTotalProducts={updateTotalProducts}
              srno={srno}
            /> // Pass updateTotalProducts function to AdminProductlist
          )}
          {selectedOption === "Orders" && <AdminUser  />} 
          {/* {selectedOption === "Users" && <AdminUser />} Render OrderItems when 'Users' is selected */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;