
import React, { useState, useEffect } from 'react';
import SimpleBetaLanding from './SimpleBetaLanding';
import LiveTeaApp from './LiveTeaApp';

const MainApp: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing access (beta or general access)
    const betaAccess = localStorage.getItem('ctea-beta-access');
    const demoMode = localStorage.getItem('ctea-demo-mode');
    
    // For live launch, allow demo mode or beta access
    setHasAccess(!!(betaAccess || demoMode));
    setIsLoading(false);
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('ctea-beta-access');
    localStorage.removeItem('ctea-demo-mode');
    localStorage.removeItem('ctea-beta-code');
    setHasAccess(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return <SimpleBetaLanding onAccessGranted={handleAccessGranted} />;
  }

  return <LiveTeaApp onLogout={handleLogout} />;
};

export default MainApp;
