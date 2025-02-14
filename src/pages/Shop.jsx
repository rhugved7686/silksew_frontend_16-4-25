import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
// eslint-disable-next-line no-unused-vars
import OfferBanner from '../components/OfferBanner/OfferBanner'
import Offerbar from '../components/Offerbar/Offerbar'
import NewCollections from '../components/NewCollections/NewCollections'
// import NewsLetter from '../components/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
        <Offerbar/>
        <Hero/>
        <Popular/>
        <OfferBanner/>
        {/* <Offers/> */}
        <NewCollections/>
        {/* <NewsLetter/> */}
    </div>
  )
}

export default Shop