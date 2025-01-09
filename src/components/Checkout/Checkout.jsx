import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import razorpay from "../Assets/razorpay_logo.png";
import stripe from "../Assets/stripe_logo.png";
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
  });

  // Delivery charge (can also be passed from context if dynamic)
  const delivery_free = 0; // Fixed delivery charge, can be dynamic if needed

  // Calculate the subtotal and total amount (cart total + delivery charge)
  const subtotal = getTotalCartAmount();
  const totalAmount = subtotal + delivery_free;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    try {
      let orderData = {
        address: formData,
        amount: totalAmount, // Pass total amount including delivery fee
      };

      // Process the order here...
      console.log(orderData);

    } catch (error) {
      console.log(error);
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
            <div className="payment-option">
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
            <span> Rs {delivery_free} </span>
          </div>
          <div className="cart-total-item">
            <span>Total: </span>
            <span> Rs {totalAmount} </span>
          </div>
        </div>

        <div className="form-submit">
          <button type="submit" className="submit-button">PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
