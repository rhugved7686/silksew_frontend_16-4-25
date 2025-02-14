import { useContext, useEffect, useState, useCallback } from "react"
import axios from "axios"
import { ShopContext } from "../context/ShopContext"
import { BASEURL } from "../config"
import "../pages/CSS/AdminUser.css"
import moment from "moment"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function ConfirmedOrder({ updateTotalOrders }) {
  const [addresses, setAddresses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [tentativeDeliveryDates, setTentativeDeliveryDates] = useState({})
  const itemsPerPage = 3
  // eslint-disable-next-line no-unused-vars
  const { token } = useContext(ShopContext)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const statusHandler = async (event, _id) => {
    const tentativeDeliveryDate = tentativeDeliveryDates[_id]
    if (!tentativeDeliveryDate) {
      toast.error("Please select a tentative delivery date before confirming the order.")
      return
    }

    try {
      await axios.post(BASEURL + "/api/updateOrderStatus/order-status", {
        _id,
        status: "ConfirmedOrder",
        tentativeDeliveryDate: tentativeDeliveryDate,
      })
      await fetchUserDetails()
      toast.success("Your order has been confirmed!")
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error("Failed to update order status. Please try again.")
    }
  }

  // eslint-disable-next-line no-unused-vars
  const paymentStatusHandler = async (event, _id) => {
    try {
      await axios.post(BASEURL + "/api/updatePayment/payment-status", {
        _id,
        payment: event.target.value,
      })
      await fetchUserDetails()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDateChange = async (date, orderId) => {
    setTentativeDeliveryDates((prev) => ({ ...prev, [orderId]: date }))
  }

  const fetchUserDetails = useCallback(async () => {
    const localStorageToken = localStorage.getItem("token")

    if (!localStorageToken) {
      console.log("Admin token not found in localStorage. Please log in.")
      return
    }

    try {
      const response = await axios.get(BASEURL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      })
      setAddresses(response.data)
      updateTotalOrders(response.data.length)
      const dates = {}
      response.data.forEach((order) => {
        dates[order._id] = order.tentativeDeliveryDate || ""
      })
      setTentativeDeliveryDates(dates)
    } catch (err) {
      console.error("Error fetching orders:", err)
    }
  }, [updateTotalOrders])

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token")
    if (localStorageToken) {
      fetchUserDetails()
    }
  }, [fetchUserDetails])

  const filteredOrders = addresses
    .filter(
      (order) => order.address.firstName.toLowerCase().includes(searchTerm.toLowerCase()) && order.status === "Confirmed",
    )
    .sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  return (
    <div className="admin-orders p-6">
      <ToastContainer position="top-right" autoClose={1000} />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800" style={{ color: "#000" }}>
      Confirmed Order Details
      </h2>
      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Product Details</th>
              <th>User Details</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Tentative Delivery Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((order, index) => (
                <tr key={order._id}>
                  <td data-label="Sr. No">{index + 1}</td>
                  <td data-label="Product Details">
                    <div>
                      {/* <p>Product Id: {order.items[0].productId}</p> */}
                      <p>Product name: {order.items[0].productName}</p>
                      <p>Size: {order.items[0].size}</p>
                      <p>Quantity: {order.items[0].quantity}</p>
                    </div>
                  </td>
                  <td data-label="User Details">
                    <div>
                      <p>First Name: {order.address.firstName}</p>
                      <p>Last Name: {order.address.lastName}</p>
                      <p>Email: {order.address.email}</p>
                      <p>Phone: {order.address.phone}</p>
                    </div>
                  </td>
                  <td data-label="Address">
                    <div>
                      <p>Street: {order.address.street}</p>
                      <p>City: {order.address.city}</p>
                      <p>State: {order.address.state}</p>
                      <p>Landmark: {order.address.landMark}</p>
                    </div>
                  </td>
                  <td data-label="Payment Method">{order.paymentMethod}</td>
                  <td data-label="Total Amount">Rs.{order.totalAmount}</td>
                  <td data-label="Tentative Delivery Date">
                    <input
                      type="date"
                      value={tentativeDeliveryDates[order._id] || ""}
                      onChange={(e) => handleDateChange(e.target.value, order._id)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </td>
                  <td data-label="Status">
                    <button
                      onClick={() => statusHandler({ target: { value: "ConfirmedOrder" } }, order._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      disabled={!tentativeDeliveryDates[order._id]}
                      style={{ backgroundColor: "green", color:"white"}}
                    >
                      Confirm Order
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div><br/>
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#000",color:"white" }}
        >
          Previous
        </button>
        &ensp;
        <span className="text-sm text-black-700">
          Page {currentPage} of {totalPages}
        </span>
        &emsp;
        <button
          onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={currentPage >= totalPages}
          style={{ backgroundColor: "#000",color:"white"  }}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ConfirmedOrder

