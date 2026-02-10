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

const logoutHandler = () => {
  if (window.confirm("Do you want to logout?")) {
    localStorage.removeItem('token');
    window.location.reload();
  }
}

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
            <LayoutDashboard size={20} className="text-white" />
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

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto font-medium [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {/* 3. Logic: Compare location.pathname with the link's path */}

        {/* Dashboard */}
        <Link to="/admin" className={getLinkClasses(location.pathname === '/admin')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {/* Add New Event */}
        <Link
          to="/admin/new_event"
          className={getLinkClasses(location.pathname === '/admin/new_event')}
        >
          <CalendarPlus size={20} />
          <span>Add new event</span>
        </Link>

        {/* Modify Events */}
        <Link
          to="/admin/modify_events"
          className={getLinkClasses(location.pathname === '/admin/modify_events')}
        >
          <Edit size={20} />
          <span>Modify events</span>
        </Link>

        {/* Guest Book */}
        <Link
          to="/admin/guestbook"
          className={getLinkClasses(location.pathname === '/admin/guestbook')}
        >
          <Edit size={20} />
          <span>Guest Book Messages</span>
        </Link>

        {/* All Events */}
        <Link
          to="/admin/all_events"
          className={getLinkClasses(location.pathname === '/admin/all_events')}
        >
          <List size={20} />
          <span>All events</span>
        </Link>

        <div className="pt-6 pb-2">
          <hr className="border-gray-700" />
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-4 mb-2 px-2">System</p>
        </div>

        <Link to="/admin/settings" className={getLinkClasses(location.pathname === '/admin/settings')}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button onClick={logoutHandler} className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidenav;