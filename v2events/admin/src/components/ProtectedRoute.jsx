import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, onOpenLogin, children }) => {
  
  useEffect(() => {
    if (!isLoggedIn) {
      // If user tries to access this page but isn't logged in, open the popup
      onOpenLogin();
    }
  }, [isLoggedIn, onOpenLogin]);

  if (!isLoggedIn) {
    // Redirect them to the Dashboard (or Home) immediately
    return <Navigate to="/" replace />;
  }

  // If logged in, show the protected page
  return children;
};

export default ProtectedRoute;