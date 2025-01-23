import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Item from '../Item/Item';

const NewCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false); // State to toggle view of all products

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Display either the first 10 or all products based on showAll state
  const displayedProducts = showAll ? products : products.slice(0, 10);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item, i) => (
            <div className="collection-card" key={i} style={{ textAlign: "center" }}>
              <Item
                id={item._id}
                name={item.name}
                image={item.images[0]}
                new_price={item.price}
                // old_price={item.oldPrice}
              />
              <Link to={`/product/${item._id}`} state={{ product: item }}>
                <center><button className="add-to-cart-btn">View Product</button></center>
              </Link>
            </div>
          ))
        ) : (
          <div>No products available.</div>
        )}
      </div>

      <div className="view-more-btn">
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
