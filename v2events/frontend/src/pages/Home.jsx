import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Play from '../components/Play'
import Footer from '../components/Footer'
import CircularRotatingShowcase from '../components/CircularRotatingShowcase'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Play/>
      <CircularRotatingShowcase/>
    </div>
  )
}

export default Home
