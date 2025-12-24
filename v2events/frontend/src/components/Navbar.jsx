import React, { useState } from 'react';
import v2_logo from '../../src/assets/v2_logo.png';

// SVG Icons to avoid installing external libraries like react-icons
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-white relative z-50'>
            <div className='py-4 px-4 md:px-15'> {/* Adjusted padding for mobile */}
                <div className='flex items-center justify-between'>
                    
                    {/* Logo Section */}
                    <a href="/#" className='text-primary font-semibold tracking-widest flex gap-2 text-3xl sm:text-3xl items-center'>
                        <img className='w-12' src={v2_logo} alt="Logo" />
                        <p>V2 Events</p>
                    </a>

                    {/* Desktop Menu (Hidden on Mobile) */}
                    <div className='hidden lg:block'>
                        <ul className='flex items-center gap-4'>
                            {menuLinks.map((item) => (
                                <li key={item.id}>
                                    <a
                                        className='text-xl inline-block px-4 font-semibold text-gray-500 hover:text-black duration-200'
                                        href={item.link}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Hamburger Button (Visible on Mobile) */}
                    <div className='lg:hidden block'>
                        <button onClick={toggleMenu} className='text-gray-500 hover:text-black focus:outline-none'>
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar & Overlay */}
            <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                
                {/* Dark Overlay (Click to close) */}
                <div className="absolute inset-0 bg-black/50" onClick={toggleMenu}></div>

                {/* Sidebar Container */}
                <div className={`relative w-[75%] sm:w-[50%] h-full bg-white shadow-xl flex flex-col p-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    
                    {/* Close Button */}
                    <div className="flex justify-end mb-8">
                        <button onClick={toggleMenu} className="text-gray-500 hover:text-black">
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Mobile Menu Links */}
                    <ul className='flex flex-col gap-6'>
                        {menuLinks.map((item) => (
                            <li key={item.id}>
                                <a
                                    className='text-2xl font-semibold text-gray-600 hover:text-primary block'
                                    href={item.link}
                                    onClick={toggleMenu} // Close menu when a link is clicked
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Optional: Bottom decoration or contact info */}
                    <div className='mt-auto text-sm text-gray-400 text-center'>
                        <p>© 2025 V2 Events</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;