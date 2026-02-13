import React from 'react';
import v2_logo from "../../src/assets/v2_logo_2.png"; 
// 1. Import real icons
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-200 mt-20 relative overflow-hidden">
        
        {/* Decoration Line (Gold) */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#fdc62e] to-transparent opacity-70"></div>

        <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                
                {/* 1. BRAND SECTION (Matched to Navbar) */}
                <div className="space-y-6">
                    {/* Logo & Text Block */}
                    <a href="/#" className='group flex items-center gap-3 w-fit'>
                        {/* Fixed: Logo height/weight matches Navbar */}
                        <img 
                            className='w-10 md:w-12 drop-shadow-sm transition-transform duration-300 group-hover:scale-105' 
                            src={v2_logo} 
                            alt="V2 Events Logo" 
                        />
                        <div className='flex flex-col leading-none justify-center'>
                            <p className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold tracking-wide text-gray-800 dark:text-gray-100 group-hover:text-[#fdc62e] transition-colors">
                                V2 Events
                            </p>
                            <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] text-gray-500 uppercase ml-0.5 group-hover:text-[#fdc62e]/80 transition-colors">
                                Making Memories
                            </span>
                        </div>
                    </a>

                    <p className="text-sm opacity-80 leading-relaxed max-w-xs">
                        Making your special moments unforgettable. We specialize in weddings, corporate events, and grand celebrations.
                    </p>

                    {/* Social Icons (Replaced F I T L with real icons) */}
                    <div className="flex gap-4">
                        {[
                            { icon: <Facebook size={18} />, href: "#" },
                            { icon: <Instagram size={18} />, href: "#" },
                            { icon: <Twitter size={18} />, href: "#" },
                            { icon: <Linkedin size={18} />, href: "#" }
                        ].map((social, idx) => (
                            <a 
                                key={idx} 
                                href={social.href} 
                                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:scale-110 hover:bg-[#fdc62e] hover:text-white transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* 2. QUICK LINKS */}
                <div>
                    <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white font-['Playfair_Display'] tracking-wide">Quick Links</h2>
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

                {/* 3. CONTACT INFO */}
                <div>
                    <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white font-['Playfair_Display'] tracking-wide">Contact Us</h2>
                    <ul className="space-y-4 text-sm">
                        
                        {/* Address */}
                        <li className="flex items-start gap-3">
                            <MapPin size={20} className="text-[#fdc62e] mt-0.5" />
                            <span className="opacity-90">{"Kakinada (533005),"} <br/> Andhra Pradesh</span>
                        </li>

                        {/* Phone - Click to Dial */}
                        <li className="flex items-center gap-3">
                            <Phone size={20} className="text-[#fdc62e]" />
                            <a 
                                href="tel:+919542303831" 
                                className="hover:text-[#fdc62e] transition-colors duration-300 font-medium"
                                title="Call Us"
                            >
                                +91 9542303831
                            </a>
                        </li>

                        {/* Email - Click to Send */}
                        <li className="flex items-center gap-3">
                            <Mail size={20} className="text-[#fdc62e]" />
                            <a 
                                href="mailto:v2liveevents@gmail.com" 
                                className="hover:text-[#fdc62e] transition-colors duration-300 font-medium"
                                title="Send Email"
                            >
                                v2liveevents@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>

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