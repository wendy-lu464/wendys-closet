import React from 'react'
import Banner from './Banner.jsx'
import Categories from './Categories.jsx'
import HeroSection from './HeroSection.jsx'
import TrendingItems from '../closet/TrendingItems.jsx'
import DealsSection from './DealsSection.jsx'
import PromoBanner from './PromoBanner.jsx'
import Blogs from '../blogs/Blogs.jsx'

const Home = () => {
  return (
    <>
    <Banner/>
    <Categories/>
    <TrendingItems/>
    <Blogs/>
    </>
  )
}

export default Home