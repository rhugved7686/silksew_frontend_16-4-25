import React, { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext"
import { AuthContext } from "../../context/AuthContext"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import profile_icon from "../Assets/profile_icon.png"

const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { cartItems } = useContext(ShopContext)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)

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

  const handleLogoutClick = () => {
    logout()
    navigate("/login")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`)
    }
  }

  const calculateTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleMenuClick = (menuOption) => {
    setMenu(menuOption)
    if (isMobileView) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo || "/placeholder.svg"} alt="Logo" />
        <p>SILKSEW</p>
      </div>

      <div className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <ul>
          <li onClick={() => handleMenuClick("shop")}>
            <Link to="/">Shop</Link>
            {menu === "shop" && <hr />}
          </li>
          <li onClick={() => handleMenuClick("mens")}>
            <Link to="/mens">Men</Link>
            {menu === "mens" && <hr />}
          </li>
          <li onClick={() => handleMenuClick("womens")}>
            <Link to="/womens">Women</Link>
            {menu === "womens" && <hr />}
          </li>
          <li onClick={() => handleMenuClick("kids")}>
            <Link to="/kids">Kids</Link>
            {menu === "kids" && <hr />}
          </li>
        </ul>

        <div className="nav-search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products"
            />
            <button type="submit">Search</button>
          </form>
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
                  <Link to="/profile" className="dropdown-item">
                    Profile
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

