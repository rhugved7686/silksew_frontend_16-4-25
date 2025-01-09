// // import React, { useContext } from "react";
// // import "./CartItems.css";
// // import { ShopContext } from "../../context/ShopContext";
// // import remove_icon from "../Assets/cart_cross_icon.png";
// // import { useNavigate } from "react-router-dom"; // Import useNavigate

// // const CartItems = () => {
// //   const { getTotalCartAmount, all_product, cartItems, removeFromCart, navigate } =
// //     useContext(ShopContext);
// //     const navigate = useNavigate(); // Use the hook to get the navigate function

// //   return (
// //     <div className="cartitems">
// //       <div className="cartitems-format-main">
// //         <p>Products</p>
// //         <p>Title</p>
// //         <p>Price</p>
// //         <p>Quantity</p>
// //         <p>Total</p>
// //         <p>Remove</p>
// //       </div>
// //       <hr />
// //       {all_product.map((e) => {
// //         if (cartItems[e.id] > 0) {
// //           return (
// //             <div>
// //               <div className="cartitems-format cartitems-format-main">
// //                 <img src={e.image} alt="" className="carticon-product-icon" />
// //                 <p>{e.name}</p>
// //                 <p>${e.new_price}</p>
// //                 <button className="cartitems-quantity">
// //                   {cartItems[e.id]}
// //                 </button>
// //                 <p>${e.new_price * cartItems[e.id]}</p>
// //                 <img
// //                   className="cartitems-remove-icon"
// //                   src={remove_icon}
// //                   onClick={() => {
// //                     removeFromCart(e.id);
// //                   }}
// //                   alt=""
// //                 />
// //               </div>
// //               <hr />
// //             </div>
// //           );
// //         }
// //         return null;
// //       })}
// //       <div className="cartitems-down">
// //         <div className="cartitems-total">
// //           <h1>cart Totals</h1>
// //           <div>
// //             <div className="cartitems-total-item">
// //               <p>Subtotal</p>
// //               <p>${getTotalCartAmount()}</p>
// //             </div>
// //             <hr />
// //             <div className="cartitems-total-item">
// //               <p>Shipping Fee</p>
// //               <p>Free</p>
// //             </div>
// //             <hr />
// //             <div className="cartitems-total-item">
// //               <h3>Total</h3>
// //               <h3>${getTotalCartAmount()}</h3>
// //             </div>
// //           </div>
// //           <button onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
// //         </div>
// //         <div className="cartitems-promocode">
// //           <p>If you have a promo code, Enter it here</p>
// //           <div className="cartitems-promobox">
// //             <input type="text" placeholder="promo code" />
// //             <button>Submit</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartItems;


// import React, { useContext } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../context/ShopContext";
// import remove_icon from "../Assets/cart_cross_icon.png";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const CartItems = () => {
//   const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
//     useContext(ShopContext);
//   const navigate = useNavigate(); // Get the navigate function

//   return (
//     <div className="cartitems">
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {all_product.map((e) => {
//         if (cartItems[e.id] > 0) {
//           return (
//             <div key={e.id}>
//               <div className="cartitems-format cartitems-format-main">
//                 <img src={e.image} alt="" className="carticon-product-icon" />
//                 <p>{e.name}</p>
//                 <p>Rs {e.new_price}</p>
//                 <button className="cartitems-quantity">
//                   {cartItems[e.id]}
//                 </button>
//                 <p>Rs {e.new_price * cartItems[e.id]}</p>
//                 <img
//                   className="cartitems-remove-icon"
//                   src={remove_icon}
//                   onClick={() => {
//                     removeFromCart(e.id);
//                   }}
//                   alt="remove"
//                 />
//               </div>
//               <hr />
//             </div>
//           );
//         }
//         return null;
//       })}
//       <div className="cartitems-down">
//         <div className="cartitems-total">
//           <h1>Cart Totals</h1>
//           <div>
//             <div className="cartitems-total-item">
//               <p>Subtotal</p>
//               <p>Rs {getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <p>Shipping Fee</p>
//               <p>Free</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <h3>Total</h3>
//               <h3>Rs {getTotalCartAmount()}</h3>
//             </div>
//           </div>
//           <button onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cartitems-promocode">
//           <p>If you have a promo code, Enter it here</p>
//           <div className="cartitems-promobox">
//             <input type="text" placeholder="promo code" />
//             <button>Submit</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItems;

// import React, { useContext } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../context/ShopContext";
// import remove_icon from "../Assets/cart_cross_icon.png";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const CartItems = () => {
//   const { getTotalCartAmount, all_product, cartItems, removeFromCart, navigate } =
//     useContext(ShopContext);
//     const navigate = useNavigate(); // Use the hook to get the navigate function

//   return (
//     <div className="cartitems">
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {all_product.map((e) => {
//         if (cartItems[e.id] > 0) {
//           return (
//             <div>
//               <div className="cartitems-format cartitems-format-main">
//                 <img src={e.image} alt="" className="carticon-product-icon" />
//                 <p>{e.name}</p>
//                 <p>${e.new_price}</p>
//                 <button className="cartitems-quantity">
//                   {cartItems[e.id]}
//                 </button>
//                 <p>${e.new_price * cartItems[e.id]}</p>
//                 <img
//                   className="cartitems-remove-icon"
//                   src={remove_icon}
//                   onClick={() => {
//                     removeFromCart(e.id);
//                   }}
//                   alt=""
//                 />
//               </div>
//               <hr />
//             </div>
//           );
//         }
//         return null;
//       })}
//       <div className="cartitems-down">
//         <div className="cartitems-total">
//           <h1>cart Totals</h1>
//           <div>
//             <div className="cartitems-total-item">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <p>Shipping Fee</p>
//               <p>Free</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <h3>Total</h3>
//               <h3>${getTotalCartAmount()}</h3>
//             </div>
//           </div>
//           <button onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cartitems-promocode">
//           <p>If you have a promo code, Enter it here</p>
//           <div className="cartitems-promobox">
//             <input type="text" placeholder="promo code" />
//             <button>Submit</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItems;


import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, all_product } = useContext(ShopContext);
  const navigate = useNavigate();

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
      {Object.entries(cartItems).map(([id, { quantity, size }]) => {
        const product = all_product.find((p) => p.id === Number(id));
        if (!product) return null;

        return (
          <div key={id} className="cartitem">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>Rs {product.new_price}</p>
            <p>{quantity}</p>
            <p>{size}</p>
            <p>Rs {quantity * product.new_price}</p>
            <button onClick={() => removeFromCart(id)}>Remove</button>
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
