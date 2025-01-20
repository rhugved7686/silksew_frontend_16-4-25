import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, all_product, products } = useContext(ShopContext);
  const navigate = useNavigate();
  
  console.log(products)
  console.log(cartItems)
  console.log(typeof products)
  console.log(typeof cartItems)

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {
      // Object.entries(cartItems).map(([productId, { quantity, size }]) => {
      //   const product = Object.entries(products).map((p) => p._id === (productId)); 
      
      cartItems.map((cartItem) => {
        const { productId, quantity, size } = cartItem;
      
        // Find the corresponding product in the products array
        const product = products.find((p) => p._id === productId);

        console.log("Product ID from cartItems:", typeof productId, productId);
        console.log("Product ID from cartItems:", typeof product, product);
        if (!product) {
          console.warn(`Product with ID ${productId} not found.`);
          return null;
        }

        return (
          <div key={productId} className="cartitem">
            <img src={product.images[0]} alt={product.name} />
            <p>{product.name}</p>
            <p>Rs {product.price}</p>
            <p>{quantity}</p>
            <p>{size}</p>
            <p>Rs {quantity * product.price}</p>
            <button onClick={() => removeFromCart(productId)}>Remove</button>
          </div>
        );
      })}
      <hr />
      {/* <div className="cart-total">
        <h2>Total Amount: Rs {getTotalCartAmount()}</h2>
        <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
      </div> */}
      <div className="cartitems-down">
         <div className="cartitems-total">
           <h1>cart Totals</h1>
           <div>
             <div className="cartitems-total-item">
               <p>Subtotal</p>
               <p>${getTotalCartAmount()}</p>
             </div>
             <hr />
             <div className="cartitems-total-item">
               <p>Shipping Fee</p>
               <p>Free</p>
             </div>
             <hr />
             <div className="cartitems-total-item">
               <h3>Total</h3>
               <h3>${getTotalCartAmount()}</h3>
             </div>
           </div>
           <button onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
         </div>
         <div className="cartitems-promocode">
           <p>If you have a promo code, Enter it here</p>
           <div className="cartitems-promobox">
             <input type="text" placeholder="promo code" />
             <button>Submit</button>
           </div>
         </div>
       </div>
    </div>
  );
};

export default CartItems;
