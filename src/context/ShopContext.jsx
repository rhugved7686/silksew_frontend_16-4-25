// import React, { createContext, useState } from "react";
// import all_product from "../components/Assets/all_product";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < all_product.length + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

// const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState(getDefaultCart());
//   const [searchTerm, setSearchTerm] = useState('');

//   // const navigate = useNavigate()

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     console.log(cartItems);
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;

//     // Loop through all items in the cart
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         // Find the product information by matching the id
//         const itemInfo = all_product.find(
//           (product) => product.id === Number(item)
//         );

//         // Ensure itemInfo exists before accessing its properties
//         if (itemInfo) {
//           totalAmount += cartItems[item] * itemInfo.new_price;
//         }
//       }
//     }

//     // Return the total amount after processing all items
//     return totalAmount;
//   };

//   const getTotalCartItems = () => {
//     let totalItem = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         totalItem += cartItems[item];
//       }
//     }
//     return totalItem;
//   };

//   const updateSearchTerm = (term) => {
//     setSearchTerm(term);
//   };

//   const contextValue = {
//     getTotalCartItems,
//     getTotalCartAmount,
//     all_product,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     searchTerm,
//     updateSearchTerm,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import React, { createContext, useEffect, useState } from "react";
import all_product from "../components/Assets/all_product";
import axios from "axios";
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([])

  const addToCart = (id, size) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[id]) {
        updatedItems[id].quantity += 1;
        updatedItems[id].size = size; // Update size in case it changes
      } else {
        updatedItems[id] = { quantity: 1, size }; // New product with size
      }
      return updatedItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[id].quantity > 1) {
        updatedItems[id].quantity -= 1;
      } else {
        delete updatedItems[id]; // Remove item if quantity reaches 0
      }
      return updatedItems;
    });
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, { quantity }]) => {
      const product = all_product.find((p) => p.id === Number(id));
      return total + quantity * (product?.new_price || 0);
    }, 0);
  };

  // New function to get total cart items
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, { quantity }) => total + quantity, 0);
  };


  // function to get all products list from the backend
  const getProducts = async () => {
    try {
      const response = await axios.get(BASEURL + "/api/products");

      if (response.status === 200) {
        setProducts(response.data); // Update state with fetched products
        console.log("Fetched products:", response.data); // Log the fetched data
      } else {
        console.error("Failed to fetch products. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Log products whenever they update
  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]); // Runs whenever `products` changes

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems, // Add this to the context value
    all_product,
    searchTerm,
    setSearchTerm,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
