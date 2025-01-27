import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDisplay.css";
import { ShopContext } from "../../context/ShopContext";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDisplay = () => {
  const { state } = useLocation();
  const product = state?.product;

  const { addToCart } = useContext(ShopContext);
  const { token } = useContext(AuthContext);

  const images = product?.images?.[0] && Array.isArray(product.images) ? JSON.parse(product.images[0]) : {};
  const availableSizes =
    product?.availableSizes?.[0] && Array.isArray(product.availableSizes) ? JSON.parse(product.availableSizes[0]) : [];
  const availableColors =
    product?.availableColors?.[0] && Array.isArray(product.availableColors)
      ? JSON.parse(product.availableColors[0])
      : [];

  const defaultColor = availableColors?.[0]?.name || "Black";

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [mainImage, setMainImage] = useState(images[defaultColor]?.[0] || "");
  const [activeTab, setActiveTab] = useState("description");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!token) {
      toast.warn("Log in to add to cart.", { position: "top-right", autoClose: 3000 });
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      toast.error("Select a size.", { position: "top-right", autoClose: 3000 });
      return;
    }

    addToCart(product._id, selectedSize);
    toast.success("Added to cart!", { position: "top-right", autoClose: 3000 });
    setTimeout(() => navigate("/cart"), 1000);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setMainImage(images[color]?.[0] || "");
  };

  return (
    <>
      <div className="productdisplay">
        <ToastContainer />
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {images[selectedColor]?.map((img, i) => (
              <img
                key={i}
                src={img || "/placeholder.svg"}
                alt={`Product ${i + 1}`}
                onClick={() => setMainImage(img)}
                className={mainImage === img ? "active" : ""}
              />
            ))}
          </div>
          <div className="productdisplay-img">
            <img className="productdisplay-main-img" src={mainImage || "/placeholder.svg"} alt={product.name} />
          </div>
        </div>
        <div className="productdisplay-right" style={{textAlign:"justify"}}>
          <h2>{product.name}</h2>
          <p className="description" style={{textAlign:"justify"}}>{product.description}</p>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-new">Rs {product.price}</div>
            <div className="productdisplay-right-price-old">Rs {product.oldPrice}</div>
          </div>
          <div className="productdisplay-right-colors">
            <h3>Available Colors</h3>
            <div className="color-options">
              {availableColors?.map((colorObj, i) => (
                <div
                  key={i}
                  className={`color-circle ${selectedColor === colorObj.name ? "selected" : ""}`}
                  style={{ backgroundColor: colorObj.name }}
                  onClick={() => handleColorChange(colorObj.name)}
                  title={colorObj.name}
                />
              ))}
            </div>
          </div>
          <div className="productdisplay-right-sizes">
            <h3>Select Size</h3>
            <div className="size-options">
              {availableSizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-box ${selectedSize === size ? "selected" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="descriptionbox">
        <div className="descriptionbox-navigator">
          <button
            className={`descriptionbox-nav-box ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`descriptionbox-nav-box ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (122)
          </button>
        </div>
        <div className="descriptionbox-description"style={{textAlign:"justify"}}>
          {activeTab === "description" ? (
            <p>{product.description}</p>
          ) : (
            <p>Customer reviews will be displayed here.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
