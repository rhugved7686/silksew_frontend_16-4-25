import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { BASEURL } from "../config";
import "../pages/CSS/AdminUser.css"

const AdminUser = () => {
  const [addresses, setAddresses] = useState([]);
  const { token } = useContext(ShopContext);

  const statusHandler = async (event, _id) => {
    try {
      await axios.post(BASEURL + "/api/updateOrderStatus/order-status", {
        _id,
        status: event.target.value,
      });
      await fetchUserDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const paymentStatusHandler = async (event, _id) => {
    try {
      await axios.post(BASEURL + "/api/updatePayment/payment-status", {
        _id,
        payment: event.target.value,
      });
      await fetchUserDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async () => {
    const localStorageToken = localStorage.getItem("token");

    if (!localStorageToken) {
      console.log("Admin token not found in localStorage. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5001/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      });
      setAddresses(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      fetchUserDetails();
    }
  }, [token]);

  return (
    <div className="admin-orders p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product Orders Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-black text-white uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b">Product Details</th>
              <th className="py-3 px-4 border-b">User Details</th>
              <th className="py-3 px-4 border-b">Address</th>
              <th className="py-3 px-4 border-b">Payment</th>
              <th className="py-3 px-4 border-b">Payment Method</th>
              <th className="py-3 px-4 border-b">Total Amount</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-center">
            {addresses.length > 0 ? (
              addresses.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b">
                  <span style={{ display: "block", marginBottom: "8px" }}>
                    Product Id: {order.items[0].productId} <br />
                    </span>
                    <span style={{ display: "block", marginBottom: "8px" }}>
                    Size: {order.items[0].size} <br />
                    </span>
                    <span style={{ display: "block", marginBottom: "8px" }}>
                    Quantity: {order.items[0].quantity}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                  <span style={{ display: "block", marginBottom: "8px" }}>
                    First Name : {order.address.firstName}<br/>
                    </span>
                    <span style={{ display: "block", marginBottom: "8px" }}>
                    Last Name : {order.address.lastName} <br />
                    </span>
                    <span style={{ display: "block", marginBottom: "8px" }}>
                    Email : {order.address.email} <br />
                    </span>
                    <span style={{ display: "block", marginBottom: "10px" }}>
                    Phone :  {order.address.phone}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
  <span style={{ display: "block", marginBottom: "8px" }}>
    Address Street: {order.address.street}
  </span>
  <span style={{ display: "block", marginBottom: "8px" }}>
    City: {order.address.city},
  </span>
  <span style={{ display: "block", marginBottom: "8px" }}>
    State: {order.address.state}
  </span>
  <span style={{ display: "block" }}>
    Landmark: {order.address.landMark}
  </span>
</td>

                  <td className="py-3 px-4 border-b">
                    <select
                      onChange={(event) =>
                        paymentStatusHandler(event, order._id)
                      }
                      value={order.payment}
                      className="border border-gray-400 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border-b">{order.paymentMethod}</td>
                  <td className="py-3 px-4 border-b font-semibold text-gray-800">
                    ${order.totalAmount}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className="border border-gray-400 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="confirmation">Confirmation</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-lg font-semibold text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUser;
