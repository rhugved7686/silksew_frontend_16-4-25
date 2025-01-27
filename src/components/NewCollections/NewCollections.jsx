import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false); // State to toggle view of all products

  // Shorten product names if they exceed 25 characters
  const shortenName = (name) => (name.length > 25 ? name.substring(0, 25) + '...' : name);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products/list'); // Replace with your API endpoint
        
        const fetchedProducts = Array.isArray(response.data) ? response.data : response.data.products;
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getImage = (images, availableColors) => {
    if (images && images.length > 0 && availableColors && availableColors.length > 0) {
      try {
        // Iterate over the available colors to find the first color with images
        for (const color of availableColors) {
          // Parse the image data for the current color
          const parsedImages = JSON.parse(images[0]);
          if (parsedImages[color.name] && parsedImages[color.name].length > 0) {
            // Return the first image of the available color
            return parsedImages[color.name][0];
          }
        }

        // If no specific images found for any color, return the first available image
        const parsedImages = JSON.parse(images[0]);
        const firstAvailableColor = Object.keys(parsedImages)[0];
        if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
          return parsedImages[firstAvailableColor][0];
        }
      } catch (error) {
        console.error('Error parsing image JSON:', error);
      }
    }
    return 'https://via.placeholder.com/150'; // Default placeholder image if no valid image found
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Display either the first 10 or all products based on showAll state
  const displayedProducts = showAll ? products : products.slice(0, 10);

  return (
    <div className="new-collections-container">
      <h1 className="title">New Collections</h1>
      <div className="gradient-line"></div>
      <div className="product-list">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item, i) => (
            <div className="product-card" key={i}>
              {/* Wrap the image with a Link to make it clickable */}
              <Link to={`/product/${item._id}`} state={{ product: item }}>
                <img
                  src={getImage(item.images, item.availableColors)} // Get image using the adjusted logic
                  alt={item.name}
                  className="product-image"
                />
              </Link><br></br>
              <h4>{shortenName(item.name)}</h4>
              <div className="prices">
                <span className="new-price">Rs.{item.price.toFixed(2)}</span>
                {item.oldPrice && (
                  <span className="old-price">Rs.{item.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <Link to={`/product/${item._id}`} state={{ product: item }}>
                <button className="view-product-btn">View Product</button>
              </Link>
            </div>
          ))
        ) : (
          <div>No products available.</div>
        )}
      </div>

      <div className="toggle-view-btn">
        {!showAll && products.length > 10 && (
          <button onClick={() => setShowAll(true)} className="view-more">View More &#11015;</button>
        )}
        {showAll && (
          <button onClick={() => setShowAll(false)} className="view-more">Show Less &#11014;</button>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
