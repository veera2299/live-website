import React from 'react';
// 1. Import useLocation and Link for routing logic
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  Edit, 
  List, 
  Settings, 
  LogOut,
  X 
} from 'lucide-react';

const Sidenav = ({ onClose }) => {
  // 2. Get the current URL location
  const location = useLocation();

  // Helper to determine styling
  const getLinkClasses = (active = false) => {
    const baseClasses = "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group";
    const activeClasses = "bg-indigo-700 text-white";
    const inactiveClasses = "text-gray-400 hover:bg-gray-800 hover:text-white";
    return `${baseClasses} ${active ? activeClasses : inactiveClasses}`;
  };

  return (
    <aside className="w-64 bg-gray-900 h-screen flex flex-col shrink-0 transition-all duration-300 z-50">
      
      {/* Header: Logo + Close Button */}
      <div className="h-16 flex items-center justify-between px-6 bg-gray-900 text-white font-bold text-xl shadow-sm z-20">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-indigo-600 rounded-md">
            <LayoutDashboard size={20} className="text-white"/>
          </div>
          <span>Admin Panel</span>
        </div>

        <button 
          onClick={onClose} 
          className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide font-medium">
        
        {/* 3. Logic: Compare location.pathname with the link's path */}
        
        {/* Dashboard */}
        <Link to="/" className={getLinkClasses(location.pathname === '/')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        
        {/* Add New Event */}
        <Link 
          to="/new_event" 
          className={getLinkClasses(location.pathname === '/new_event')}
        >
          <CalendarPlus size={20} />
          <span>Add new event</span>
        </Link>

        {/* Modify Events */}
        <Link 
          to="/modify_events" 
          className={getLinkClasses(location.pathname === '/modify_events')}
        >
          <Edit size={20} />
          <span>Modify events</span>
        </Link>

        {/* All Events */}
        <Link 
          to="/all_events" 
          className={getLinkClasses(location.pathname === '/all_events')}
        >
          <List size={20} />
          <span>All events</span>
        </Link>

        <div className="pt-6 pb-2">
          <hr className="border-gray-700" />
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-4 mb-2 px-2">System</p>
        </div>

         <Link to="/settings" className={getLinkClasses(location.pathname === '/settings')}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidenav;