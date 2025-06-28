
import React, { useState, useEffect } from 'react';
import CTEANewsroomLanding from '@/components/landing/CTEANewsroomLanding';
import LiveTeaApp from './LiveTeaApp';
import SecurityMonitor from '@/components/security/SecurityMonitor';
import { useAuth } from '@/hooks/useAuthProvider';

const EnhancedMainApp: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    // Don't check access until auth is loaded
    if (authLoading) return;
    
    // Check for existing access
    const betaAccess = localStorage.getItem('ctea-beta-access');
    const demoMode = localStorage.getItem('ctea-demo-mode');
    
    setHasAccess(!!(betaAccess || demoMode));
    setIsLoading(false);
  }, [authLoading]);

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

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🫖</div>
          <div className="w-8 h-8 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin mx-auto"></div>
          <p className="text-white mt-4 font-medium">Brewing your CTea experience...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SecurityMonitor />
      {!hasAccess ? (
        <CTEANewsroomLanding onAccessGranted={handleAccessGranted} />
      ) : (
        <LiveTeaApp onLogout={handleLogout} />
      )}
    </>
  );
};

export default EnhancedMainApp;
