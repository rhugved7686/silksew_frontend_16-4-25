// import React, { createContext, useEffect, useState,useCallback } from "react";
// import all_product from "../components/Assets/all_product";
// import axios from "axios";
// import { BASEURL } from "../config";
// import { useNavigate } from "react-router-dom";

// export const ShopContext = createContext(null);

// const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([])
//   const [token, setToken] = useState('')


//   const addToCart = async (productId, size) => {

//     if (token) {
//       try {
//         const response = await axios.post(
//           BASEURL + '/api/cart/add',
//           { productId, size },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log('Response:', response.data);

//       } catch (error) {
//         console.error('Error:', error.message);
//         if (error.response) {
//           console.error('API Error:', error.response.data);
//         }
//       }
//     }



//     // setCartItems((prevItems) => {
//     //   const updatedItems = { ...prevItems };
//     //   console.log(updatedItems)
//     //   if (updatedItems[productId]) {
//     //     updatedItems[productId].quantity += 1;
//     //     updatedItems[productId].size = size; // Update size in case it changes
//     //   } else {
//     //     updatedItems[productId] = { quantity: 1, size }; // New product with size
//     //     // cartItems.push({ productId, quantity: 1, size });
//     //   }
//     //   console.log(updatedItems)
//     //   return updatedItems;
//     // });
//     getTotalCartItems();
//   };


//   // const getTotalCartItems = async (token) => {
//   //   console.log(token)
//   //   console.log(cartItems)
//   //   if (token) {
//   //     try {
//   //       const response = await axios.get(
//   //         BASEURL + '/api/cart/',
//   //         { headers: { Authorization: `Bearer ${token}` } }
//   //       );

//   //       console.log('Cart Items:', response.data.items);
//   //       const items = response.data.items;
//   //       setCartItems(items)

//   //       // Calculate the total number of items
//   //       const totalItems = items.reduce((total, { quantity }) => total + quantity, 0);

//   //       return { items, totalItems };
//   //     } catch (error) {
//   //       console.error('Failed to fetch cart items:', error);
//   //       throw error;
//   //     }
//   //   } else {
//   //     console.error('No token provided.');
//   //     return { items: [], totalItems: 0 };
//   //   }
//   // };


//   const getTotalCartAmount = () => {

//     return cartItems.reduce((total, cartItem) => {
//       const product = products.find((p) => p._id === cartItem.productId); // Find product by ID
//       if (product) {
//         total += product.price * cartItem.quantity; // Calculate price for item
//       }
//       return total;
//     }, 0);

//   };


//   // const removeFromCart = async (productId) => {

//   //   if (token) {
//   //     try {
//   //       const response = await axios.post(
//   //         BASEURL + '/api/cart/remove',
//   //         { productId },
//   //         { headers: { Authorization: `Bearer ${token}` } }
//   //       );
//   //       console.log('Response:', response.data);
//   //       getTotalCartItems();

//   //     } catch (error) {
//   //       console.error('Error:', error.message);
//   //       if (error.response) {
//   //         console.error('API Error:', error.response.data);
//   //       }
//   //     }
//   //   }

//   //   // setCartItems((prevItems) => {
//   //   //   const updatedItems = { ...prevItems };
//   //   //   if (updatedItems[productId].quantity > 1) {
//   //   //     updatedItems[productId].quantity -= 1;
//   //   //   } else {
//   //   //     delete updatedItems[productId]; // Remove item if quantity reaches 0
//   //   //   }
//   //   //   return updatedItems;
//   //   // });
//   // };


//   const getTotalCartItems = useCallback(async (token) => {
//     if (token) {
//       try {
//         const response = await axios.get(
//           BASEURL + '/api/cart/',
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
  
//         console.log('Cart Items:', response.data.items);
//         const items = response.data.items;
//         setCartItems(items);
  
//         // Calculate the total number of items
//         const totalItems = items.reduce((total, { quantity }) => total + quantity, 0);
  
//         return { items, totalItems };
//       } catch (error) {
//         console.error('Failed to fetch cart items:', error);
//         throw error;
//       }
//     } else {
//       console.error('No token provided.');
//       return { items: [], totalItems: 0 };
//     }
//   }, []);
  
//   const removeFromCart = useCallback(async (productId) => {
//     if (token) {
//       try {
//         const response = await axios.post(
//           BASEURL + '/api/cart/remove',
//           { productId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log('Response:', response.data);
//         await getTotalCartItems(token);
//       } catch (error) {
//         console.error('Error:', error.message);
//         if (error.response) {
//           console.error('API Error:', error.response.data);
//         }
//       }
//     }
//   }, [token, getTotalCartItems]);
  

//   useEffect(() => {
//     const savedToken = localStorage.getItem('token');
//     if (!token && savedToken) {
//       setToken(savedToken);
//     }
//   }, [token]);

//   // useEffect(() => {
//   //   if (token) {
//   //     getTotalCartItems(token)
//   //   }
//   // }, [token, removeFromCart, getTotalCartItems])

//   useEffect(() => {
//     if (token) {
//       getTotalCartItems(token);
//     }
//   }, [token, cartItems]); 

//   // function to get all products list from the backend
//   const getProducts = async () => {
//     try {
//       const response = await axios.get(BASEURL + "/api/products");

//       if (response.status === 200) {
//         setProducts(response.data.products); // Update state with fetched products
//         console.log("Fetched products:", response.data.products); // Log the fetched data
//       } else {
//         console.error("Failed to fetch products. Response status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error.message);
//     }
//   };


//   useEffect(() => {
//     getProducts();
//   }, []); // Empty dependency array ensures this runs only once when the component mounts

//   // Log products whenever they update
//   useEffect(() => {
//     console.log("Updated products:", products);
//   }, [products]); // Runs whenever `products` changes

//   const contextValue = {
//     products,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     getTotalCartItems, // Add this to the context value
//     all_product,
//     searchTerm,
//     setSearchTerm,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


import React, { createContext, useEffect, useState, useCallback } from "react";
import all_product from "../components/Assets/all_product";
import axios from "axios";
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  const addToCart = async (productId, size) => {
    if (token) {
      try {
        // Optimistically update the cart state
        setCartItems((prevItems) => {
          const updatedItems = [...prevItems];
          const existingItem = updatedItems.find((item) => item.productId === productId);

          if (existingItem) {
            existingItem.quantity += 1;
            existingItem.size = size;
          } else {
            updatedItems.push({ productId, quantity: 1, size });
          }

          return updatedItems;
        });

        // Make API call to add to cart
        const response = await axios.post(
          BASEURL + '/api/cart/add',
          { productId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Response:', response.data);
        await getTotalCartItems(token); // Fetch updated cart from the server

      } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
          console.error('API Error:', error.response.data);
        }
      }
    }
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId); // Find product by ID
      if (product) {
        total += product.price * cartItem.quantity; // Calculate price for item
      }
      return total;
    }, 0);
  };

  const getTotalCartItems = useCallback(async (token) => {
    if (token) {
      try {
        const response = await axios.get(
          BASEURL + '/api/cart/',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Cart Items:', response.data.items);
        const items = response.data.items;
        setCartItems(items);

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
  }, []);

  const removeFromCart = useCallback(async (productId,size) => {
    if (token) {
      try {
        const response = await axios.post(
          BASEURL + '/api/cart/remove',
          { productId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Response:', response.data);
        await getTotalCartItems(token);
      } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
          console.error('API Error:', error.response.data);
        }
      }
    }
  }, [token, getTotalCartItems]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && savedToken) {
      setToken(savedToken);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getTotalCartItems(token);
    }
  }, [token, getTotalCartItems]);

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

