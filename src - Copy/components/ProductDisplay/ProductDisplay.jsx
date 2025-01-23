import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import "./ProductDisplay.css";
import { ShopContext } from "../../context/ShopContext";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
const colors = require('../ProductDisplay/colorPalette.js');

const ProductDisplay = () => {
  const { state } = useLocation(); // Access passed state
  const product = state?.product; // Safely access product

  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(product?.images[0] || ""); // Fallback to an empty string if product is undefined
  const navigate = useNavigate(); // Initialize useNavigate
  const colorPalette = {colors};

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
  }, []);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    addToCart(product._id, selectedSize);

    // Show success toast notification
    toast.success("Product added to cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Navigate to cart page after 1 second
    setTimeout(() => {
      navigate("/cart"); // Navigate to the cart page
    }, 1000);
  };

  return (
    <>
      <div className="productdisplay">
        <ToastContainer />{" "}
        {/* Add ToastContainer for displaying toast messages */}
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index + 1}`}
                onClick={() => setMainImage(img)} // Update main image on click
              />
            ))}
          </div>
          <div className="productdisplay-img">
            <img
              className="productdisplay-main-img"
              src={mainImage}
              alt={product.name}
            />
          </div>
        </div>
        <div className="productdisplay-right">
          <h2>{product.name}</h2>
          <br />
          <p style={{ textAlign: "justify", fontFamily: "Georgia, serif" }}>
            {product.description}
          </p>
          <div className="productdisplay-right-prices">
            <p>Price :</p>
            <div className="productdisplay-right-price-new">
              Rs {product.price}
            </div>
            <div className="productdisplay-right-price-old">
              Rs {product.oldPrice}
            </div>
          </div>
          <div className="productdisplay-right-size">
            <h2>Available Colors</h2>
            <div className="productdisplay-right-colors">
              {product.availableColors.map((color, index) => {
                const mappedColor = colorPalette[color.toLowerCase()] || color; // Use mapped color or raw value
                return (
                  <div
                    key={index}
                    className="color-circle"
                    style={{
                      backgroundColor: mappedColor, // Use the mapped or raw color
                    }}
                    title={color} // Show original color name as tooltip
                  ></div>
                );
              })}
            </div>
          </div><br/>
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
      <div className="descriptionbox">
        <div className="descriptionbox-navigator">
          <div className="descriptionbox-nav-box">Description</div>
          <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description" style={{textAlign:"justify"}}>
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
