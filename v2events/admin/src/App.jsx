import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Pages
import New_event from './pages/New_event';
import Dashboard from './pages/Dashboard';
import Modify_events from './pages/modify_events';
import Events from './pages/Events';
import Settings from './pages/Settings';

// Components
import Sidenav from './components/Sidenav';
import Topnav from './components/Topnav';
import LoginPopup from './components/LoginPopup';
import ProtectedRoute from './components/ProtectedRoute';
import Addevent from './components/Addevent';

function App() {

  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // --- NEW AUTH STATE LOGIC ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // <--- Starts as TRUE

  // Function to verify token with Backend
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      try {
        // CALL YOUR NEW BACKEND ROUTE
        // Make sure the header key ('token') matches what your middleware expects
        const response = await axios.get("http://localhost:4000/admin/verify-token", {
            headers: { token: token } 
        });

        if (response.data.success) {
            setIsLoggedIn(true);
            
        } else {
            // Token exists but is invalid/expired
            throw new Error("Invalid token");
        }
      } catch (error) {
        // If fake or expired, clean up
        console.log("Token verification failed");
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false); // Stop loading regardless of result
      }
    };

    checkAuth();
  }, []);
  // ----------------------------

  const openLogin = () => setIsLoginOpen(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    navigate('/admin');

    // No need to reload, state update handles it
  };

  // 1. SHOW LOADING SCREEN WHILE CHECKING
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden relative">
      
      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* Sidebar */}
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

      <div className="flex-1 flex flex-col overflow-hidden relative w-full">
        
        <Topnav 
          toggleSidebar={toggleSidebar} 
          onOpenLogin={openLogin} 
          isLoggedIn={isLoggedIn}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
           <Routes>
            <Route path='/admin' element={<Dashboard/>} />

            {/* PROTECTED ROUTES */}
            <Route path='/admin/new_event' element={
                <ProtectedRoute isLoggedIn={isLoggedIn} onOpenLogin={openLogin}>
                    <New_event/>
                </ProtectedRoute>
            } />

            <Route path='/admin/modify_events' element={
                <ProtectedRoute isLoggedIn={isLoggedIn} onOpenLogin={openLogin}>
                    <Modify_events/>
                </ProtectedRoute>
            } />

            <Route path='/admin/all_events' element={
                <ProtectedRoute isLoggedIn={isLoggedIn} onOpenLogin={openLogin}>
                    <Events/>
                </ProtectedRoute>
            } />

            <Route path='/admin/settings' element={
                <ProtectedRoute isLoggedIn={isLoggedIn} onOpenLogin={openLogin}>
                    <Settings/>
                </ProtectedRoute>
            } />

            <Route path='/admin/all-events/:eventId' element={
                <ProtectedRoute isLoggedIn={isLoggedIn} onOpenLogin={openLogin}>
                    <Addevent />
                </ProtectedRoute>
            } />
            
           </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;