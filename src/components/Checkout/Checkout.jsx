"use client"

// eslint-disable-next-line no-unused-vars
import { useContext, useState } from "react"
import { ShopContext } from "../../context/ShopContext"
import razorpay from "../Assets/razorpay_logo.png"
import CashonDelivery from "../Assets/CashonDelivery.jpg"
import stripe from "../Assets/stripe_logo.png"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { BASEURL } from "../../config"
import { useNavigate } from "react-router-dom"
import "./Checkout.css"

const OrderSuccessPopup = () => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been placed and will be processed soon.</p>
      </div>
    </div>
  )
}

const Checkout = () => {
  const navigate = useNavigate()
  const [method, setMethod] = useState("Cash on Delivery")
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Added loading state
  const { cartItems, delivery_fee, setCartItems, getTotalCartAmount, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    landMark: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
    email: "",
  })

  const subtotal = getTotalCartAmount()
  const totalAmount = subtotal + delivery_fee

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true) // Set loading state to true

    // Show the success popup immediately
    setShowSuccessPopup(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("You are not authorized. Please log in.")
        navigate("/login")
        return
      }

      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        console.error("Cart is empty or invalid.")
        toast.error("Your cart is empty!")
        return
      }

      const orderItems = cartItems
        .map((cartItem) => {
          const product = products.find((p) => p._id === cartItem.productId)
          if (!product) {
            console.warn(`Product not found for productId: ${cartItem.productId}`)
            return null
          }
          return {
            productId: cartItem.productId,
            size: cartItem.size,
            productName: product.name, // Matches backend expected key
            quantity: cartItem.quantity,
            price: product.price,
          }
        })
        .filter((item) => item !== null)

      if (orderItems.length === 0) {
        toast.error("No valid products found in cart.")
        return
      }

      const totalAmount = getTotalCartAmount() + delivery_fee

      const orderData = {
        address: formData,
        items: orderItems,
        totalAmount,
        paymentMethod: method,
      }

      // Send order request
      const response = await axios.post(`${BASEURL}/api/orders/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data.success) {
        // Clear cart after successful order
        setCartItems([])

        // Navigate to orders page after a short delay
        setTimeout(() => {
          setShowSuccessPopup(false)
          setIsLoading(false) // Set loading state to false
          navigate("/")
        }, 2000)
      } else {
        setShowSuccessPopup(false)
        setIsLoading(false) // Set loading state to false
        toast.error(response.data.message || "Failed to place order.")
      }
    } catch (error) {
      console.error(error)
      setShowSuccessPopup(false)
      setIsLoading(false) // Set loading state to false
      toast.error(error.response?.data?.message || "An error occurred while placing your order.")
    }
  }

  return (
    <form className="form-container" onSubmit={onSubmitHandler}>
      <div className="form-left">
        <fieldset className="payment-method">
          <legend>Payment Options</legend>
          <div className="payment-options">
            <div
              className={`payment-option ${method === "Stripe" ? "selected" : ""}`}
              onClick={() => setMethod("Stripe")}
            >
              <img src={stripe || "/placeholder.svg"} alt="Stripe" className="payment-logo" />
            </div>
            <div
              className={`payment-option ${method === "Razorpay" ? "selected" : ""}`}
              onClick={() => setMethod("Razorpay")}
            >
              <img src={razorpay || "/placeholder.svg"} alt="Razorpay" className="payment-logo" />
            </div>
            <div
              className={`payment-option ${method === "CashonDelivery" ? "selected" : ""}`}
              onClick={() => setMethod("Cash on Delivery")}
            >
              <img src={CashonDelivery || "/placeholder.svg"} alt="CashonDelivery" className="payment-logo" />
              {/* <span className="payment-text">
                CASH ON DELIVERY
              </span> */}
            </div>
          </div>
        </fieldset>

        <div className="form-title">
          <h2>Shipping Address</h2>
        </div>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            className="form-input"
            placeholder="First Name"
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            className="form-input"
            placeholder="Last Name"
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="form-input"
          placeholder="Email Address"
          onChange={onChangeHandler}
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          className="form-input"
          placeholder="Phone Number"
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          className="form-input"
          placeholder="Street Address"
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          name="landMark"
          value={formData.landMark}
          className="form-input"
          placeholder="Landmark"
          onChange={onChangeHandler}
        />
        <div className="form-row">
          <input
            type="text"
            name="city"
            value={formData.city}
            className="form-input"
            placeholder="City"
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            className="form-input"
            placeholder="State"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            className="form-input"
            placeholder="Zipcode"
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            className="form-input"
            placeholder="Country"
            onChange={onChangeHandler}
            required
          />
        </div>
      </div>

      <div className="form-right">
        <div className="cart-total">
          <h3>Cart Totals</h3>
          <div className="cart-total-item">
            <span>Subtotal: </span>
            <span> Rs {subtotal} </span>
          </div>
          <div className="cart-total-item">
            <span>Shipping Fee: </span>
            <span> Rs {delivery_fee} </span>
          </div>
          <div className="cart-total-item">
            <span>Total: </span>
            <span> Rs {totalAmount} </span>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Processing..." : "PLACE ORDER"}
        </button>
      </div>

      {showSuccessPopup && <OrderSuccessPopup />}
    </form>
  )
}

export default Checkout

