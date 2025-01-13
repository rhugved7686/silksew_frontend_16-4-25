import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import LoginSignup from "./pages/LoginSignup";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Footer from "./components/Footer/Footer";
import men_banner from './components/Assets/banner_mens.png';
import women_banner from './components/Assets/banner_women.png';
import kid_banner from './components/Assets/banner_kids.png';
import OfferBanner from "./components/OfferBanner/OfferBanner";
import Checkout from "./components/Checkout/Checkout";
import AdminPage from "./pages/AdminPage";
import ForgottenPassword from "./pages/ForgottenPassword";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();  // Use useLocation inside the context of BrowserRouter

  return (
    <div>
      {/* Only one BrowserRouter at the top level of the app */}
      <Navbar />
      
      {/* Conditionally render OfferBanner only on the Shop page */}
      {location.pathname === "/" && <OfferBanner />}
      
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/forgot-password" element={<ForgottenPassword />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
