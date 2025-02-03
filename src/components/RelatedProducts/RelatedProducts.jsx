import { useState, useEffect } from "react"
import "./RelatedProducts.css"
import Item from "../Item/Item"
import axios from "axios"

const RelatedProducts = ({ subcategory, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          params: {
            subcategory: subcategory,
            exclude: currentProductId,
          },
        })
        setRelatedProducts(response.data)
      } catch (error) {
        console.error("Error fetching related products:", error)
      }
    }

    if (subcategory && currentProductId) {
      fetchRelatedProducts()
    }
  }, [subcategory, currentProductId])

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item) => (
          <Item
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.price}
            old_price={item.oldPrice}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts

