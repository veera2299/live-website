import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
import New_event from './pages/New_event';
import Dashboard from './pages/Dashboard';
import Modify_events from './pages/modify_events';
import Events from './pages/Events';
import Settings from './pages/Settings';

// Components
import Sidenav from './components/Sidenav';
import Topnav from './components/Topnav';
import LoginPopup from './components/LoginPopup'; // 1. IMPORT THE COMPONENT

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 2. STATE FOR LOGIN POPUP
  const [isLoginOpen, setIsLoginOpen] = useState(false);


  // 1. ADD AUTH STATE
  // Check if a token exists in localStorage (simple persistence)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on initial load
  // useEffect(() => {
  //   const token = localStorage.getItem('token'); // Or however you store your JWT
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // Function to handle actual login (pass this to LoginPopup later)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false); // Close popup
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // 1. Outer Container: Fixed height (screen), hidden overflow to prevent double scrollbars
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden relative">
      
      {/* 3. LOGIN POPUP COMPONENT */}
      {/* Placed here so it overlays everything (z-50 is in the popup code) */}
      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess} // You'll need to update LoginPopup to use this
      />

      {/* Sidebar - Fixed to left */}
      <div className={`
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
         <Sidenav onClose={toggleSidebar} />
      </div>

      {/* Mobile Overlay for Sidebar */}
      {isSidebarOpen && (
        <div 
           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
           onClick={toggleSidebar}
        ></div>
      )}

      {/* 2. Content Wrapper: Flex column to stack Topnav and Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative w-full">
        
        {/* Pass the login trigger to Topnav so you can add a button there */}
        <Topnav 
          toggleSidebar={toggleSidebar} 
          onOpenLogin={() => setIsLoginOpen(true)} 
          isLoggedIn={isLoggedIn}
        />

        {/* 3. SCROLLABLE AREA */}
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