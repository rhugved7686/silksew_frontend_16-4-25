import React from "react";
import "../pages/CSS/AnalyticsTab.css";

const AnalyticsTab = ({ products }) => {
  const totalProducts = products.length;
  const totalCategories = [
    ...new Set(products.map((product) => product.category)),
  ].length;
  const totalRevenue = products.reduce(
    (acc, product) => acc + parseFloat(product.price || 0),
    0
  );

  return (
    <div className="analytics-tab">
      <h2>Analytics Overview</h2>
      <div className="analytics-metrics">
        <div className="metric">
          <h3>Total Revenue</h3>
          <p>Rs {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="metric">
          <h3>Total Categories</h3>
          <p>{totalCategories}</p>
        </div>
        <div className="metric">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="metric">
          <h3>Total Revenue</h3>
          <p>Rs {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="metric">
          <h3>Total Users</h3>
          <p>{totalCategories}</p>
        </div>
        <div className="metric">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
