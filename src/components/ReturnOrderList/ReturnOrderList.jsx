import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";

const ReturnOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReturnOrders();
  }, []);

  const fetchReturnOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASEURL}/api/orders/return-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setOrders(response.data);
      console.log("response", response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  const handleReturnDecision = async (event, _id, productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token found");
        return;
      }
      const action = event.target.value; 
      if (!action) {
        setError("Action is required");
        return;
      }
      if (!productId) {
        setError("Product ID is missing");
        return;
      }
      const response = await axios.post(
        `${BASEURL}/api/orders/update-return-status/${_id}/${productId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Payload sent:", { action, _id, productId });
      fetchReturnOrders(); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update return status");
    }
  };

  return (
    <div className="order-list-container">
      <h2>Return Orders</h2>
      {loading && <p>Loading...</p>}
      {orders.length === 0 ? (
        <p>No return requests found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
              <th>Return Reason</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={`${order._id}-${order.productName}`}>
                <td>{order.productName}</td>
                <td>
                  Street : {order.street} <br /> City : {order.city} <br />
                  State : {order.state} <br /> Zipcode : {order.zipcode} <br />
                </td>
                <td>
                  Phone : {order.phone}
                  <br />
                  Email : {order.email}
                </td>
                <td>Rs {order.totalAmount}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.returnReason || "N/A"}</td>
                <td>
                  <select
                    onChange={
                      (event) =>
                        handleReturnDecision(event, order._id, order.productId) 
                    }
                    value={order.action}
                  >
                    <option value="">Select</option>
                    <option value="accepted">Accept</option>
                    <option value="rejected">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReturnOrderList;
