import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Shop from "./pages/Shop"
import Mens from "./pages/Mens"
import Women from "./pages/Women"
import Kids from "./pages/Kids"
import Cart from "./pages/Cart"
import LoginSignup from "./pages/LoginSignup"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Checkout from "./components/Checkout/Checkout"
import AdminPage from "./pages/AdminPage"
import Footer from "./components/Footer/Footer"
import { AuthContextProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from "./pages/ProtectedRoute"
import PasswordReset from "./pages/PasswordReset"
import ForgotPassword from "./pages/ForgotPassword"
import UserProfileButtons from "./pages/UserProfileButtons"
import UserProfileForm from "./pages/UserProfileForm"
import YourOrder from "./pages/YourOrder"
import FilterProduct from "./components/Navbar/FilterProduct"
import FloatingButtons from "./components/FloatingButtons/FloatingButtons"
import OrderItems from "./components/OrderItems/OrderItems"
import PrivacyPolicy from "./components/Footer/PrivacyPolicy"
import TermsServices from "./components/Footer/TermsServices"

// Create a component to conditionally render Navbar
const ConditionalNavbar = () => {
  const location = useLocation()
  const excludeNavbarRoutes = ["/admin"] // Define routes where Navbar should not appear
  return !excludeNavbarRoutes.includes(location.pathname) ? <Navbar /> : null
}

// Create a component to conditionally render FloatingButtons
const ConditionalFloatingButtons = () => {
  const location = useLocation()
  const excludeFloatingButtonsRoutes = ["/admin"] // Define routes where FloatingButtons should not appear
  return !excludeFloatingButtonsRoutes.includes(location.pathname) ? <FloatingButtons /> : null
}

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
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/forgotPassword/:id/:token" element={<ForgotPassword />} />
            <Route path="/user-profile-buttons" element={<UserProfileButtons />} />
            <Route path="/user-profile-form" element={<UserProfileForm />} />
            <Route path="/category/:category" element={<FilterProduct />} />
            <Route path="/your-order" element={<YourOrder />} />
            <Route path="/orders" element={<OrderItems />} />
            <Route path="/Privacy_Policy" element={<PrivacyPolicy/>}/>
            <Route path="/Terms" element={<TermsServices/>}/>

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
          <ConditionalFloatingButtons />
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App

