import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivals from '../Components/Products/NewArrivals'

function Home() {
  return (
    <div>
      <Hero />
      <GenderCollection/>
      <NewArrivals/>
    </div>
  )
}

export default Home