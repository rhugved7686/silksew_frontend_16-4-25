// import React, { useContext, useState } from "react";
// import "./Navbar.css";
// import logo from "../Assets/logo.png";
// import cart_icon from "../Assets/cart_icon.png";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../../context/ShopContext";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const [menu, setMenu] = useState("shop");
//   const { getTotalCartItems } = useContext(ShopContext);
//   const [searchInput, setSearchInput] = useState('')
//   const {updateSearchTerm} = useContext(ShopContext)
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate("/signup");
//   };

//   const handleSearch = () =>{
//     updateSearchTerm(searchInput)
//   }

//   return (
//     <motion.div
//       className="navbar"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 150, damping: 25 }}
//     >
//       <div className="nav-logo">
//         <motion.img
//           src={logo}
//           alt="Logo"
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//         />
//         <p>SILKSEW</p>
//       </div>

//       <div className="search-box">
//         <form action="">
//           <input type="text" name="search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} id="srch" placeholder="Search" />
//           <button onClick={handleSearch} type="submit">
//             <i className="fa fa-search"></i>
//           </button>
//         </form>
//       </div>

//       <ul className="nav-menu">
//         <li
//           onClick={() => {
//             setMenu("shop");
//           }}
//         >
//           <Link style={{ textDecoration: "none" }} to="/">
//             Shop
//           </Link>
//           {menu === "shop" ? <motion.hr layoutId="underline" /> : <></>}
//         </li>
//         <li
//           onClick={() => {
//             setMenu("mens");
//           }}
//         >
//           <Link style={{ textDecoration: "none" }} to="/mens">
//             Men
//           </Link>
//           {menu === "mens" ? <motion.hr layoutId="underline" /> : <></>}
//         </li>
//         <li
//           onClick={() => {
//             setMenu("womens");
//           }}
//         >
//           <Link style={{ textDecoration: "none" }} to="/womens">
//             Women
//           </Link>
//           {menu === "womens" ? <motion.hr layoutId="underline" /> : <></>}
//         </li>
//         <li
//           onClick={() => {
//             setMenu("kids");
//           }}
//         >
//           <Link style={{ textDecoration: "none" }} to="/kids">
//             Kids
//           </Link>
//           {menu === "kids" ? <motion.hr layoutId="underline" /> : <></>}
//         </li>
//       </ul>

//       <div className="nav-login-cart">
//         <motion.button
//           whileHover={{
//             backgroundColor: "#38bdf8", // Light Blue
//             scale: 1.1,
//             boxShadow: "0px 4px 15px rgba(56, 189, 248, 0.5)",
//           }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleLoginClick}
//           className="login-btn"
//         >
//           Login
//         </motion.button>

//         <Link to="/cart">
//           <motion.img
//             src={cart_icon}
//             alt="Cart Icon"
//             whileHover={{ rotate: 20 }}
//             className="cart-icon"
//           />
//         </Link>

//         <div className="nav-cart-count">{getTotalCartItems()}</div>
//       </div>
//     </motion.div>
//   );
// };

// export default Navbar;


import React, { useContext, useState,useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, updateSearchTerm } = useContext(ShopContext);
  const [searchInput, setSearchInput] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { items, totalItems } = await getTotalCartItems(); // Await the async function
        console.log(totalItems)
        setCartItemCount(totalItems); // Update the state with the cart count
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItemCount(0); // Fallback in case of error
      }
    };

    fetchCartItems();
  }, [getTotalCartItems]);

  const handleLoginClick = () => {
    navigate("/signup");
  };

  const handleSearch = (event) => {
    event.preventDefault();  // Prevent page reload on form submit
    updateSearchTerm(searchInput);  // Update the search term in context
  };

  return (
    <motion.div
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
    >
      <div className="nav-logo">
        <motion.img
          src={logo}
          alt="Logo"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <p>SILKSEW</p>
      </div>

      <div className="search-box">
        <form onSubmit={handleSearch}>  {/* Add onSubmit handler */}
          <input
            type="text"
            name="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            id="srch"
            placeholder="Search"
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <motion.hr layoutId="underline" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <motion.hr layoutId="underline" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {menu === "womens" ? <motion.hr layoutId="underline" /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <motion.hr layoutId="underline" /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        <motion.button
          whileHover={{
            backgroundColor: "#38bdf8", // Light Blue
            scale: 1.1,
            boxShadow: "0px 4px 15px rgba(56, 189, 248, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLoginClick}
          className="login-btn"
        >
          Login
        </motion.button>

        <Link to="/cart">
        {/* ({getTotalCartItems}) */}

          <motion.img
            src={cart_icon}
            alt="Cart Icon"
            whileHover={{ rotate: 20 }}
            className="cart-icon"
          />
         
        </Link>

        <div className="nav-cart-count">{cartItemCount}</div>
      </div>
    </motion.div>
  );
};

export default Navbar;
