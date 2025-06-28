
import React from 'react';
import { useLocation } from 'react-router-dom';
import Landing from '@/pages/Landing';

const MainApp: React.FC = () => {
  const location = useLocation();
  
  // Always show the new polished landing page for the root route
  if (location.pathname === '/') {
    return <Landing />;
  }
  
  // For other routes, return null to let the router handle them
  return null;
};

export default MainApp;
