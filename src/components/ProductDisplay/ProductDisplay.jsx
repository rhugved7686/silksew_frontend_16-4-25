// import React, { useContext,useState } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from "../../context/ShopContext";

// const ProductDisplay = (props) => {
//   const { product } = props;
//   const {addToCart} = useContext(ShopContext)
//   const [selectedSize, setSelectedSize] = useState("");

//   const handleSizeSelection = (size) => {
//     setSelectedSize(size);
//   };

//   // Handle Add to Cart button
//   const handleAddToCart = () => {
//     if (selectedSize) {
//       addToCart(product.id, selectedSize);
//     } else {
//       alert("Please select a size");
//     }
//   };

//   return (
//     <div className="productdisplay">
//       <div className="productdisplay-left">
//         <div className="productdisplay-img-list">
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//         </div>
//         <div className="productdisplay-img">
//           <img className="productdisplay-main-img" src={product.image} alt="" />
//         </div>
//       </div>
//       <div className="productdisplay-right">
//         <h1>{product.name}</h1>
//         <div className="productdisplay-right-star">
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_dull_icon} alt="" />
//           <p>(122)</p>
//         </div>
//         <div className="productdisplay-right-prices">
//           <div className="productdisplay-right-price-old">
//             Rs {product.old_price}
//           </div>
//           <div className="productdisplay-right-price-new">
//             Rs {product.new_price}
//           </div>
//         </div>
//         <div className="productdisplay-right-description">
//             A lightweight, usually knitted, pullover shirt, close fitted and
//             a round neckline and short sleeves, worn as undershirt garment.
//         </div>
//         <div className="productdisplay-right-size">
//             <h1>Select Size</h1>
//             <div className="productdisplay-right-sizes">
//                 <div>S</div>
//                 <div>M</div>
//                 <div>L</div>
//                 <div>XL</div>
//                 <div>XXL</div>
//             </div>
//         </div>
//         <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
//         <p className="productdisplay-right-category"><span>Category: </span>Women, T-Shirt, Crop-top</p>
//         <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>

//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;


import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../context/ShopContext";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product.id, selectedSize);
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">Rs {product.new_price}</div>
        </div>
        <div className="productdisplay-right-size">
          <h2>Select Size</h2>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={selectedSize === size ? "selected" : ""}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDisplay;
