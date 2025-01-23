import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/CSS/AdminAddProduct.css';

function AdminAddProduct() {
  const { token } = useContext(AuthContext); // Access the token from AuthContext

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    oldPrice: '',
    availableStock: '',
    images: [],
    availableSizes: [], // New field for available sizes
    availableColors: [], // New field for available colors
  });

  const [error, setError] = useState(''); // To store error messages

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFormData({ ...formData, images: files }); // Store file references in images array
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'availableSizes' || name === 'availableColors') {
      // Handle sizes and colors as arrays
      setFormData({
        ...formData,
        [name]: value.split(',').map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields are filled
    if (
      formData.name &&
      formData.category &&
      formData.description &&
      formData.price &&
      formData.availableStock &&
      formData.images.length > 0 &&
      formData.availableSizes.length > 0 &&
      formData.availableColors.length > 0
    ) {
      try {
        // Upload images to Cloudinary and get URLs
        const uploadedImages = await Promise.all(
          Array.from(formData.images).map(async (file) => {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'Silksew');
            data.append('cloud_name', 'dvpk4sbzi');

            const res = await fetch('https://api.cloudinary.com/v1_1/dvpk4sbzi/image/upload', {
              method: 'POST',
              body: data,
            });

            const uploadedImage = await res.json();
            return uploadedImage.secure_url; // Return the URL of the uploaded image
          })
        );

        const productData = {
          name: formData.name,
          category: formData.category.split(',').map((cat) => cat.trim()),
          description: formData.description,
          price: formData.price,
          oldPrice: formData.oldPrice || null,
          availableStock: formData.availableStock,
          images: uploadedImages, // Pass the image URLs here
          availableSizes: formData.availableSizes, // Include available sizes
          availableColors: formData.availableColors, // Include available colors
        };

        // Send product data to the backend
        const response = await axios.post(
          'http://localhost:5001/api/products',
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Backend Response:', response); // Log the response from the backend

        if (response) {
          toast.success('Product added successfully!');
          setTimeout(() => {
            setError('');
            setFormData({
              name: '',
              category: '',
              description: '',
              price: '',
              oldPrice: '',
              availableStock: '',
              images: [],
              availableSizes: [],
              availableColors: [],
            });
            fileInputRef.current.value = null;
          }, 1500);
        }
      } catch (error) {
        setError('Failed to add product. Please try again. You are not authorized');
        console.error('Error occurred:', error);
      }
    } else {
      setError('Please fill all the fields.');
    }
  };

  return (
    <>
    <h2>Add Product</h2>
    <section className="product-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCategory">Category</label>
          <input
            type="text"
            id="productCategory"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (comma separated)"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Description</label>
          <textarea
            id="productDescription"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            type="number"
            id="productPrice"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productOldPrice">Old Price (Optional)</label>
          <input
            type="number"
            id="productOldPrice"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productStock">Available Stock</label>
          <input
            type="number"
            id="productStock"
            name="availableStock"
            value={formData.availableStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImages">Product Images</label>
          <input
            type="file"
            id="productImages"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableSizes">Available Sizes (comma separated)</label>
          <input
            type="text"
            id="availableSizes"
            name="availableSizes"
            value={formData.availableSizes.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableColors">Available Colors (comma separated)</label>
          <input
            type="text"
            id="availableColors"
            name="availableColors"
            value={formData.availableColors.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn" style={{ height: '40px' }}>
          Add Product
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <ToastContainer />
    </section>
    </>
  );
}

export default AdminAddProduct;
