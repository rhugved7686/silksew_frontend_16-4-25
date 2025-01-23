import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Popular.css';
import axios from 'axios';
import Item from '../Item/Item';

const Popular = () => {
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
        const menProducts = fetchedProducts.filter(product => product.category.includes('women'));

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
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {products.length > 0 ? (
          products.slice(0, 4).map((item) => ( // Limit to first 4 products
            <div key={item._id} className="item-container">
              <center><Item
                id={item._id}
                name={shortenName(item.name)}
                image={item.images[0]}
                new_price={item.price}
                old_price={item.oldPrice}
              /></center>
              <button onClick={() => handleViewProduct(item)} className="add-to-cart-btn">
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

export default Popular;
