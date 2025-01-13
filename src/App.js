import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import LoginSignup from "./pages/LoginSignup";
import Cart from "./pages/Cart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./pages/Login";
import Footer from "./components/Footer/Footer";
import men_banner from './components/Assets/banner_mens.png';
import women_banner from './components/Assets/banner_women.png';
import kid_banner from './components/Assets/banner_kids.png';
import Checkout from "./components/Checkout/Checkout";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  // const location = useLocation(); // Get the current location from React Router (optional for additional logic)
  
  return (
    <div>
      <Navbar />


      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
