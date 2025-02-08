import { useState, useEffect, useContext, useCallback } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../pages/CSS/AdminProductlist.css"
import { Form, Input, Select, InputNumber, Button, Upload, Modal, Image } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"

const { TextArea } = Input
const { Option } = Select

function AdminProductlist({ updateTotalProducts }) {
  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(3)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [form] = Form.useForm()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [colorImages, setColorImages] = useState({})
  const [sizeData, setSizeData] = useState({})
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [previewTitle, setPreviewTitle] = useState("")
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [previousSizes, setPreviousSizes] = useState([])

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

  const colorOptions = [
    { name: "AliceBlue" },
    { name: "AntiqueWhite" },
    { name: "Aqua" },
    { name: "Aquamarine" },
    { name: "Azure" },
    { name: "Beige" },
    { name: "Bisque" },
    { name: "Black" },
    { name: "BlanchedAlmond" },
    { name: "Blue" },
    { name: "BlueViolet" },
    { name: "Brown" },
    { name: "Burlywood" },
    { name: "CadetBlue" },
    { name: "Chartreuse" },
    { name: "Chocolate" },
    { name: "Coral" },
    { name: "CornflowerBlue" },
    { name: "Cornsilk" },
    { name: "Crimson" },
    { name: "Cyan" },
    { name: "DarkBlue" },
    { name: "DarkCyan" },
    { name: "DarkGoldenrod" },
    { name: "DarkGray" },
    { name: "DarkGreen" },
    { name: "DarkKhaki" },
    { name: "DarkMagenta" },
    { name: "DarkOliveGreen" },
    { name: "DarkOrange" },
    { name: "DarkOrchid" },
    { name: "DarkRed" },
    { name: "DarkSalmon" },
    { name: "DarkSeagreen" },
    { name: "DarkSlateBlue" },
    { name: "DarkSlateGray" },
    { name: "DarkTurquoise" },
    { name: "DarkViolet" },
    { name: "DeepPink" },
    { name: "DeepSkyBlue" },
    { name: "DimGray" },
    { name: "DodgerBlue" },
    { name: "Firebrick" },
    { name: "FloralWhite" },
    { name: "ForestGreen" },
    { name: "Fuchsia" },
    { name: "Gainsboro" },
    { name: "GhostWhite" },
    { name: "Gold" },
    { name: "Goldenrod" },
    { name: "Gray" },
    { name: "Green" },
    { name: "GreenYellow" },
    { name: "Honeydew" },
    { name: "HotPink" },
    { name: "IndianRed" },
    { name: "Indigo" },
    { name: "Ivory" },
    { name: "Khaki" },
    { name: "Lavender" },
    { name: "LavenderBlush" },
    { name: "LawnGreen" },
    { name: "LemonChiffon" },
    { name: "LightBlue" },
    { name: "LightCoral" },
    { name: "LightCyan" },
    { name: "LightGoldenrodYellow" },
    { name: "LightGreen" },
    { name: "LightGrey" },
    { name: "LightPink" },
    { name: "LightSalmon" },
    { name: "LightSeaGreen" },
    { name: "LightSkyBlue" },
    { name: "LightSlateGray" },
    { name: "LightSteelBlue" },
    { name: "LightYellow" },
    { name: "Lime" },
    { name: "LimeGreen" },
    { name: "Linen" },
    { name: "Magenta" },
    { name: "Maroon" },
    { name: "MediumAquamarine" },
    { name: "MediumBlue" },
    { name: "MediumOrchid" },
    { name: "MediumPurple" },
    { name: "MediumSeaGreen" },
    { name: "MediumSlateBlue" },
    { name: "MediumSpringGreen" },
    { name: "MediumTurquoise" },
    { name: "MediumVioletRed" },
    { name: "MidnightBlue" },
    { name: "MintCream" },
    { name: "MistyRose" },
    { name: "Moccasin" },
    { name: "NavajoWhite" },
    { name: "Navy" },
    { name: "OldLace" },
    { name: "OliveDrab" },
    { name: "Orange" },
    { name: "OrangeRed" },
    { name: "Orchid" },
    { name: "PaleGoldenrod" },
    { name: "PaleGreen" },
    { name: "PaleTurquoise" },
    { name: "PaleVioletRed" },
    { name: "PapayaWhip" },
    { name: "PeachPuff" },
    { name: "Peru" },
    { name: "Pink" },
    { name: "Plum" },
    { name: "PowderBlue" },
    { name: "Purple" },
    { name: "Red" },
    { name: "RosyBrown" },
    { name: "RoyalBlue" },
    { name: "SaddleBrown" },
    { name: "Salmon" },
    { name: "SandyBrown" },
    { name: "SeaGreen" },
    { name: "SeaShell" },
    { name: "Sienna" },
    { name: "Silver" },
    { name: "SkyBlue" },
    { name: "SlateBlue" },
    { name: "Snow" },
    { name: "SpringGreen" },
    { name: "SteelBlue" },
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
    { name: "YellowGreen" },
  ]

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("https://api.silksew.com/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = Array.isArray(response.data) ? response.data : response.data.products || []
      setProducts(data)
      updateTotalProducts(data.length)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to fetch products.")
    }
  }, [token, updateTotalProducts])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`https://api.silksew.com/api/products/${id}`, {
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

  const getImage = (images, availableColors) => {
    if (images && images.length > 0 && availableColors && availableColors.length > 0) {
      try {
        const parsedImages = JSON.parse(images[0])
        for (const color of availableColors) {
          if (parsedImages[color.name] && parsedImages[color.name].length > 0) {
            return parsedImages[color.name][0]
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

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsAdding(false)
    setSelectedCategory(product.category[0])

    // Parse sizes properly
    let sizes = []
    if (Array.isArray(product.availableSizes)) {
      sizes = product.availableSizes
    } else if (typeof product.availableSizes === "string") {
      try {
        sizes = JSON.parse(product.availableSizes)
      } catch {
        sizes = product.availableSizes.split(",").map((size) => size.trim())
      }
    }
    setPreviousSizes([])

    let colors = []
    if (Array.isArray(product.availableColors)) {
      colors = product.availableColors.flatMap((color) => {
        if (typeof color === "string") {
          try {
            return JSON.parse(color).map((c) => c.name)
          } catch {
            return color
          }
        } else if (color.name) {
          return color.name
        }
        return []
      })
    } else if (typeof product.availableColors === "string") {
      try {
        const parsedColors = JSON.parse(product.availableColors)
        colors = parsedColors.flatMap((color) => {
          if (typeof color === "string") {
            return color
          } else if (color.name) {
            return color.name
          }
          return []
        })
      } catch {
        colors = [product.availableColors]
      }
    }

    form.setFieldsValue({
      ...product,
      category: product.category[0],
      subcategory: product.subcategory[0],
      colors: colors,
      stock: product.availableStock,
    })
    form.setFieldValue("sizes", undefined)

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

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsAdding(true)
    setSelectedCategory(null)
    form.resetFields()
    setColorImages({})
    setSizeData({})
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

  const handleSizeChange = (selectedSizes) => {
    const newSizeData = { ...sizeData }
    selectedSizes.forEach((size) => {
      if (!newSizeData[size]) {
        newSizeData[size] = { stock: 0 }
      }
    })
    Object.keys(newSizeData).forEach((size) => {
      if (!selectedSizes.includes(size)) {
        delete newSizeData[size]
      }
    })
    setSizeData(newSizeData)
    setPreviousSizes(selectedSizes)
    form.setFieldsValue({ sizes: selectedSizes })
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

  const handleSubmitProduct = async (values) => {
    if (!isAdding) {
      const originalSizes = editingProduct.availableSizes || []
      const originalColors = (editingProduct.availableColors || []).map((c) => c.name || c)
      const newSizes = values.sizes || previousSizes
      const newColors = values.colors || []

      const sizesChanged = JSON.stringify(originalSizes) !== JSON.stringify(newSizes)
      const colorsChanged = JSON.stringify(originalColors) !== JSON.stringify(newColors)

      if (!sizesChanged && !colorsChanged) {
        setShowWarningModal(true)
        return
      }
    }

    submitProductData({ ...values, sizes: values.sizes || previousSizes })
  }

  const handleWarningConfirm = () => {
    setShowWarningModal(false)
    const formValues = form.getFieldsValue()
    submitProductData(formValues)
  }

  const submitProductData = async (values) => {
    try {
      const productData = new FormData()
      productData.append("name", values.name)
      productData.append("description", values.description)
      productData.append("price", values.price)

      productData.append("oldPrice", values.oldPrice)
      productData.append("category", values.category)
      productData.append("subcategory", values.subcategory)
      productData.append("availableStock", values.stock)

      const sizes = values.sizes || previousSizes
      productData.append("availableSizes", JSON.stringify(sizes))

      const colors = values.colors || []
      const formattedColors = colors.map((color) => ({ name: color }))
      productData.append("availableColors", JSON.stringify(formattedColors))

      const uploadedImagesByColor = {}
      for (const color of colors) {
        if (colorImages[color]) {
          const uploadedImages = await Promise.all(
            colorImages[color].map(async (file) => {
              if (file.url) {
                return file.url
              }
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
      }

      productData.append("images", JSON.stringify(uploadedImagesByColor))

      let response
      if (isAdding) {
        response = await axios.post("https://api.silksew.com/api/products", productData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
      } else {
        response = await axios.put(`https://api.silksew.com/api/products/${editingProduct._id}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
      }

      if (response.data) {
        toast.success(isAdding ? "Product added successfully!" : "Product updated successfully!")
        setEditingProduct(null)
        setIsAdding(false)
        setColorImages({})
        setSizeData({})
        fetchProducts()
      }
    } catch (error) {
      console.error("Error submitting product:", error)
      toast.error(`Failed to ${isAdding ? "add" : "update"} product. ${error.response?.data?.message || ""}`)
    }
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    setIsAdding(false)
    setColorImages({})
    setSizeData({})
    form.resetFields()
  }

  const getFilteredProducts = useCallback(() => {
    return products.filter((product) => {
      const searchRegex = new RegExp(searchTerm, "i")
      return (
        searchRegex.test(product.name) ||
        searchRegex.test(product.category.join(", ")) ||
        searchRegex.test(product.subcategory.join(", ")) ||
        searchRegex.test(product.availableColors.map((c) => c.name || c).join(", ")) ||
        searchRegex.test(product.availableSizes.join(", ")) ||
        searchRegex.test(product.price.toString()) ||
        searchRegex.test(product.oldPrice ? product.oldPrice.toString() : "") ||
        searchRegex.test(product.availableStock.toString())
      )
    })
  }, [products, searchTerm])

  const filteredProducts = getFilteredProducts()
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const renderSearchSection = () => (
    <div className="search-section">
      <Input
        placeholder="Search products..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
      />
    </div>
  )

  const renderProductTable = () => (
    <>
      <h2>Admin Product List</h2>
      {renderSearchSection()}
      <table className="product-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Colors</th>
            <th>Sizes</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product._id}>
              <td data-label="Sr. No">{(currentPage - 1) * 3 + index + 1}</td>
              <td data-label="Image">
                <Image
                  src={getImage(product.images, product.availableColors) || "/placeholder.svg"}
                  alt={product.name}
                  width={50}
                  height={50}
                />
              </td>
              <td data-label="Name">{product.name}</td>
              <td data-label="Category">{product.category.join(", ")}</td>
              <td data-label="Sub Category">{product.subcategory.join(", ")}</td>
              <td data-label="Colors">
                {Array.isArray(product.availableColors)
                  ? product.availableColors.map((color) => (typeof color === "string" ? color : color.name)).join(", ")
                  : product.availableColors}
              </td>
              <td data-label="Sizes">
                {Array.isArray(product.availableSizes) ? product.availableSizes.join(", ") : product.availableSizes}
              </td>
              <td data-label="Price">Rs.{product.price}</td>
              <td data-label="Old Price">{product.oldPrice ? `Rs.${product.oldPrice}` : "N/A"}</td>
              <td data-label="Stock">{product.availableStock}</td>
              <td data-label="Actions">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEditProduct(product)}
                  className="edit-btn"
                />
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteProduct(product._id)}
                  className="delete-btn"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

  return (
    <div className="product-list">
      {editingProduct || isAdding ? (
        <div className="product-form" style={{ maxHeight: "80vh", overflowY: "auto" }}>
          <h2>{isAdding ? "Add New Product" : "Edit Product"}</h2>
          <Form form={form} layout="vertical" onFinish={handleSubmitProduct}>
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

            <Form.Item
              name="sizes"
              label="Available Sizes"
              rules={[{ required: true, message: "Please select at least one size" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select available sizes"
                style={{ width: "100%" }}
                onChange={handleSizeChange}
                value={previousSizes}
              >
                {["XS", "S", "M", "L", "XL", "XXL", "2T", "3T", "4T", "5", "6", "7", "8"].map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="colors" label="Colors" rules={[{ required: true }]}>
              <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
                {colorOptions.map(({ name }) => (
                  <Option key={name} value={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {form.getFieldValue("colors")?.map((color) => (
              <Form.Item key={color} label={`Images for ${color}`}>
                <Upload
                  listType="picture-card"
                  fileList={colorImages[color] || []}
                  onPreview={handlePreview}
                  onChange={(info) => handleImageChange(color, info)}
                  beforeUpload={() => false}
                  multiple={true}
                >
                  {(colorImages[color]?.length || 0) < 5 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            ))}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isAdding ? "Add Product" : "Update Product"}
              </Button>
              <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div>
          {renderProductTable()}
          <div className="pagination">
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </Button>
            {totalPages <= 5 ? (
              [...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  type={currentPage === index + 1 ? "primary" : "default"}
                >
                  {index + 1}
                </Button>
              ))
            ) : (
              <>
                {currentPage > 2 && (
                  <>
                    <Button onClick={() => paginate(1)}>1</Button>
                    {currentPage > 3 && <span>...</span>}
                  </>
                )}
                {[...Array(5)].map((_, index) => {
                  const pageNumber = Math.min(Math.max(currentPage - 2 + index, 1), totalPages)
                  return (
                    <Button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      type={currentPage === pageNumber ? "primary" : "default"}
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <span>...</span>}
                    <Button onClick={() => paginate(totalPages)}>{totalPages}</Button>
                  </>
                )}
              </>
            )}
            <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}

      <Modal
        visible={showWarningModal}
        title="Warning"
        onOk={handleWarningConfirm}
        onCancel={() => setShowWarningModal(false)}
      >
        <p>You haven't made any changes to the sizes or colors. Are you sure you want to update the product?</p>
      </Modal>

      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: "100%" }} src={previewImage || "/placeholder.svg"} />
      </Modal>

      <ToastContainer />
    </div>
  )
}

export default AdminProductlist

