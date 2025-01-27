import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import razorpay from "../Assets/razorpay_logo.png";
import stripe from "../Assets/stripe_logo.png";
import "./Checkout.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASEURL } from "../../config";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Checkout = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [method, setMethod] = useState("Cash on Delivery");
  // eslint-disable-next-line no-unused-vars
  const {
    cartItems,
    delivery_fee,
    setCartItems,
    getTotalCartAmount,
    products,
    token,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    landMark:"",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
  });

  // Delivery charge (can also be passed from context if dynamic)
  //const delivery_free = 0; // Fixed delivery charge, can be dynamic if needed

  // Calculate the subtotal and total amount (cart total + delivery charge)
  const subtotal = getTotalCartAmount();
  const totalAmount = subtotal + delivery_fee;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Get token from storage
      console.log(token);
      if (!token) {
        toast.error("You are not authorized. Please log in.");
        // Optional: Redirect to login
        window.location.href = "/login";
        return;
      }

      // Ensure cartItems exists and is an array
      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        console.error("Cart is empty or invalid.");
        toast.error("Your cart is empty!");
        return;
      }

      // Prepare order items
      let orderItems = cartItems
        .map((cartItem) => {
          // Find the corresponding product in the products array
          const product = products.find((p) => p._id === cartItem.productId);

          if (!product) {
            console.warn(
              `Product not found for productId: ${cartItem.productId}`
            );
            return null; // Skip items without matching products
          }

          // Create order item with additional details
          return {
            productId: cartItem.productId, // Correct syntax
            size: cartItem.size,
            quantity: cartItem.quantity,
          };
        })
        .filter((item) => item !== null); // Remove null items

      // Check if orderItems is empty
      if (orderItems.length === 0) {
        toast.error("No valid products found in cart.");
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        totalAmount: getTotalCartAmount() + delivery_fee,
        paymentMethod: method,
      };
      console.log("order data", orderData);

      switch (method) {
        // api call for cod
        case "Cash on Delivery":
          const response = await axios.post(
            BASEURL + "/api/orders/place",
            orderData,
            { headers: { Authorization: ` Bearer ${token}` } }
          );
          console.log(response.data.success);

          if (response.data.success) {
            setCartItems([]);
            navigate("/orderItems");
            console.log("orderData:", orderData.items);
          } else {
            toast.error(response.data.message);
          }

          break;

        default:
          break;
      }
      console.log(orderData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmitHandler}>
      <div className="form-left">
        {/* Payment Options */}
        <fieldset className="payment-method">
          <legend>Payment Options</legend>
          <div className="payment-option">
            <div className="payment-option selected">
              <img src={stripe} alt="Stripe" className="payment-logo" />
            </div>
            <div className="payment-option selected">
              <img src={razorpay} alt="Razorpay" className="payment-logo" />
            </div>
            <div
              onClick={() => setMethod("Cash on Delivery")}
              className="payment-option"
            >
              <span className="payment-text">CASH ON DELIVERY</span>
            </div>
          </div>
        </fieldset>

        {/* Shipping Address */}
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
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            className="form-input"
            placeholder="Last Name"
            onChange={onChangeHandler}
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="form-input"
          placeholder="Email Address"
          onChange={onChangeHandler}
        />
        <input
          type="phone"
          name="phone"
          value={formData.phone}
          className="form-input"
          placeholder="Phone Number"
          onChange={onChangeHandler}
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          className="form-input"
          placeholder="Street Address"
          onChange={onChangeHandler}
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
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            className="form-input"
            placeholder="State"
            onChange={onChangeHandler}
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
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            className="form-input"
            placeholder="Country"
            onChange={onChangeHandler}
          />
        </div>
      </div>

      {/* Cart Totals */}
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

        <div className="form-submit">
          <button type="submit" className="submit-button">
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
