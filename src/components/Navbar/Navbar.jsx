"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext"
import { AuthContext } from "../../context/AuthContext"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import profile_icon from "../Assets/profile_icon.png"
import "../Navbar/Navbar.css"

const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isMobileView, setIsMobileView] = useState(false)

  const { cartItems, products, searchTerm, setSearchTerm } = useContext(ShopContext)
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (location.pathname === "/") {
      setMenu("shop")
    } else if (location.pathname === "/mens") {
      setMenu("mens")
    } else if (location.pathname === "/womens") {
      setMenu("womens")
    }
  }, [location])

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleLogoutClick = () => {
    logout()
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false) // Close the dropdown menu
    navigate("/login")
  }

  const calculateTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden"
  }

  const handleMenuClick = (menuOption) => {
    setMenu(menuOption)
    if (isMobileView) {
      setIsMobileMenuOpen(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmedQuery = searchTerm.trim().toLowerCase()

    if (trimmedQuery) {
      const product = products.find((product) => product.name.toLowerCase().includes(trimmedQuery))

      if (product) {
        setIsMobileMenuOpen(false)
        navigate(`category/${trimmedQuery}`)
      } else {
        alert("No product found with this name!")
      }
    }
  }

  // Force re-render when user state changes
  useEffect(() => {
    // This effect will run every time the user state changes
  }, []) // Removed unnecessary dependency: [user]

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo || "/placeholder.svg"} alt="Logo" />
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <p>SILKSEW</p>
        </Link>
      </div>

      <div className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`} role="navigation">
        <ul>
          <li onClick={() => handleMenuClick("Home")}>
            <Link to="/">Home</Link>
            {menu === "Home" && <hr />}
          </li>
          <li onClick={() => handleMenuClick("mens")}>
            <Link to="/mens">Men</Link>
            {menu === "mens" && <hr />}
          </li>
          <li onClick={() => handleMenuClick("womens")}>
            <Link to="/womens">Women</Link>
            {menu === "womens" && <hr />}
          </li>
        </ul>

        {location.pathname === "/" && (
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>
        )}

        <div className="mobile-menu-items">
          <Link to="/cart" className="mobile-cart-icon-wrapper" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={cart_icon || "/placeholder.svg"} alt="Cart" className="mobile-cart-icon" />
            {calculateTotalCartItems() > 0 && <div className="mobile-cart-item-count">{calculateTotalCartItems()}</div>}
          </Link>

          {user ? (
            <div className="mobile-profile-info">
              <img src={profile_icon || "/placeholder.svg"} alt="Profile" className="mobile-profile-icon" />
              <Link
                to="/user-profile-buttons"
                className="mobile-profile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button onClick={handleLogoutClick} className="mobile-logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                navigate("/login")
              }}
              className="mobile-login-btn"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-login-cart">
          <Link to="/cart" className="cart-icon-wrapper">
            <img src={cart_icon || "/placeholder.svg"} alt="Cart" className="cart-icon" />
            {calculateTotalCartItems() > 0 && <div className="cart-item-count">{calculateTotalCartItems()}</div>}
          </Link>

          {user ? (
            <div className="profile-info" onClick={toggleDropdown}>
              <img src={profile_icon || "/placeholder.svg"} alt="Profile" className="profile-icon clickable" />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/user-profile-buttons" style={{ color: "#fff", textDecoration: "none" }}>
                    <div className="dropdown-item">Profile</div>
                  </Link>
                  <div className="dropdown-item" onClick={handleLogoutClick}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="login-btn">
              Login
            </button>
          )}
        </div>
        <div className="hamburger-wrapper">
          <div className={`hamburger-menu ${isMobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

