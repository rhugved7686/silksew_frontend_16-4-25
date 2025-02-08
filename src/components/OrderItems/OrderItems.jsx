import { useContext, useEffect, useState } from "react"
import "./OrderItems.css"
import { ShopContext } from "../../context/ShopContext"
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../../config"
import axios from "axios"

const OrderItems = () => {
  const { products } = useContext(ShopContext)
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [selectedReason, setSelectedReason] = useState("")
  const [currentOrder, setCurrentOrder] = useState(null)
  const [currentProduct, setCurrentProduct] = useState(null)

  // Load order data
  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.warn("No token found, redirecting to login.")
          navigate("/login")
          return
        }

        const response = await axios.get(BASEURL + "/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("response-------",response)

        if (response && response.data) {
          setOrderData(response.data)
        } else {
          setOrderData([])
        }
      } catch (error) {
        console.error("Error fetching order data:", error)
      }
    }

    loadOrderData()
  }, [navigate])

  // Function to handle return request
  const requestReturn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!currentOrder || !currentProduct || !selectedReason) {
      setError("Please select a reason and ensure a valid order and product are selected.")
      setLoading(false)
      return
    }

    try {
      console.log("Sending return request...")
      console.log("Current Order:", currentOrder)
      console.log("Current Product:", currentProduct)
      console.log("Selected Reason:", selectedReason)

      // First API call: request-return
      const returnUrl = `${BASEURL}/api/orders/request-return/${currentOrder}/${currentProduct}`
      console.log("Request URL:", returnUrl)

      const returnResponse = await axios.post(
        returnUrl,
        { reason: selectedReason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      )

      console.log("Return Response:", returnResponse.data)

      // Second API call: save-reason
      const saveReasonUrl = `${BASEURL}/api/orders/save-reason`
      const saveReasonResponse = await axios.post(
        saveReasonUrl,
        {
          orderId: currentOrder,
          productId: currentProduct,
          reason: selectedReason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      )

      console.log("Save Reason Response:", saveReasonResponse.data)

      alert("Return request submitted and reason saved successfully!")
      setShowPopup(false)

      // Update the local state to reflect the return request
      setOrderData((prevOrderData) =>
        prevOrderData.map((order) =>
          order._id === currentOrder
            ? {
              ...order,
              items: order.items.map((item) =>
                item.productId === currentProduct
                  ? { ...item, returnRequested: true, returnReason: selectedReason }
                  : item,
              ),
            }
            : order,
        ),
      )
    } catch (err) {
      console.error("Error in requestReturn:", err)
      setError(err.response ? `Error: ${err.response.status} - ${err.response.data.message}` : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Open popup
  const openPopup = (orderId, productId) => {
    setCurrentOrder(orderId)
    setCurrentProduct(productId)
    setShowPopup(true)
  }

  return (
    <div className={`cartitems ${showPopup ? "blur-background" : ""}`}>
      <div className="cartitems-header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {orderData.map((order) =>
        order.items.map((Item, index) => {
          const { productId, quantity, size, returnRequested, returnApproved } = Item
          const product = products.find((p) => p._id === productId)

          if (!product) return null
          let requestStatus = '';
          // eslint-disable-next-line eqeqeq
          console.log(product.order == "select");

          if (Item.action === 'Select' && returnRequested && !returnApproved) { requestStatus = 'Return requested' }
          if (Item.action === 'accepted' && returnRequested && returnApproved) { requestStatus = 'Return Approved' }
          if (Item.action === "rejected" && returnRequested && !returnApproved) { requestStatus = 'Return Rejected' }

          return (
            <div key={`${order._id}-${index}`} className="cartitem">
              <img src={product.images[0] || "/placeholder.svg"} alt={product.name} />
              <p>{product.name}</p>
              <p>Rs {product.price}</p>
              <p>{quantity}</p>
              <p>{size}</p>
              <p>Rs {quantity * product.price}</p>
              {!returnRequested && (
                <button onClick={() => openPopup(order._id, productId)} disabled={loading}>
                  {loading ? "Requesting Return..." : "Return"}
                </button>
              )}
              {requestStatus}

            </div>
          )
        }),
      )}

      <hr />

      {/* Return Reason Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Select Return Reason</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={requestReturn}>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="returnReason"
                    value="Received wrong product"
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  Received wrong product
                </label>
                <label>
                  <input
                    type="radio"
                    name="returnReason"
                    value="Product is defective"
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  Product is defective
                </label>
                <label>
                  <input
                    type="radio"
                    name="returnReason"
                    value="Quality not as expected"
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  Quality not as expected
                </label>
                <label>
                  <input
                    type="radio"
                    name="returnReason"
                    value="Changed my mind"
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  Changed my mind
                </label>
              </div>
              <div className="popup-buttons">
                <button type="submit" disabled={!selectedReason || loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button type="button" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderItems