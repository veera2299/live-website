
import React, { useEffect } from 'react'
import AOS from 'aos';
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home';
import Upcoming from './pages/Upcoming';
import Completed from './pages/Completed';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

const App = () => {

  useEffect(()=>{
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  },[])

  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/upcoming' element={<Upcoming/>} />
      <Route path='/completed' element={<Completed/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
