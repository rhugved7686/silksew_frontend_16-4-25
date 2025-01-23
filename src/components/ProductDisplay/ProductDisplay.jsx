import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDisplay.css";
import { ShopContext } from "../../context/ShopContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const colors = require('../ProductDisplay/colorPalette.js');

const ProductDisplay = () => {
  const { state } = useLocation();
  const product = state?.product;

  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(product?.images[0] || "");
  const navigate = useNavigate();
  const colorPalette = {colors};

  useEffect(() => {
    window.scrollTo(0, 0);
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

    toast.success("Product added to cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  return (
    <>
      <div className="productdisplay">
        <ToastContainer />
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index + 1}`}
                onClick={() => setMainImage(img)}
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
          <p className="description">{product.description}</p>
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
                const mappedColor = colorPalette[color.toLowerCase()] || color;
                return (
                  <div
                    key={index}
                    className="color-circle"
                    style={{
                      backgroundColor: mappedColor,
                    }}
                    title={color}
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
        <div className="descriptionbox-description">
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;