import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivals from '../Components/Products/NewArrivals'
import ProductDetail from '../Components/Products/ProductDetail'
import TopItems from './TopItems'
import { toast } from 'sonner';
import AllCollection from './AllCollection'
function Home() {
  return (
    <div>
      <Hero />
      <GenderCollection/>
      <NewArrivals/>
       {/* bestseller is comming from productDetail.jsx page */}
     
        <ProductDetail />
        <TopItems />
    </div>
  )
}

export default Home