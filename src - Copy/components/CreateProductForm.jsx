import React, { useState, useRef, useContext } from "react";
import "../pages/CSS/CreateProductForm.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProductForm = ({ onAddProduct }) => {
  const { token } = useContext(AuthContext); // Access the token from AuthContext

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    oldPrice: "",
    availableStock: "",
    images: [],
  });

  const [error, setError] = useState(""); // To store error messages
  const [showModal, setShowModal] = useState(false); // State to show the success modal

  // Create a ref for the file input element
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const imageFiles = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData({ ...formData, images: imageFiles });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      formData.name &&
      formData.category &&
      formData.description &&
      formData.price &&
      formData.availableStock &&
      formData.images.length > 0
    ) {
      try {
        const productData = {
          name: formData.name,
          category: formData.category.split(",").map((cat) => cat.trim()), // Split categories by commas
          description: formData.description,
          price: formData.price,
          oldPrice: formData.oldPrice || null,
          availableStock: formData.availableStock,
          images: formData.images,
        };

        const response = await axios.post(
          "http://localhost:5001/api/products",
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setShowModal(true); // Trigger the success modal on success
          setError("");
          setFormData({
            name: "",
            category: "",
            description: "",
            price: "",
            oldPrice: "",
            availableStock: "",
            images: [],
          });
          fileInputRef.current.value = null;
          if (onAddProduct) {
            onAddProduct(response.data);
          }
        }
      } catch (error) {
        setError("Failed to add product. Please try again.you are not authorized");
        console.error("Error occurred:", error);
      }
    } else {
      setError("Please fill all the fields.");
    }
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <form className="create-product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category (comma separated)"
          value={formData.category}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="oldPrice"
          placeholder="Old Price (Optional)"
          value={formData.oldPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="availableStock"
          placeholder="Available Stock"
          value={formData.availableStock}
          onChange={handleChange}
        />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <button type="submit">Add Product</button>

        {error && <p className="error-message">{error}</p>}
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="success-modal">
          <div className="modal-content">
            <h3>Product Added Successfully!</h3>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateProductForm;
