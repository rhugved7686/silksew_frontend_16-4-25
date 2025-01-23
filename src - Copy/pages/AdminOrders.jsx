import React from "react";
import "../pages/CSS/AdminOrders.css"; // Optional: Add styling for the orders table

const AdminOrders = () => {
  // Sample orders (you can hardcode data here if needed)
  const orders = [
    {
      _id: "1",
      user: { name: "John Doe" },
      totalAmount: 2000,
      paymentMethod: "Credit Card",
      address: "123 Main St, City, Country",
      status: "Pending",
      createdAt: "2025-01-15T10:00:00Z",
    },
    {
      _id: "2",
      user: { name: "Jane Smith" },
      totalAmount: 1500,
      paymentMethod: "PayPal",
      address: "456 Elm St, City, Country",
      status: "Shipped",
      createdAt: "2025-01-14T12:30:00Z",
    },
  ];

  return (
    <div className="admin-orders">
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Address</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name || "Unknown User"}</td>
              <td>Rs.{order.totalAmount}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.address}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
