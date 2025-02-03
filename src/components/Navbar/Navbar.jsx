import React, { useState, useContext, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext"
import { AuthContext } from "../../context/AuthContext"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import profile_icon from "../Assets/profile_icon.png"
import "./Navbar.css"

const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isMobileView, setIsMobileView] = useState(false)

  // eslint-disable-next-line no-unused-vars
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
    // Update the menu state based on the current location
    if (location.pathname === "/") {
      setMenu("shop")
    } else if (location.pathname === "/mens") {
      setMenu("mens")
    } else if (location.pathname === "/womens") {
      setMenu("womens")
    }
  }, [location])

  const handleLogoutClick = () => {
    logout()
    navigate("/login")
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

  // eslint-disable-next-line no-unused-vars
  const handleSearch = (e) => {
    e.preventDefault()
    const trimmedQuery = searchTerm.trim().toLowerCase()

    if (trimmedQuery) {
      const product = products.find((product) => product.name.toLowerCase().includes(trimmedQuery))

      if (product) {
        navigate(`/product/${product._id}`, { state: { product } })
      } else {
        alert("No product found with this name!")
      }
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo || "/placeholder.svg"} alt="Logo" />
        <Link to="/" style={{textDecoration:"none",color:'white'}}><p>SILKSEW</p></Link>
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
        </ul>

        {/* {location.pathname === "/" && (
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
        )} */}
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
                  <Link to="/user-profile-buttons" style={{color:'#fff',textDecoration:'none'}}>
                  <div className="dropdown-item">
                  Profile
                  </div>
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

