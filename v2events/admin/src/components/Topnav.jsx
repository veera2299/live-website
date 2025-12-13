import React from 'react';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';

const Topnav = ({ toggleSidebar }) => {
  return (
    // Header Container: fixed height, white bg, border bottom, flex row
    <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6 z-10 relative">
      
      {/* Left Side: Sidebar Toggle & Search */}
      <div className="flex items-center space-x-4">
        {/* Hamburger button - could trigger sidebar visibility on mobile */}
        <button 
          onClick={toggleSidebar} 
          className="text-gray-500 hover:bg-gray-100 p-2 rounded-full focus:outline-none lg:hidden"
        >
          <Menu size={24} />
        </button>
        
        {/* Optional Search Bar */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 w-96 border focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
           <Search size={18} className="text-gray-400 mr-3" />
           <input 
             type="text" 
             placeholder="Search events..." 
             className="bg-transparent border-none focus:outline-none w-full text-sm text-gray-600"
           />
        </div>
      </div>


      {/* Right Side: Notifications & User Profile */}
      <div className="flex items-center space-x-6">
        
        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-gray-600 p-1 transition-colors">
          <Bell size={22} />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"></span>
        </button>

        {/* User Profile Dropdown Trigger */}
        <div className="relative">
            <button className="flex items-center space-x-3 focus:outline-none group">
                {/* Avatar Placeholder */}
                <img 
                  className="h-9 w-9 rounded-full object-cover border-2 border-gray-200 group-hover:border-indigo-400 transition-all" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User avatar" 
                />
                <div className="hidden md:flex flex-col items-start text-sm">
                    <span className="font-semibold text-gray-700 line-clamp-1">Admin User</span>
                    <span className="text-xs text-gray-500">Administrator</span>
                </div>
                <ChevronDown size={16} className="text-gray-300 group-hover:text-gray-500 hidden md:block" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Topnav;