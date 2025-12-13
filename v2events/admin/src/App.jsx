import React, { useState } from 'react';

import New_event from './pages/New_event';
import Sidenav from './components/Sidenav';
import Topnav from './components/Topnav';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Modify_events from './pages/modify_events';
import Events from './pages/Events';
import Settings from './pages/Settings';
import Login from './components/Login';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
  
    // 1. Outer Container: Fixed height (screen), hidden overflow to prevent double scrollbars
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* Sidebar - Fixed to left */}
      <div className={`
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
         <Sidenav onClose={toggleSidebar} />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
           onClick={toggleSidebar}
        ></div>
      )}

      {/* 2. Content Wrapper: Flex column to stack Topnav and Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative w-full">
        
        <Topnav toggleSidebar={toggleSidebar} />

        {/* 3. SCROLLABLE AREA */}
        {/* 'overflow-y-auto' allows this specific section to scroll independently */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
           <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/new_event' element={<New_event/>} />
            <Route path='/modify_events' element={<Modify_events/>} />
            <Route path='/all_events' element={<Events/>} />
            <Route path='/settings' element={<Settings/>} />
            
           </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;