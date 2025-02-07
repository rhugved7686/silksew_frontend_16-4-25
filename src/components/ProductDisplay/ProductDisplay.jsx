"use client"

import { useState, useContext, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "./ProductDisplay.css"
import { ShopContext } from "../../context/ShopContext"
import { AuthContext } from "../../context/AuthContext"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import RelatedProducts from "../RelatedProducts/RelatedProducts"
import axios from "axios"
import { BASEURL } from "../../config"
import StarRating from "./StarRating"
import FeedBack from "./FeedBack"

const ProductDisplay = () => {
  const { state } = useLocation()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [review, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterReview, setFilterReview] = useState([])

  const { addToCart } = useContext(ShopContext)
  const { token } = useContext(AuthContext)

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [mainImage, setMainImage] = useState("")
  const [activeTab, setActiveTab] = useState("description")

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        let productData = state?.product

        if (!productData) {
          const storedProduct = localStorage.getItem(`product_${productId}`)
          if (storedProduct) {
            productData = JSON.parse(storedProduct)
          }
        }

        if (!productData && productId) {
          const response = await axios.get(`${BASEURL}/api/products/${productId}`)
          if (response.status === 200) {
            productData = response.data
            localStorage.setItem(`product_${productId}`, JSON.stringify(productData))
          } else {
            throw new Error("Failed to fetch product data")
          }
        }

        if (productData) {
          setProduct(productData)
          const images =
            productData.images?.[0] && Array.isArray(productData.images) ? JSON.parse(productData.images[0]) : {}
          const availableColors =
            productData.availableColors?.[0] && Array.isArray(productData.availableColors)
              ? JSON.parse(productData.availableColors[0])
              : []
          const defaultColor = availableColors?.[0]?.name || "Black"
          setSelectedColor(defaultColor)
          setMainImage(images[defaultColor]?.[0] || "")
        } else {
          throw new Error("No product data available")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    window.scrollTo(0, 0)
  }, [state, productId])

  useEffect(() => {
    if (product) {
      localStorage.setItem(`product_${product._id}`, JSON.stringify(product))
    }
  }, [product])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/review`)
        setReviews(res.data.data)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
    const filterData = review.filter((review) => review.productId === productId)
    setFilterReview(filterData)
  }, [review, productId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!product) {
    return <div>Product not found.</div>
  }

  const images = product.images?.[0] && Array.isArray(product.images) ? JSON.parse(product.images[0]) : {}
  const availableSizes =
    product.availableSizes?.[0] && Array.isArray(product.availableSizes) ? JSON.parse(product.availableSizes[0]) : []
  const availableColors =
    product.availableColors?.[0] && Array.isArray(product.availableColors) ? JSON.parse(product.availableColors[0]) : []

  const handleAddToCart = () => {
    if (!token) {
      toast.warn("Log in to add to cart.", {
        position: "top-right",
        autoClose: 3000,
      })
      navigate("/login")
      return
    }

    if (!selectedSize) {
      toast.error("Select a size.", { position: "top-right", autoClose: 3000 })
      return
    }

    if (!selectedColor) {
      toast.error("Select a color.", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    addToCart(product._id, selectedSize, selectedColor)
    toast.success("Added to cart!", { position: "top-right", autoClose: 3000 })
    setTimeout(() => navigate("/cart"), 1000)
  }

  const handleColorChange = (color) => {
    setSelectedColor(color)
    setMainImage(images[color]?.[0] || "")
  }

  const handleNewFeedback = (newFeedback) => {
    setFilterReview((prevReviews) => [...prevReviews, newFeedback])
  }

  return (
    <>
      <div className="productdisplay">
        <ToastContainer />
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {images[selectedColor]?.map((img, i) => (
              <img
                key={i}
                src={img || "/placeholder.svg"}
                alt={`Product ${i + 1}`}
                onClick={() => setMainImage(img)}
                className={mainImage === img ? "active" : ""}
              />
            ))}
          </div>
          <div className="productdisplay-img">
            <img className="productdisplay-main-img" src={mainImage || "/placeholder.svg"} alt={product.name} />
          </div>
        </div>
        <div className="productdisplay-right" style={{ textAlign: "justify" }}>
          <h2>{product.name}</h2>
          <p className="description" style={{ textAlign: "justify" }}>
            {product.description}
          </p>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-new">Rs {product.price}</div>
            <div className="productdisplay-right-price-old">Rs {product.oldPrice}</div>
          </div>
          <div className="productdisplay-right-colors">
            <h3>Generic Name</h3>
            <div className="color-options">{product.subcategory}</div>
          </div>
          <div className="productdisplay-right-colors">
            <h3>Available Colors</h3>
            <div className="color-options">
              {availableColors?.map((colorObj, i) => (
                <div
                  key={i}
                  className={`color-circle ${selectedColor === colorObj.name ? "selected" : ""}`}
                  style={{ backgroundColor: colorObj.name }}
                  onClick={() => handleColorChange(colorObj.name)}
                  title={colorObj.name}
                />
              ))}
            </div>
          </div>
          <div className="productdisplay-right-sizes">
            <h3>Select Size</h3>
            <div className="size-options">
              {availableSizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-box ${selectedSize === size ? "selected" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="descriptionbox">
        <div className="descriptionbox-navigator">
          <button
            className={`descriptionbox-nav-box ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          &ensp;&ensp;
          <button
            className={`descriptionbox-nav-box ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({filterReview.length})
          </button>
        </div>
        <div className="descriptionbox-description" style={{ textAlign: "justify" }}>
          {activeTab === "description" ? (
            <p>{product.description}</p>
          ) : (
            <>
              <div className="flex">
                <div className="feedback-container">
                  <FeedBack productId={productId} onNewFeedback={handleNewFeedback} />
                </div>
                <div className="review-box">
                  <h3 className="customer">Customer Reviews</h3>
                  <div className="review-list-container">
                    {filterReview.length > 0 ? (
                      <ul className="review-list">
                        {filterReview.map((review) => (
                          <li key={review._id} className="review-item">
                            <div className="review-header">
                              <h4 className="review-name">{review.name}</h4>
                              <StarRating star={review.rating} />
                            </div>
                            <p className="review-text">{review.review}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-reviews">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <RelatedProducts subcategory={product.subcategory} currentProductId={product._id} />
    </>
  )
}

export default ProductDisplay

