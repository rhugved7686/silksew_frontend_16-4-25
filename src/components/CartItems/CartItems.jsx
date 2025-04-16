import { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BASEURL } from "../../config"; // make sure you have this

const CartItems = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, products } = useContext(ShopContext);
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const [localProducts, setLocalProducts] = useState(products);
  const navigate = useNavigate();

  const getImage = (images, color) => {
    if (images && images.length > 0) {
      try {
        const parsedImages = JSON.parse(images[0]);
        if (parsedImages[color] && parsedImages[color].length > 0) {
          return parsedImages[color][0];
        }
        const firstAvailableColor = Object.keys(parsedImages)[0];
        if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
          return parsedImages[firstAvailableColor][0];
        }
      } catch (error) {
        console.error("Error parsing image JSON:", error);
      }
    }
    return "/placeholder.svg";
  };

  useEffect(() => {
    setLocalCartItems(cartItems);
    setLocalProducts(products);
  }, [cartItems, products]);

  useEffect(() => {
    const missing = cartItems
      .map((item) => item.productId)
      .filter((id) => !products.some((p) => p._id === id))
  
    if (missing.length > 0) {
      console.warn("Missing product IDs:", missing)
    }
  }, [cartItems, products])
  

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Color</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {localCartItems.map((cartItem) => {
        const { productId, quantity, size, color } = cartItem;
        const product = localProducts.find((p) => String(p._id) === String(productId));

        if (!product) {
          console.warn(`Product with ID ${productId} not found.`);
          return null;
        }

        const displayColor = color || "Default";

        return (
          <div key={`${productId}-${size}-${color}`} className="cartitem">
            <img
              src={getImage(product.images, color) || "/placeholder.svg"}
              alt={product.name}
              className="product-image"
              style={{ height: "50px" }}
            />
            <p>{product.name}</p>
            <p>Rs {product.price}</p>
            <p>{displayColor}</p>
            <p>{quantity}</p>
            <p>{size}</p>
            <p>Rs {quantity * product.price}</p>
            <button onClick={() => removeFromCart(productId, size, color)}>Remove</button>
          </div>
        );
      })}
      <hr />
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              if (localCartItems.length === 0) {
                toast.error("Your cart is empty!", {
                  position: "top-center",
                  autoClose: 2000,
                });
                return;
              }
              navigate("/checkout");
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
