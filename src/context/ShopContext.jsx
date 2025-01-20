import React, { createContext, useEffect, useState } from "react";
import all_product from "../components/Assets/all_product";
import axios from "axios";
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([])
  const [token, setToken] = useState('')


  const addToCart = async (productId, size) => {

    if (token) {
      try {
        const response = await axios.post(
          BASEURL + '/api/cart/add',
          { productId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Response:', response.data);

      } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
          console.error('API Error:', error.response.data);
        }
      }
    }



    // setCartItems((prevItems) => {
    //   const updatedItems = { ...prevItems };
    //   console.log(updatedItems)
    //   if (updatedItems[productId]) {
    //     updatedItems[productId].quantity += 1;
    //     updatedItems[productId].size = size; // Update size in case it changes
    //   } else {
    //     updatedItems[productId] = { quantity: 1, size }; // New product with size
    //     // cartItems.push({ productId, quantity: 1, size });
    //   }
    //   console.log(updatedItems)
    //   return updatedItems;
    // });
    getTotalCartItems();
  };


  const removeFromCart = async (productId) => {

    if (token) {
      try {
        const response = await axios.post(
          BASEURL + '/api/cart/remove',
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Response:', response.data);
        getTotalCartItems();

      } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
          console.error('API Error:', error.response.data);
        }
      }
    }

    // setCartItems((prevItems) => {
    //   const updatedItems = { ...prevItems };
    //   if (updatedItems[productId].quantity > 1) {
    //     updatedItems[productId].quantity -= 1;
    //   } else {
    //     delete updatedItems[productId]; // Remove item if quantity reaches 0
    //   }
    //   return updatedItems;
    // });
  };

  // const removeFromCart = async (productId) => {
  //   if (!token) {
  //     console.warn("User is not authenticated.");
  //     return;
  //   }

  //   try {
  //     // Optimistic UI update: Update cart immediately
  //     setCartItems((prevItems) => {
  //       const updatedItems = prevItems.filter((item) => item._id !== productId);
  //       return updatedItems;
  //     });

  //     // API call to update cart server-side
  //     const response = await axios.post(
  //       BASEURL + '/api/cart/remove',
  //       { productId },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     console.log("Server Response:", response.data);
  //   } catch (error) {
  //     console.error("Error removing item from cart:", error.message);
  //     if (error.response) {
  //       console.error("API Error Details:", error.response.data);
  //     }

  //     // Revert optimistic update in case of an error
  //     setCartItems((prevItems) => {
  //       // Optionally re-add the item if the removal failed
  //       return [...prevItems];
  //     });
  //   }
  // };


  const getTotalCartAmount = () => {

    return cartItems.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId); // Find product by ID
      if (product) {
        total += product.price * cartItem.quantity; // Calculate price for item
      }
      return total;
    }, 0);
    
  };


  // New function to get total cart items
  // const getTotalCartItems = async (token) => {

  //   if (token) {
  //     try {
  //       const response = await axios.get(
  //         BASEURL + '/api/cart/',
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //       console.log(response.data);
  //       console.log(response.data.items);

  //       const items = response.data.items;

  //       // Calculate the total based on the items directly from the response
  //       // const totalItems = items.reduce((total, { quantity }) => total + quantity, 0);

  //       // Optionally update state if needed
  //       setCartItems(items); // Store items in state if you want to use it elsewhere

  //       // Return the calculated total
  //       return items;

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // };

  const getTotalCartItems = async (token) => {
    console.log(token)
    console.log(cartItems)
    if (token) {
      try {
        const response = await axios.get(
          BASEURL + '/api/cart/',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Cart Items:', response.data.items);
        const items = response.data.items;
        setCartItems(items)

        // Calculate the total number of items
        const totalItems = items.reduce((total, { quantity }) => total + quantity, 0);

        return { items, totalItems };
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        throw error;
      }
    } else {
      console.error('No token provided.');
      return { items: [], totalItems: 0 };
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && savedToken) {
      setToken(savedToken);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getTotalCartItems(token)
    }
  }, [token,removeFromCart,getTotalCartItems])

  // function to get all products list from the backend
  const getProducts = async () => {
    try {
      const response = await axios.get(BASEURL + "/api/products");

      if (response.status === 200) {
        setProducts(response.data.products); // Update state with fetched products
        console.log("Fetched products:", response.data.products); // Log the fetched data
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
