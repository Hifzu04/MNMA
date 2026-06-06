import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivals from '../Components/Products/NewArrivals'
import ProductDetail from '../Components/Products/ProductDetail'
import { toast } from 'sonner';
function Home() {
  return (
    <div>
      <Hero />
      <GenderCollection/>
      <NewArrivals/>
       {/* bestseller is comming from productDetail.jsx page */}
      <h2 className='text-3xl font-bold mb-4 text-center'>Best Seller</h2>
        <ProductDetail />
    </div>
  )
}

export default Home