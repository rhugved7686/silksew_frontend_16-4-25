import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import LoginSignup from "./pages/LoginSignup";
import Cart from "./pages/Cart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./pages/Login";
import Footer from "./components/Footer/Footer";
import kid_banner from './components/Assets/banner_kids.png';
import Checkout from "./components/Checkout/Checkout";
import AdminPage from "./pages/AdminPage";
import Mens from "./pages/Mens";
import Women from "./pages/Women";
import Kids from "./pages/Kids";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <div>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<Mens/>} />
        <Route path="/womens" element={<Women/>} />
        <Route path="/kids" element={<Kids/>} />
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
