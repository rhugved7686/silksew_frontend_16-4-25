import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/CSS/card.css";
import axios from 'axios';
import Item from '../components/Item/Item';

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products and filter only those in the 'Men' category
        const response = await axios.get('http://localhost:5001/api/products');
        const fetchedProducts = Array.isArray(response.data) ? response.data : response.data.products;
        
        // Filter products that belong to the 'Men' category
        const menProducts = fetchedProducts.filter(product => product.category.includes('men'));

        setProducts(menProducts);
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="popular">
      {/* <h1>POPULAR IN WOMEN</h1> */}
      <hr />
      <div className="popular-item">
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item._id} className="item-container">
              {/* {item.discount && (
                <div className="badge">{item.discount}% OFF</div>
              )} */}
              <img src={item.images[0]} alt={item.name} />
              <h4>{shortenName(item.name)}</h4>
              <div className="prices">
                <span className="new-price">Rs.{item.price.toFixed(2)}</span>
                {item.oldPrice && (
                  <span className="old-price">Rs.{item.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <button
                onClick={() => handleViewProduct(item)}
                className="add-to-cart-btn"
              >
                View Product
              </button>
            </div>
          ))
        ) : (
          <div>No products available.</div>
        )}
      </div>
    </div>
  );
};

export default Mens;
