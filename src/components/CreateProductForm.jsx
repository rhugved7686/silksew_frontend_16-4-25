// import React, { useState } from "react";
// import "../pages/CSS/CreateProductForm.css";

// const CreateProductForm = ({ onAddProduct }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     price: "",
//     image: null,
//   });

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0]; // Get the first file selected by the user
//     if (file) {
//       setFormData({
//         ...formData,
//         image: file, // Save the image file to state
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.name && formData.category && formData.price && formData.image) {
//       onAddProduct(formData); // Add product using callback
//       setFormData({
//         name: "",
//         category: "",
//         price: "",
//         image: null,
//       });
//     } else {
//       alert("Please fill all the fields.");
//     }
//   };

//   return (
//     <form className="create-product-form" onSubmit={handleSubmit}>
//       <h2>Add New Product</h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Product Name"
//         value={formData.name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="category"
//         placeholder="Category"
//         value={formData.category}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={formData.price}
//         onChange={handleChange}
//       />
//       <input
//   type="file"
//   name="image"
//   accept="image/*" // Ensures only image files are accepted
//   onChange={handleFileChange}
// />
//       <button type="submit">Add Product</button>
//     </form>
//   );
// };

// export default CreateProductForm;

import React, { useState, useRef } from "react";
import "../pages/CSS/CreateProductForm.css";

const CreateProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    size: "",
    image: null,
  });

  // Create a ref for the file input element
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.category &&
      formData.price &&
      formData.image &&
      formData.size
    ) {
      const newProduct = { ...formData };
      onAddProduct(newProduct);
      setFormData({
        name: "",
        category: "",
        price: "",
        size: "",
        image: null,
      });
      // Reset file input field by clearing its value
      fileInputRef.current.value = null; // This line is the key
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
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
        placeholder="Category"
        value={formData.category}
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
        type="text"
        name="size"
        placeholder="Size"
        value={formData.size}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef} // Attach the ref to the file input
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default CreateProductForm;
