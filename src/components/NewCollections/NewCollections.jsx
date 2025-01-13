import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Item from '../Item/Item';

const NewCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products'); // Replace with your API endpoint
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {products.length > 0 ? (
          products.map((item, i) => (
            <div className="collection-card" key={i}>
              <Item
                id={item._id}  // Ensure you're using the correct field name for the product ID
                name={item.name}
                image={item.images[0]}
                new_price={item.new_price}
                old_price={item.old_price}
              />
              <Link to={`/product/${item._id}`} state={{ product: item }}>
                <button className="add-to-cart-btn">View Product</button>
              </Link>
            </div>
          ))
        ) : (
          <div>No products available.</div>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
