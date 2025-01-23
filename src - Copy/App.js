import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Shop from "./pages/Shop";
import Mens from "./pages/Mens";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Checkout from "./components/Checkout/Checkout";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/Footer/Footer";
import { AuthContextProvider } from "./context/AuthContext"; // Corrected import
import { ToastContainer } from "react-toastify"; // Import ToastContainer for toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import the styles for toast notifications
import ProtectedRoute from "./pages/ProtectedRoute"; // Import ProtectedRoute component

// Create a component to conditionally render Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const excludeNavbarRoutes = ["/admin"]; // Define routes where Navbar should not appear
  return !excludeNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div>
          <ConditionalNavbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Shop />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/womens" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <ToastContainer /> {/* Add ToastContainer here to render the toasts */}
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
