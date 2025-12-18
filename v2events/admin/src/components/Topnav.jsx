import React from 'react';
import { ChevronDown, Menu } from 'lucide-react'; // Assuming you use lucide-react or similar for icons

const Topnav = ({ toggleSidebar, onOpenLogin, isLoggedIn }) => {
  return (
    <header className="bg-white shadow-sm z-20 px-6 py-3">
      <div className="flex items-center justify-between">
        
        {/* Left: Hamburger Menu (Mobile) */}
        <button onClick={toggleSidebar} className="p-1 mr-4 lg:hidden rounded-md hover:bg-gray-100">
           <Menu size={24} />
        </button>

        {/* Search Bar or Title (Optional spacer) */}
        <div className="flex-1 "></div>

        {/* RIGHT SIDE: Conditional Logic */}
        <div className="flex items-center space-x-4">
          
          {isLoggedIn ? (
            /* ------------------ USER IS LOGGED IN ------------------ */
            <div className="relative">
              <button
                className="flex items-center space-x-3 focus:outline-none group"
                // Note: I removed onOpenLogin here because a logged-in user shouldn't open the login popup
              >
                {/* Avatar Placeholder */}
                <img 
                  className="h-9 w-9 rounded-full object-cover border-2 border-gray-200 group-hover:border-indigo-400 transition-all" 
                  src="/veera2.jpg"
                  alt="veera" 
                />
                <div className="hidden md:flex flex-col items-start text-sm">
                    <span className="font-semibold text-gray-700 line-clamp-1">V2 Events</span>
                    <span className="text-xs text-gray-500">Administrator</span>
                </div>
                <ChevronDown size={16} className="text-gray-300 group-hover:text-gray-500 hidden md:block" />
              </button>
            </div>
          ) : (
            /* ------------------ USER IS NOT LOGGED IN ------------------ */
            <button 
              onClick={onOpenLogin}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer"
            >
              Login
            </button>
          )}

        </div>
      </div>
    </header>
  );
};

export default Topnav;