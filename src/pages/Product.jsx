/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts'

const Product = () => {
  const {all_product,products} = useContext(ShopContext)
  // console.log("products ", products);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId))
  // console.log("product ", product);
  return (
    <div>
      <ProductDisplay product={product}/>
      {/* <DescriptionBox/> */}
      <RelatedProducts/>
    </div>
  )
}

export default Product