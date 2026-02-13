import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 1. IMPORT THIS
import v2_logo from '../../src/assets/v2_logo_2.png';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const menuLinks = [
    { id: 1, name: "Home", link: "/#" },
    { id: 2, name: "Upcoming", link: "/upcoming" },
    { id: 3, name: "Completed", link: "/completed" },
    { id: 4, name: "FAQ", link: "/faq" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* --- NORMAL NAVBAR (Stays where it is) --- */}
            <nav className={`sticky top-0 z-40 w-full transition-all duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white/50 backdrop-blur-sm'
            }`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between'>
                    
                    {/* Logo */}
                    <a href="/#" className='group flex items-center gap-3'>
                        <img 
                            className='w-10 md:w-12 drop-shadow-sm transition-transform duration-300 group-hover:scale-105' 
                            src={v2_logo} 
                            alt="V2 Events Logo" 
                        />
                        <div className='flex flex-col leading-none justify-center'>
                            <p className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold tracking-wide text-gray-800 group-hover:text-amber-700 transition-colors">
                                V2 Events
                            </p>
                            <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] text-gray-500 uppercase ml-0.5 group-hover:text-amber-700 transition-colors">
                                Making Memories
                            </span>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className='hidden lg:block'>
                        <ul className='flex items-center gap-8'>
                            {menuLinks.map((item) => (
                                <li key={item.id}>
                                    <a href={item.link} className='relative text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-amber-700 transition-colors duration-300 group py-2'>
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="/contact" className="px-6 py-2 bg-gray-900 text-white text-xs tracking-widest uppercase font-medium rounded hover:bg-amber-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    Book Now
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className='lg:hidden'>
                        <button onClick={toggleMenu} className='p-2 text-gray-600 hover:text-indigo-600 focus:outline-none transition-transform active:scale-95'>
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- 2. MOBILE SIDEBAR (TELEPORTED TO BODY) --- */}
            {createPortal(
                <div className={`fixed inset-0 z-[9999] transition-opacity duration-500 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                    
                    {/* Dark Overlay */}
                    <div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                        onClick={toggleMenu}
                    ></div>

                    {/* Sidebar Drawer */}
                    <div className={`absolute inset-y-0 right-0 w-[75%] sm:w-[350px] bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.77, 0, 0.175, 1) ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                        <div className="flex flex-col h-full p-6 relative overflow-hidden">
                            
                            {/* Decorative Blob */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            {/* Header */}
                            <div className="flex justify-end mb-8 relative z-10">
                                <button onClick={toggleMenu} className="text-gray-500 hover:text-indigo-600 hover:rotate-90 transition-transform duration-300">
                                    <CloseIcon />
                                </button>
                            </div>

                            {/* Links */}
                            <ul className='flex flex-col gap-6 relative z-10'>
                                {menuLinks.map((item, index) => (
                                    <li key={item.id} 
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                        className={`transform transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                                    >
                                        <a href={item.link} onClick={toggleMenu} className='group block text-2xl font-["Playfair_Display"] text-gray-800 hover:text-indigo-600 transition-colors'>
                                            {item.name}
                                        </a>
                                        <div className="h-px bg-gray-100 mt-4 w-full"></div>
                                    </li>
                                ))}
                            </ul>

                            {/* Footer */}
                            <div className='mt-auto text-center'>
                                <p className="font-['Great_Vibes'] text-4xl text-gray-300 mb-2">V2 Events</p>
                                <p className='text-[10px] uppercase tracking-widest text-gray-400'>
                                    © 2025 All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body // This renders the menu at the very end of your HTML
            )}
        </>
    );
};

export default Navbar;