import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home';
import Upcoming from './pages/Upcoming';
import Completed from './pages/Completed';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventDetails from './pages/EventDetails';
import { Routes, Route } from 'react-router-dom';
import { SimpleSeparator } from './components/Separator';
import FAQ from './pages/Faq';

const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Define Animation Styles */}
      <style>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradient-xy 6s ease infinite;
        }
      `}</style>

      {/* Navbar (Stays on top, outside the border) */}
      <Navbar />

      {/* 2. MAIN BORDER WRAPPER */}
      {/* p-[5px] creates the border thickness. */}
      <div className="flex-grow relative p-[5px] bg-gradient-to-r from-[#fdc62e] via-[#f43f5e] to-[#8b5cf6] animate-gradient-border">
        
        {/* 3. INNER CONTENT CONTAINER */}
        {/* ADDED 'overflow-hidden' HERE. This clips the 3D carousel so it stays inside the white box. */}
        <div className="w-full h-full bg-white dark:bg-gray-950 relative shadow-2xl overflow-hidden rounded-xl">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/upcoming' element={<Upcoming />} />
            <Route path='/completed' element={<Completed />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </div>

      </div>

      <SimpleSeparator />
      
      {/* Footer (Stays at bottom, outside the border) */}
      <Footer />
    </div>
  )
}

export default App;