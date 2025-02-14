// import { createContext, useEffect, useState, useCallback } from "react"
// import all_product from "../components/Assets/all_product"
// import axios from "axios"
// import { BASEURL } from "../config"
// import { jwtDecode } from "jwt-decode"

// const delivery_fee = 0

// export const ShopContext = createContext(null)

// const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCartItems = localStorage.getItem("cartItems")
//     return savedCartItems ? JSON.parse(savedCartItems) : []
//   })
//   const [searchTerm, setSearchTerm] = useState("")
//   const [products, setProducts] = useState(() => {
//     const savedProducts = localStorage.getItem("products")
//     return savedProducts ? JSON.parse(savedProducts) : []
//   })
//   const [token, setToken] = useState("")

//   const validateToken = useCallback(() => {
//     const savedToken = localStorage.getItem("token")
//     if (savedToken) {
//       try {
//         const decodedToken = jwtDecode(savedToken)
//         const currentTime = Date.now() / 1000
//         if (decodedToken.exp > currentTime) {
//           setToken(savedToken)
//         } else {
//           console.error("Token has expired.")
//           localStorage.removeItem("token")
//         }
//       } catch (error) {
//         console.error("Failed to decode token:", error)
//         localStorage.removeItem("token")
//       }
//     }
//   }, [])

//   useEffect(() => {
//     validateToken()
//   }, [validateToken])

//   const getProducts = useCallback(async () => {
//     try {
//       const response = await axios.get(BASEURL + "/api/products")
//       if (response.status === 200) {
//         setProducts(response.data.products)
//         localStorage.setItem("products", JSON.stringify(response.data.products))
//       } else {
//         console.error("Failed to fetch products. Status:", response.status)
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error.message)
//     }
//   }, [])

//   const getTotalCartItems = useCallback(async () => {
//     if (token) {
//       try {
//         const response = await axios.get(BASEURL + "/api/cart/", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const serverCartItems = response.data.items || []
//         setCartItems(serverCartItems)
//         localStorage.setItem("cartItems", JSON.stringify(serverCartItems))
//       } catch (error) {
//         console.error("Failed to fetch cart items:", error.message)
//         if (error.response) {
//           console.error("API Error:", error.response.data)
//         }
//       }
//     } else {
//       console.error("No token provided.")
//     }
//   }, [token])

//   const addToCart = useCallback(
//     async (productId, size, color) => {
//       const newItem = { productId, size, color, quantity: 1 }
//       setCartItems((prevItems) => {
//         const existingItemIndex = prevItems.findIndex(
//           (item) => item.productId === productId && item.size === size && item.color === color,
//         )
//         let newItems
//         if (existingItemIndex > -1) {
//           newItems = [...prevItems]
//           newItems[existingItemIndex].quantity += 1
//         } else {
//           newItems = [...prevItems, newItem]
//         }
    
        
//         localStorage.setItem("cartItems", JSON.stringify(newItems))
//         return newItems
//       })

//       if (token) {
//         try {
//           await axios.post(BASEURL + "/api/cart/add", newItem, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         } catch (error) {
//           console.error("Failed to add item to cart on server:", error.message)
//         }
//       }
//     },
//     [token],
//   )

//   const removeFromCart = useCallback(
//     async (productId, size, color) => {
//       setCartItems((prevItems) => {
//         const itemIndex = prevItems.findIndex(
//           (item) => item.productId === productId && item.size === size && item.color === color,
//         )

//         const newItems = [...prevItems]
//         if (itemIndex > -1) {
//           if (newItems[itemIndex].quantity > 1) {
//             newItems[itemIndex].quantity -= 1
//           } else {
//             newItems.splice(itemIndex, 1)
//           }
//         }

//         localStorage.setItem("cartItems", JSON.stringify(newItems))
//         return newItems
//       })

//       if (token) {
//         try {
//           await axios.post(
//             BASEURL + "/api/cart/remove",
//             { productId, size, color },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             },
//           )
//         } catch (error) {
//           console.error("Failed to remove item from cart on server:", error.message)
//         }
//       }
//     },
//     [token],
//   )

//   const getTotalCartAmount = useCallback(() => {
//     return cartItems.reduce((total, cartItem) => {
//       const product = products.find((p) => p._id === cartItem.productId)
//       if (product) {
//         total += product.price * cartItem.quantity
//       }
//       return total
//     }, 0)
//   }, [cartItems, products])

//   const calculateTotalCartItems = useCallback(() => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0)
//   }, [cartItems])

//   useEffect(() => {
//     if (token) {
//       getTotalCartItems()
//     }
//   }, [token, getTotalCartItems])

//   useEffect(() => {
//     if (products.length === 0) {
//       getProducts()
//     }
//   }, [getProducts, products.length])

//   const contextValue = {
//     products,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     calculateTotalCartItems,
//     all_product,
//     searchTerm,
//     setSearchTerm,
//     setToken,
//     delivery_fee,
//     setCartItems,
//     getTotalCartItems,
//   }

//   return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
// }

// export default ShopContextProvider

"use client"

import { createContext, useEffect, useState, useCallback } from "react"
import all_product from "../components/Assets/all_product"
import axios from "axios"
import { BASEURL } from "../config"
import { jwtDecode } from "jwt-decode"

const delivery_fee = 0

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products")
    return savedProducts ? JSON.parse(savedProducts) : []
  })
  const [token, setToken] = useState("")

  const validateToken = useCallback(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      try {
        const decodedToken = jwtDecode(savedToken)
        const currentTime = Date.now() / 1000
        if (decodedToken.exp > currentTime) {
          setToken(savedToken)
        } else {
          console.error("Token has expired.")
          localStorage.removeItem("token")
          setCartItems([]) // Clear cart items when token expires
        }
      } catch (error) {
        console.error("Failed to decode token:", error)
        localStorage.removeItem("token")
        setCartItems([]) // Clear cart items when token is invalid
      }
    }
  }, [])

  useEffect(() => {
    validateToken()
  }, [validateToken])

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get(BASEURL + "/api/products")
      if (response.status === 200) {
        setProducts(response.data.products)
        localStorage.setItem("products", JSON.stringify(response.data.products))
      } else {
        console.error("Failed to fetch products. Status:", response.status)
      }
    } catch (error) {
      console.error("Error fetching products:", error.message)
    }
  }, [])

  const getTotalCartItems = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.get(BASEURL + "/api/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const serverCartItems = response.data.items || []
        setCartItems(serverCartItems)
      } catch (error) {
        console.error("Failed to fetch cart items:", error.message)
        if (error.response) {
          console.error("API Error:", error.response.data)
        }
      }
    } else {
      console.error("No token provided.")
      setCartItems([]) // Clear cart items when there's no token
    }
  }, [token])

  const addToCart = useCallback(
    async (productId, size, color) => {
      const newItem = { productId, size, color, quantity: 1 }
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.productId === productId && item.size === size && item.color === color,
        )
        let newItems
        if (existingItemIndex > -1) {
          newItems = [...prevItems]
          newItems[existingItemIndex].quantity += 1
        } else {
          newItems = [...prevItems, newItem]
        }
        return newItems
      })

      if (token) {
        try {
          await axios.post(BASEURL + "/api/cart/add", newItem, {
            headers: { Authorization: `Bearer ${token}` },
          })
        } catch (error) {
          console.error("Failed to add item to cart on server:", error.message)
        }
      }
    },
    [token],
  )

  const removeFromCart = useCallback(
    async (productId, size, color) => {
      setCartItems((prevItems) => {
        const itemIndex = prevItems.findIndex(
          (item) => item.productId === productId && item.size === size && item.color === color,
        )

        const newItems = [...prevItems]
        if (itemIndex > -1) {
          if (newItems[itemIndex].quantity > 1) {
            newItems[itemIndex].quantity -= 1
          } else {
            newItems.splice(itemIndex, 1)
          }
        }
        return newItems
      })

      if (token) {
        try {
          await axios.post(
            BASEURL + "/api/cart/remove",
            { productId, size, color },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
        } catch (error) {
          console.error("Failed to remove item from cart on server:", error.message)
        }
      }
    },
    [token],
  )

  const getTotalCartAmount = useCallback(() => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId)
      if (product) {
        total += product.price * cartItem.quantity
      }
      return total
    }, 0)
  }, [cartItems, products])

  const calculateTotalCartItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  useEffect(() => {
    if (token) {
      getTotalCartItems()
    } else {
      setCartItems([]) // Clear cart items when there's no token
    }
  }, [token, getTotalCartItems])

  useEffect(() => {
    if (products.length === 0) {
      getProducts()
    }
  }, [getProducts, products.length])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

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
    delivery_fee,
    setCartItems,
    getTotalCartItems,
    clearCart, // Add this new function to the context
  }

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}

export default ShopContextProvider

