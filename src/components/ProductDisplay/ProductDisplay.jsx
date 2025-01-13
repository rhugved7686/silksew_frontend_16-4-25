import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDisplay.css';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = () => {
  const { state } = useLocation(); // Access passed state
  const product = state?.product; // Safely access product

  // Hooks must be called unconditionally
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState(product?.images[0] || ''); // Fallback to an empty string if product is undefined

  // Early return for missing product
  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart(product.id, selectedSize);
    alert('Product added to cart!');
  };

  return (
    <div className="productdisplay">
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
          <img className="productdisplay-main-img" src={mainImage} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h2>{product.name}</h2>
        <h4>Category : {product.category}</h4>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">Rs {product.price}</div>
          <div className="productdisplay-right-price-old">Rs {product.oldPrice}</div>
        </div>
        <div className="productdisplay-right-size">
          <h2>Select Size</h2>
          <div className="productdisplay-right-sizes">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={selectedSize === size ? 'selected' : ''}
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
