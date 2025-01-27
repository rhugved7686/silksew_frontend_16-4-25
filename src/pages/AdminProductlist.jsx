import React, { useState, useEffect, useContext, useCallback } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "font-awesome/css/font-awesome.min.css"
import "../pages/CSS/AdminProductlist.css"
import "../pages/CSS/CreateProductForm.css"
import { Form, Input, Select, InputNumber, Button, Upload, Modal } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const { TextArea } = Input
const { Option } = Select

function AdminProductlist() {
  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingProduct, setEditingProduct] = useState(null)
  const [form] = Form.useForm()
  // eslint-disable-next-line no-unused-vars
  const [updateTrigger, setUpdateTrigger] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [colorImages, setColorImages] = useState({})
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [previewTitle, setPreviewTitle] = useState("")

  const categories = ["men", "women", "kid"]

  const subcategories = {
    men: [
      "Traditional Wear",
      "Casual Wear",
      "Formal Wear",
      "Ethnic Wear",
      "Street Style",
      "Smart Casuals",
      "Athleisure",
      "Summer Wear",
      "Winter Wear",
      "Party Wear",
      "Wedding Wear",
      "Indo-Western",
      "Loungewear",
      "Vacation Wear",
      "Festive Wear",
    ],
    women: [
      "Saree",
      "Lehenga",
      "Salwar Kameez",
      "Anarkali Dress",
      "Kurti",
      "Churidar",
      "Palazzo Pants",
      "Indo-Western",
      "Tunic",
      "Maxi Dress",
      "Dress (Western)",
      "Skirt and Top",
      "Peplum Top",
      "Straight Cut Kurti",
      "Ethnic Gown",
      "Kaftan",
      "Jumpsuit (Western)",
      "Trousers and Blouse",
      "Palazzo and Kurti",
      "Sharara Suit",
      "Dhoti Pants and Kurti",
    ],
    kid: [
      "Traditional Wear",
      "Western Wear",
      "Casual Wear",
      "Party Wear",
      "Ethnic Wear",
      "Festive Wear",
      "Sportswear",
      "Loungewear",
      "Smart Casuals",
      "T-shirts and Jeans",
      "Shorts and Tops",
      "Dresses and Skirts",
      "Kurta and Pajama",
      "Lehenga Choli",
      "Sherwani",
      "Rompers and Jumpsuits",
    ],
  }

  // eslint-disable-next-line no-unused-vars
  const sizes = {
    men: ["XS", "S", "M", "L", "XL", "XXL"],
    women: ["XS", "S", "M", "L", "XL"],
    kid: ["2T", "3T", "4T", "5", "6", "7", "8"],
  }

  const colorOptions = [
    { name: "Alice blue" },
    { name: "Antique white" },
    { name: "Aqua" },
    { name: "Aquamarine" },
    { name: "Azure" },
    { name: "Beige" },
    { name: "Bisque" },
    { name: "Black" },
    { name: "Blanched almond" },
    { name: "Blue" },
    { name: "Blue violet" },
    { name: "Brown" },
    { name: "Burlywood" },
    { name: "Cadet blue" },
    { name: "Chartreuse" },
    { name: "Chocolate" },
    { name: "Coral" },
    { name: "Cornflower blue" },
    { name: "Cornsilk" },
    { name: "Crimson" },
    { name: "Cyan" },
    { name: "Dark blue" },
    { name: "Dark cyan" },
    { name: "Dark goldenrod" },
    { name: "Dark gray" },
    { name: "Dark green" },
    { name: "Dark khaki" },
    { name: "Dark magenta" },
    { name: "Dark olive green" },
    { name: "Dark orange" },
    { name: "Dark orchid" },
    { name: "Dark red" },
    { name: "Dark salmon" },
    { name: "Dark seagreen" },
    { name: "Dark slate blue" },
    { name: "Dark slate gray" },
    { name: "Dark turquoise" },
    { name: "Dark violet" },
    { name: "Deep pink" },
    { name: "Deep sky blue" },
    { name: "Dim gray" },
    { name: "Dodger blue" },
    { name: "Firebrick" },
    { name: "Floral white" },
    { name: "Forest green" },
    { name: "Fuchsia" },
    { name: "Gainsboro" },
    { name: "Ghost white" },
    { name: "Gold" },
    { name: "Goldenrod" },
    { name: "Gray" },
    { name: "Green" },
    { name: "Green yellow" },
    { name: "Honeydew" },
    { name: "Hot pink" },
    { name: "Indian red" },
    { name: "Indigo" },
    { name: "Ivory" },
    { name: "Khaki" },
    { name: "Lavender" },
    { name: "Lavender blush" },
    { name: "Lawn green" },
    { name: "Lemon chiffon" },
    { name: "Light blue" },
    { name: "Light coral" },
    { name: "Light cyan" },
    { name: "Light goldenrod yellow" },
    { name: "Light green" },
    { name: "Light grey" },
    { name: "Light pink" },
    { name: "Light salmon" },
    { name: "Light sea green" },
    { name: "Light sky blue" },
    { name: "Light slate gray" },
    { name: "Light steel blue" },
    { name: "Light yellow" },
    { name: "Lime" },
    { name: "Lime green" },
    { name: "Linen" },
    { name: "Magenta" },
    { name: "Maroon" },
    { name: "Medium aquamarine" },
    { name: "Medium blue" },
    { name: "Medium orchid" },
    { name: "Medium purple" },
    { name: "Medium sea green" },
    { name: "Medium slate blue" },
    { name: "Medium spring green" },
    { name: "Medium turquoise" },
    { name: "Medium violet red" },
    { name: "Midnight blue" },
    { name: "Mint cream" },
    { name: "Misty rose" },
    { name: "Moccasin" },
    { name: "Navajo white" },
    { name: "Navy" },
    { name: "Old lace" },
    { name: "Olive drab" },
    { name: "Orange" },
    { name: "Orange red" },
    { name: "Orchid" },
    { name: "Pale goldenrod" },
    { name: "Pale green" },
    { name: "Pale turquoise" },
    { name: "Pale violet red" },
    { name: "Papaya whip" },
    { name: "Peach puff" },
    { name: "Peru" },
    { name: "Pink" },
    { name: "Plum" },
    { name: "Powder blue" },
    { name: "Purple" },
    { name: "Red" },
    { name: "Rosy brown" },
    { name: "Royal blue" },
    { name: "Saddle brown" },
    { name: "Salmon" },
    { name: "Sandy brown" },
    { name: "Sea green" },
    { name: "Sea shell" },
    { name: "Sienna" },
    { name: "Silver" },
    { name: "Sky blue" },
    { name: "Slate blue" },
    { name: "Snow" },
    { name: "Spring green" },
    { name: "Steel blue" },
    { name: "Tan" },
    { name: "Thistle" },
    { name: "Teal" },
    { name: "Tomato" },
    { name: "Turquoise" },
    { name: "Violet" },
    { name: "Wheat" },
    { name: "White" },
    { name: "Whitesmoke" },
    { name: "Yellow" },
    { name: "Yellow green" },
  ]

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
  }, [fetchProducts])

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response) {
        toast.success("Product deleted successfully!")
        fetchProducts()
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
    setSelectedCategory(product.category[0])
    form.setFieldsValue({
      ...product,
      category: product.category[0],
      subcategory: product.subcategory[0],
      sizes: product.availableSizes,
      colors: product.availableColors.map((color) => color.name),
      stock: product.availableStock,
    })

    // Set initial color images
    const initialColorImages = {}
    if (product.images && product.images.length > 0) {
      try {
        const parsedImages = JSON.parse(product.images[0])
        Object.entries(parsedImages).forEach(([color, urls]) => {
          initialColorImages[color] = urls.map((url, index) => ({
            uid: `-${index}`,
            name: `${color}-image-${index}`,
            status: "done",
            url: url,
          }))
        })
      } catch (error) {
        console.error("Error parsing product images:", error)
      }
    }
    setColorImages(initialColorImages)
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    form.setFieldsValue({
      subcategory: undefined,
      sizes: undefined,
    })
  }

  const handleColorChange = (selectedColors) => {
    const newColorImages = { ...colorImages }
    selectedColors.forEach((color) => {
      if (!newColorImages[color]) {
        newColorImages[color] = []
      }
    })
    Object.keys(newColorImages).forEach((color) => {
      if (!selectedColors.includes(color)) {
        delete newColorImages[color]
      }
    })
    setColorImages(newColorImages)
  }

  const handleImageChange = (color, { fileList }) => {
    setColorImages((prev) => ({
      ...prev,
      [color]: fileList,
    }))
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1))
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleUpdateProduct = async (values) => {
    try {
      const productData = new FormData()
      productData.append("name", values.name)
      productData.append("description", values.description)
      productData.append("price", values.price)
      productData.append("oldPrice", values.oldPrice)
      productData.append("category", values.category)
      productData.append("subcategory", values.subcategory)
      productData.append("availableStock", values.stock)
      productData.append("availableSizes", JSON.stringify(values.sizes))
      productData.append("availableColors", JSON.stringify(values.colors))

      const uploadedImagesByColor = {}
      for (const [color, images] of Object.entries(colorImages)) {
        const uploadedImages = await Promise.all(
          images.map(async (file) => {
            if (file.url) {
              return file.url // Image already uploaded, use existing URL
            }
            // Upload new image
            const data = new FormData()
            data.append("file", file.originFileObj)
            data.append("upload_preset", "Silksew")
            data.append("cloud_name", "dvpk4sbzi")

            const res = await fetch("https://api.cloudinary.com/v1_1/dvpk4sbzi/image/upload", {
              method: "POST",
              body: data,
            })

            if (!res.ok) {
              throw new Error("Image upload failed")
            }

            const uploadedImage = await res.json()
            return uploadedImage.secure_url
          }),
        )
        uploadedImagesByColor[color] = uploadedImages
      }

      productData.append("images", JSON.stringify(uploadedImagesByColor))

      const response = await axios.put(`http://localhost:5001/api/products/${editingProduct._id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data) {
        toast.success("Product updated successfully!")
        setEditingProduct(null)
        setColorImages({})
        fetchProducts() // Fetch products to update the table
      }
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error("Failed to update product. " + (error.response?.data?.message || ""))
    }
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    setColorImages({})
    form.resetFields()
  }

  const getImage = (images, availableColors) => {
    if (images && images.length > 0 && availableColors && availableColors.length > 0) {
      try {
        const parsedImages = JSON.parse(images[0])
        for (const color of availableColors) {
          if (parsedImages[color] && parsedImages[color].length > 0) {
            return parsedImages[color][0]
          }
        }
        const firstAvailableColor = Object.keys(parsedImages)[0]
        if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
          return parsedImages[firstAvailableColor][0]
        }
      } catch (error) {
        console.error("Error parsing image JSON:", error)
      }
    }
    return "https://via.placeholder.com/150"
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
        <>
          <h2>Edit Product</h2>
          <div style={{ maxHeight: "600px", overflowY: "auto", padding: "20px" }}>
            <Form form={form} layout="vertical" onFinish={handleUpdateProduct}>
              <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select placeholder="Select category" onChange={handleCategoryChange}>
                  {categories.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {selectedCategory && (
                <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
                  <Select placeholder="Select subcategory">
                    {subcategories[selectedCategory].map((sub) => (
                      <Option key={sub} value={sub}>
                        {sub}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="Enter product description" />
              </Form.Item>

              <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter price" />
              </Form.Item>

              <Form.Item name="oldPrice" label="Old Price">
                <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter old price" />
              </Form.Item>

              <Form.Item name="stock" label="Available Stock" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter available stock" />
              </Form.Item>

              <Form.Item name="sizes" label="Available Sizes" rules={[{ required: true }]}>
                <Select mode="multiple" placeholder="Select available sizes">
                  {["XS", "S", "M", "L", "XL", "XXL", "2T", "3T", "4T", "5", "6", "7", "8"].map((size) => (
                    <Option key={size} value={size}>
                      {size}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* <Form.Item name="colors" label="Colors" rules={[{ required: true }]}>
                <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
                  {colorOptions.map(({ name }) => (
                    <Option key={name} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}

              {/* {form.getFieldValue("colors")?.map((color) => (
                <Form.Item key={color} label={`Images for ${color}`}>
                  <Upload
                    listType="picture-card"
                    fileList={colorImages[color] || []}
                    onPreview={handlePreview}
                    onChange={(info) => handleImageChange(color, info)}
                    beforeUpload={() => false}
                    multiple={true}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              ))} */}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Product
                </Button>
                <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Available Colors</th>
                <th>Available Sizes</th>
                <th>Price</th>
                <th>Old Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{indexOfFirstProduct + index + 1}</td>
                  <td>
                    <img
                      src={getImage(product.images, product.availableColors) || "/placeholder.svg"}
                      alt={product.name}
                      className="product-image"
                      style={{ height: "50px" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category.join(", ")}</td>
                  <td>{product.subcategory.join(", ")}</td>
                  <td>{product.availableColors.join(", ")}</td>
                  <td>{product.availableSizes.join(", ")}</td>
                  <td>{product.price}</td>
                  <td>{product.oldPrice ?? "N/A"}</td>
                  <td>{product.availableStock}</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        type="primary"
                        onClick={() => handleEditProduct(product)}
                        icon={<i className="fa fa-edit"></i>}
                      />
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteProduct(product._id)}
                        icon={<i className="fa fa-trash"></i>}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </Button>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                type={currentPage === index + 1 ? "primary" : "default"}
              >
                {index + 1}
              </Button>
            ))}
            <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}

      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: "100%" }} src={previewImage || "/placeholder.svg"} />
      </Modal>

      <ToastContainer />
    </div>
  )
}

export default AdminProductlist

