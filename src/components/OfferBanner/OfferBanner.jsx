import { ShoppingCart, ThumbsUp, Package, Shield, Headphones } from "lucide-react"
import "../OfferBanner/OfferBanner.css"

export default function SpecialFeatures() {
  const features = [
    {
      icon: <ShoppingCart className="feature-icon" />,
      subtitle: "FREE DELIVERY",
      title: "Free Delivery",
    },
    {
      icon: <ThumbsUp className="feature-icon" />,
      subtitle: "100% CUSTOMER",
      title: "Feedbacks",
    },
    {
      icon: <Package className="feature-icon" />,
      subtitle: "3 DAYS",
      title: "For Free Return",
    },
    {
      icon: <Shield className="feature-icon" />,
      subtitle: "PAYMENT",
      title: "Secure System",
    },
    {
      icon: <Headphones className="feature-icon" />,
      subtitle: "24/7",
      title: "Online Supports",
    },
  ]

  return (
    <div className="features-container">
      <div className="features-header">
        <h2>Special Features</h2>
        <p>Get special services from our shop.</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="icon-wrapper">{feature.icon}</div>
            <div className="feature-content">
              <span className="feature-subtitle">{feature.subtitle}</span>
              <h3 className="feature-title">{feature.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

