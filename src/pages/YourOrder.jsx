import React, { useContext, useEffect, useState } from "react";
import "../components/CartItems/CartItems.css";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const YourOrder = () => {
  // eslint-disable-next-line no-unused-vars
  const { cartItems, removeFromCart, getTotalCartAmount, products } = useContext(ShopContext);
  const [localCartItems, setLocalCartItems] = useState(cartItems); // Local state to trigger re-renders
  const [localProducts, setLocalProducts] = useState(products); // Local state for products
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const getImage = (images, availableColors) => {
    if (
      images &&
      images.length > 0 &&
      availableColors &&
      availableColors.length > 0
    ) {
      try {
        // Iterate over the available colors to find the first color with images
        for (const color of availableColors) {
          // Parse the image data for the current color
          const parsedImages = JSON.parse(images[0]);
          if (parsedImages[color.name] && parsedImages[color.name].length > 0) {
            // Return the first image of the available color
            return parsedImages[color.name][0];
          }
        }

        // If no specific images found for any color, return the first available image
        const parsedImages = JSON.parse(images[0]);
        const firstAvailableColor = Object.keys(parsedImages)[0];
        if (
          parsedImages[firstAvailableColor] &&
          parsedImages[firstAvailableColor].length > 0
        ) {
          return parsedImages[firstAvailableColor][0];
        }
      } catch (error) {
        console.error("Error parsing image JSON:", error);
      }
    }
    return "https://via.placeholder.com/150"; // Default placeholder image if no valid image found
  };

  // Sync local state with context changes
  useEffect(() => {
    setLocalCartItems(cartItems);
    setLocalProducts(products);
  }, [cartItems, products]); // Trigger updates whenever cartItems or products change

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {localCartItems.map((cartItem) => {
        const { productId, quantity, size } = cartItem;

        // Find the corresponding product in the products array
        const product = localProducts.find((p) => p._id === productId);

        if (!product) {
          console.warn(`Product with ID ${productId} not found.`);
          return null;
        }

        return (
          <div key={`${productId}-${size}`} className="cartitem">
            {/* <img src={product.images[0]} alt={product.name} /> */}
            <img src={getImage(product.images, product.availableColors)} alt={product.name} className="product-image" style={{ height: "50px" }} />
            <p>{product.name}</p>
            <p>Rs {product.price}</p>
            <p>{quantity}</p>
            <p>{size}</p>
            <p>Rs {quantity * product.price}</p>
            <button onClick={() => removeFromCart(productId, size)}>Remove</button>
          </div>
        );
      })}
      <hr />
     
    </div>
  );
};

export default YourOrder;
