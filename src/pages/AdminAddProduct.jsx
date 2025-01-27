import React, { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Form, Input, Select, InputNumber, Button, Upload } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const { TextArea } = Input
const { Option } = Select

const AdminProductForm = () => {
  const [form] = Form.useForm()
  // eslint-disable-next-line no-unused-vars
  const [fileList, setFileList] = useState([])
  const [colors, setColors] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [colorImages, setColorImages] = useState({})

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

  const handleImageUpload =
    (color) =>
    ({ fileList: newFileList }) => {
      setColorImages((prevColorImages) => ({
        ...prevColorImages,
        [color]: newFileList,
      }))
    }

  const onFinish = (values) => {
    console.log("Success:", { ...values })
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    form.setFieldsValue({
      subcategory: undefined,
      sizes: undefined,
    })
  }

  const handleColorChange = (selectedColors) => {
    setColors(selectedColors)
  }

  const handleSubmit = async () => {
    try {
      // Validate form fields
      await form.validateFields()

      const values = form.getFieldsValue()

      // Prepare product data
      const productData = new FormData()
      productData.append("name", values.productName)
      productData.append("description", values.description)
      productData.append("price", values.price)
      productData.append("oldPrice", values.oldPrice)
      productData.append("category", values.category)
      productData.append("subcategory", values.subcategory)
      productData.append("availableStock", values.stock)
      productData.append("availableSizes", JSON.stringify(values.sizes))
      productData.append(
        "availableColors",
        JSON.stringify(
          colors.map((color) => {
            const colorOption = colorOptions.find((option) => option.name === color)
            return {
              name: colorOption.name,
            }
          }),
        ),
      )

      const uploadedImagesByColor = {}
      for (const [color, images] of Object.entries(colorImages)) {
        const uploadedImages = await Promise.all(
          images.map(async (file) => {
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

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("http://localhost:5001/api/products", productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })

      // Display success message
      toast.success("Product Added Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // Reset form and state
      form.resetFields()
      setColorImages({})
      setColors([])
    } catch (error) {
      // Display error message
      toast.error(
        `Failed to add product: ${error.response?.data?.message || error.message || "An unexpected error occurred"}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
      )
      console.error("Error details:", error)
    }
  }

  return (
    <div style={{ padding: "10px" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
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

          {selectedCategory && (
            <Form.Item name="sizes" label="Available Sizes" rules={[{ required: true }]}>
              <Select mode="multiple" placeholder="Select available sizes">
                {sizes[selectedCategory].map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item name="colors" label="Colors" rules={[{ required: true }]}>
            <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
              {colorOptions.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {colors.map((color) => (
            <Form.Item key={color} label={`Images for ${color}`}>
              <Upload
                listType="picture-card"
                multiple
                fileList={colorImages[color] || []}
                onChange={handleImageUpload(color)}
                beforeUpload={() => false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 4 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          ))}
        </Form>
      </div>

      <Form.Item>
        <Button type="primary" style={{ width: "100%" }} onClick={handleSubmit}>
          Add Product
        </Button>
      </Form.Item>
    </div>
  )
}

export default AdminProductForm

