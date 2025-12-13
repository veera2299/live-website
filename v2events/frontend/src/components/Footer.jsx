import React from 'react';
import v2_logo from "../../src/assets/v2_logo.png"; // Using one of your assets as a bg (optional)

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-200 mt-20 relative overflow-hidden">
        
        {/* Optional: Top Decoration Line (Gold) */}
        <div className="w-full h-1 bg-linear-to-r from-transparent via-[#fdc62e] to-transparent opacity-70"></div>

        <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                
                {/* 1. Brand Section */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-serif font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                         <img className='size-12' src={v2_logo} alt="" /> Events
                    </h1>
                    <p className="text-sm opacity-80 leading-relaxed">
                        Making your special moments unforgettable. We specialize in weddings, corporate events, and grand celebrations.
                    </p>
                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social, idx) => (
                            <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:scale-110 hover:bg-[#fdc62e] hover:text-white transition-all duration-300">
                                {/* Simple SVG Placeholder for icons */}
                                <span className="text-xs font-bold">{social[0]}</span> 
                            </a>
                        ))}
                    </div>
                </div>

                {/* 2. Quick Links */}
                <div>
                    <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Quick Links</h2>
                    <ul className="space-y-3 text-sm">
                        {['Home', 'Upcoming Events', 'Completed Projects', 'Gallery', 'FAQ'].map((link) => (
                            <li key={link}>
                                <a href="#" className="hover:text-[#fdc62e] hover:translate-x-1 duration-300 inline-block">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Contact Info */}
                <div>
                    <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h2>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <span className="text-[#fdc62e] text-lg">📍</span>
                            <span>{"kakinada(533005),"} <br/> andhra pradesh</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#fdc62e] text-lg">📞</span>
                            <span>+91 9542303831</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#fdc62e] text-lg">✉️</span>
                            <span>v2liveevents@gmail.com</span>
                        </li>
                    </ul>
                </div>

                {/* 4. Newsletter */}
                {/* <div>
                    <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Newsletter</h2>
                    <p className="text-sm mb-4 opacity-80">Subscribe to get the latest updates and offers.</p>
                    <div className="flex flex-col gap-3">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fdc62e]"
                        />
                        <button className="bg-[#fdc62e] text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-500/30">
                            Subscribe
                        </button>
                    </div>
                </div> */}

            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-gray-300 dark:border-gray-800 mt-12 pt-8 text-center text-sm opacity-60">
                <p>&copy; 2025 V2 Events. All rights reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;