// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext, useEffect } from "react";
import { ShopContext } from "./ShopContext";
// Create the AuthContext
const AuthContext = createContext();




// AuthContextProvider component
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    // Initialize token from localStorage if available
    return localStorage.getItem("token") || "";
  });

  const { setToken: setShopToken } = useContext(ShopContext);


  // const login = (userData, authToken) => {
  //   setUser(userData);
  //   setToken(authToken);

  //   // Store user and token in localStorage
  //   localStorage.setItem("user", JSON.stringify(userData));
  //   localStorage.setItem("token", authToken);
  // };

  // const logout = () => {
  //   setUser(null);
  //   setToken("");

  //   // Clear user and token from localStorage
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  // };


  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setShopToken(authToken); // Update ShopContext with new token
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setShopToken(""); // Clear token in ShopContext
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };


  // useEffect(() => {
  //   // Sync state with localStorage on component mount
  //   const storedUser = localStorage.getItem("user");
  //   const storedToken = localStorage.getItem("token");

  //   if (storedUser) setUser(JSON.parse(storedUser));
  //   if (storedToken) setToken(storedToken);
  // }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setShopToken(storedToken); // Sync token with ShopContext
    }
  }, [setShopToken]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// Only export AuthContext and AuthContextProvider
export { AuthContext, AuthContextProvider };
