import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Popular.css';
import axios from 'axios';

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products/list');
        // console.log(response);
        const fetchedProducts = Array.isArray(response.data) ? response.data : response.data.products;
        const womenProducts = fetchedProducts.filter((product) => product.category.includes('women'));
        setProducts(womenProducts);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const shortenName = (name) => (name.length > 25 ? name.substring(0, 25) + '...' : name);

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

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

  return (
    <div className="popular">
      <h1 className="section-title">POPULAR IN WOMEN</h1>
      <div className="gradient-line"></div>
      <div className="popular-items">
        {products.length > 0 ? (
          products.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="interactive-card"
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.transform = `rotateY(${x / 20}deg) rotateX(${y / 20}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotateY(0) rotateX(0)';
              }}
            >
              <div className="card-image-wrapper">
                {/* Fetch the image based on the color and available images */}
                <img
                  src={getImage(item.images, item.availableColors)}
                  alt={item.name}
                  className="product-image"
                />
              </div>
              <div className="card-info">
                <h2 className="card-title">{shortenName(item.name)}</h2>
                <p className="price">
                  <span className="new-price">Rs.{item.price}</span>
                  {item.oldPrice && <span className="old-price">Rs.{item.oldPrice}</span>}
                </p>
                <button onClick={() => handleViewProduct(item)} className="animated-button">
                  View Product
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available.</div>
        )}
      </div>
    </div>
  );
};

export default Popular;
