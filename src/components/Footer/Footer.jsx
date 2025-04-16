import  React from "react"
import { Link } from "react-router-dom"
import "./Footer.css"
import footer_logo from "../Assets/logo_big.png"
import instagram_icon from "../Assets/instagram_icon.png"
import pintester_icon from "../Assets/pintester_icon.png"
import whatsapp_icon from "../Assets/whatsapp_icon.png"
//import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const Footer = () => {
  const mapStyles = {
    height: "100%",
    width: "100%",
  }

  // const defaultCenter = {
  //   lat: 18.561252,
  //   lng: 73.9443581,
  // }

  return (
    <footer className="footer" role="contentinfo">
        <div className="footer-container">
        <div className="footer-section footer-left">
          <Link to="/" className="footer-brand">
            <img src={footer_logo || "/placeholder.svg"} alt="SILKSEW logo" className="footer-logo" />
            <h2 className="footer-title">SILKSEW</h2>
          </Link>
          <nav className="footer-nav" aria-label="Footer Navigation">
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/mens" className="footer-link">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/womens" className="footer-link">
                  Women
                </Link>
              </li>
            </ul>
          </nav>



          {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={defaultCenter}>
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript><br/> */}

          <p className="footer-copyright">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://www.cobaztech.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
              Cobaztech
            </a>
            . All rights reserved.
          </p>
        </div>
        <br/>

        <div className="footer-section footer-center">
          <h3 className="footer-heading">Contact Us</h3>
          <address className="footer-address">
            <div className="footer-info">
              <div className="footer-icon" aria-hidden="true">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <p className="footer-text">Pune</p>
            </div>
            <div className="footer-info">
              <div className="footer-icon" aria-hidden="true">
                <i className="fas fa-phone-alt"></i>
              </div>
              <p className="footer-text">
                <a href="tel:+91457300054" className="footer-link">
                  +91 91457300054
                </a>
              </p>
            </div>
            <div className="footer-info">
              <div className="footer-icon" aria-hidden="true">
                <i className="fas fa-envelope"></i>
              </div>
              <p className="footer-text">
                <a href="mailto:info@cobazTech.com" className="footer-link">
                  info@cobazTech.com
                </a>
              </p>
            </div>
          </address>
        </div>

        <div className="footer-section footer-right">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-about">
            At SILKSEW, we're passionate about creating stunning fashion that empowers you to express your unique style.
            Join us in redefining elegance and comfort.
          </p>
          <div className="footer-socials-wrapper">
            <div className="footer-socials">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="WhatsApp"
              >
                <img src={whatsapp_icon || "/placeholder.svg"} alt="" className="footer-social-icon" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Pinterest"
              >
                <img src={pintester_icon || "/placeholder.svg"} alt="" className="footer-social-icon" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <img src={instagram_icon || "/placeholder.svg"} alt="" className="footer-social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-legal">
          <Link to="/Privacy_Policy" className="footer-link">
            Privacy Policy
          </Link>{" "}
          |
          <Link to="/Terms" className="footer-link">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer

