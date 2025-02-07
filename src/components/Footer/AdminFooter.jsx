import { Link } from "react-router-dom"
import "./Footer.css"

const AdminFooter = () => {
  return (
    <><div className="footer-bottom">
        <p className="footer-legal">
          <Link to="/" className="footer-link">
            Privacy Policy
          </Link>{" "}
          |
          <Link to="/" className="footer-link">
            Terms of Service
          </Link>
        </p>
      </div>
    
    </>
      
  )
}

export default AdminFooter

