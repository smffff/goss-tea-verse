
import React, { useState, useEffect } from 'react';
import CTEANewsroomLanding from '@/components/landing/CTEANewsroomLanding';
import LiveTeaApp from './LiveTeaApp';

const EnhancedMainApp: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing access
    const betaAccess = localStorage.getItem('ctea-beta-access');
    const demoMode = localStorage.getItem('ctea-demo-mode');
    
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
    localStorage.removeItem('ctea-access-level');
    setHasAccess(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🫖</div>
          <div className="w-8 h-8 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin mx-auto"></div>
          <p className="text-white mt-4">Loading CTea Newsroom...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return <CTEANewsroomLanding onAccessGranted={handleAccessGranted} />;
  }

  return <LiveTeaApp onLogout={handleLogout} />;
};

export default EnhancedMainApp;
