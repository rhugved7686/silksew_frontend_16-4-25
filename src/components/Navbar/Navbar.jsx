"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext"
import { AuthContext } from "../../context/AuthContext"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { User, Menu } from "lucide-react"
import "../Navbar/Navbar.css"

const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const { cartItems, products, searchTerm, setSearchTerm } = useContext(ShopContext)
  const location = useLocation()

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
    const resetBodyOverflow = () => {
      document.body.style.overflow = "auto"
      setIsMobileMenuOpen(false)
    }

    return () => {
      resetBodyOverflow()
    }
  }, [])

  const calculateTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden"
  }

  const handleMenuClick = (menuOption) => {
    setMenu(menuOption)
    setIsMobileMenuOpen(false)
    document.body.style.overflow = "auto"
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
      </div>

      <div className="nav-right">
        <div className="nav-login-cart">
          <Link to="/cart" className="cart-icon-wrapper">
            <img src={cart_icon || "/placeholder.svg"} alt="Cart" className="cart-icon" />
            {calculateTotalCartItems() > 0 && <div className="cart-item-count">{calculateTotalCartItems()}</div>}
          </Link>

          {user ? (
            <Link to="/user-profile-buttons" className="profile-info">
              <User className="profile-icon clickable" style={{height:'30px'}}/>
            </Link>
          ) : (
            <button onClick={() => navigate("/login")} className="login-btn">
              Login
            </button>
          )}
        </div>
        <div className="hamburger-wrapper">
          <div className="mobile-icons">
            <Link to="/cart" className="mobile-cart-icon-wrapper">
              <img src={cart_icon || "/placeholder.svg"} alt="Cart" className="mobile-cart-icon" />
              {calculateTotalCartItems() > 0 && (
                <div className="mobile-cart-item-count">{calculateTotalCartItems()}</div>
              )}
            </Link>
            {user && (
              <Link to="/user-profile-buttons" className="mobile-profile-icon-wrapper">
                <User className="mobile-profile-icon" style={{height:'30px'}}/>
              </Link>
            )}
          </div>
          <button className={`hamburger-menu ${isMobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
            <Menu className="hamburger-icon" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

