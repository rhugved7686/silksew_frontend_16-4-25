import React, { useState, useEffect, useContext, useCallback } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "font-awesome/css/font-awesome.min.css"
import "../pages/CSS/AdminProductlist.css"
import "../pages/CSS/CreateProductForm.css"

function AdminProductlist() {
  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingProduct, setEditingProduct] = useState(null)
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(0)

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = Array.isArray(response.data) ? response.data : response.data.products || []
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to fetch products.")
    }
  }, [token])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts, updateTrigger])

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response) {
        setUpdateTrigger((prev) => prev + 1)
        toast.success("Product deleted successfully!")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product.")
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setImageFiles([])
    setImagePreviews([])
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setEditingProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (e, field) => {
    const { value } = e.target
    const updatedArray = value.split(",").map((item) => item.trim())
    setEditingProduct((prev) => ({ ...prev, [field]: updatedArray }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)
    const previewUrls = files.map((file) => URL.createObjectURL(file))
    setImagePreviews(previewUrls)
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      name: editingProduct.name,
      category: editingProduct.category,
      price: Number.parseFloat(editingProduct.price),
      oldPrice: Number.parseFloat(editingProduct.oldPrice),
      availableStock: Number.parseInt(editingProduct.availableStock),
      availableSizes: editingProduct.availableSizes,
      availableColors: editingProduct.availableColors,
    }

    try {
      const response = await axios.put(`http://localhost:5001/api/products/${editingProduct._id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (response.data) {
        setUpdateTrigger((prev) => prev + 1)
        toast.success("Product updated successfully!")
        setEditingProduct(null)
        setImageFiles([])
        setImagePreviews([])
      }
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error("Failed to update product. " + (error.response?.data?.message || ""))
    }
  }

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchLower) ||
      (Array.isArray(product.category) && product.category.some((cat) => cat.toLowerCase().includes(searchLower))) ||
      product.price.toString().includes(searchLower) ||
      product.oldPrice.toString().includes(searchLower) ||
      product.availableStock.toString().includes(searchLower) ||
      (Array.isArray(product.availableSizes) &&
        product.availableSizes.some((size) => size.toLowerCase().includes(searchLower))) ||
      (Array.isArray(product.availableColors) &&
        product.availableColors.some((color) => color.toLowerCase().includes(searchLower)))
    )
  })

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <h2>Admin Product List</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name, Category, Price, Old Price, or Stock"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {editingProduct ? (
        <form className="product-form" onSubmit={handleUpdateProduct} encType="multipart/form-data">
          <h3>Edit Product</h3>
          <div>
            <label>Product Name</label>
            <input type="text" name="name" value={editingProduct.name} onChange={handleFormChange} />
          </div>
          <div>
            <label>Category (comma-separated)</label>
            <input
              type="text"
              name="category"
              value={editingProduct.category.join(", ")}
              onChange={(e) => handleArrayChange(e, "category")}
            />
          </div>
          <div>
            <label>Price</label>
            <input type="number" name="price" value={editingProduct.price} onChange={handleFormChange} />
          </div>
          <div>
            <label>Old Price</label>
            <input type="number" name="oldPrice" value={editingProduct.oldPrice} onChange={handleFormChange} />
          </div>
          <div>
            <label>Available Stock</label>
            <input
              type="number"
              name="availableStock"
              value={editingProduct.availableStock}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>Available Sizes (comma-separated)</label>
            <input
              type="text"
              name="availableSizes"
              value={editingProduct.availableSizes.join(", ")}
              onChange={(e) => handleArrayChange(e, "availableSizes")}
            />
          </div>
          <div>
            <label>Available Colors (comma-separated)</label>
            <input
              type="text"
              name="availableColors"
              value={editingProduct.availableColors.join(", ")}
              onChange={(e) => handleArrayChange(e, "availableColors")}
            />
          </div>
          <div>
            <label>Product Images (select multiple)</label>
            <input type="file" multiple onChange={handleImageChange} />
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                <h4>Selected Images:</h4>
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    style={{ width: "100px", height: "100px", marginRight: "10px" }}
                  />
                ))}
              </div>
            )}
          </div>
          <button type="submit">Update Product</button>
        </form>
      ) : (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Old Price</th>
                <th>Sizes</th>
                <th>Colors</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={`${product._id}-${updateTrigger}`}>
                    <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
                    <td>
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt="Product Thumbnail"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category.join(", ")}</td>
                    <td>{product.price}</td>
                    <td>{product.oldPrice}</td>
                    <td>{product.availableSizes.join(", ")}</td>
                    <td>{product.availableColors.join(", ")}</td>
                    <td>{product.availableStock}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product)} className="edit-btn">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No products found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  )
}

export default AdminProductlist

