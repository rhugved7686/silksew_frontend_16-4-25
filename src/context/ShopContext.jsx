import React, { createContext, useEffect, useState, useCallback } from "react";
import all_product from "../components/Assets/all_product";
import axios from "axios";
import { BASEURL } from "../config";
import { jwtDecode } from "jwt-decode";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  // Function to validate and set token
  const validateToken = () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decodedToken = jwtDecode(savedToken);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp > currentTime) {
          setToken(savedToken); // Set valid token
        } else {
          console.error("Token has expired.");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    }
  };

  // Validate token on component mount
  useEffect(() => {
    validateToken();
  }, []);

  // Fetch products from API
  const getProducts = async () => {
    try {
      const response = await axios.get(BASEURL + "/api/products");
      if (response.status === 200) {
        setProducts(response.data.products);
      } else {
        console.error("Failed to fetch products. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Fetch total cart items
  const getTotalCartItems = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.get(BASEURL + "/api/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart items:", error.message);
        if (error.response) {
          console.error("API Error:", error.response.data);
        }
      }
    } else {
      console.error("No token provided.");
    }
  }, [token]);

  // Add item to cart
  const addToCart = async (productId, size) => {
    if (token) {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(
          BASEURL + "/api/cart/add",
          { productId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log("Add to cart response:", response.data);
        await getTotalCartItems();
      } catch (error) {
        console.error("Error adding to cart:", error.message);
        if (error.response) {
          console.error("API Error:", error.response.data);
        }
      }
    } else {
      console.error("No token found. Please log in.");
    }
  };

  // Remove item from cart
  const removeFromCart = useCallback(
    async (productId, size) => {
      if (token) {
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(
            BASEURL + "/api/cart/remove",
            { productId, size },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // console.log("Remove from cart response:", response.data);
          await getTotalCartItems();
        } catch (error) {
          console.error("Error removing from cart:", error.message);
          if (error.response) {
            console.error("API Error:", error.response.data);
          }
        }
      }
    },
    [token, getTotalCartItems]
  );

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      if (product) {
        total += product.price * cartItem.quantity;
      }
      return total;
    }, 0);
  };

  // Calculate total number of items in cart
  const calculateTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    if (token) {
      getTotalCartItems();
    }
  }, [token, getTotalCartItems]);

  useEffect(() => {
    getProducts();
  }, []);

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    calculateTotalCartItems,
    all_product,
    searchTerm,
    setSearchTerm,
    setToken,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
