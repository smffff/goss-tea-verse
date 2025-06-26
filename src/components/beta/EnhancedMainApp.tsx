
import React, { useState, useEffect } from 'react';
import EnhancedAccessGateway from '../access/EnhancedAccessGateway';
import LiveTeaApp from './LiveTeaApp';
import SneakPeekApp from './SneakPeekApp';
import AdminDashboard from '../admin/AdminDashboard';
import SneakPeekTimer from '../access/SneakPeekTimer';
import VersionTracker from '../access/VersionTracker';
import { AccessControlProvider, useAccessControl } from '../access/AccessControlProvider';
import type { AccessLevel } from '../access/AccessControlProvider';

const EnhancedMainAppContent: React.FC = () => {
  const { accessLevel, setAccessLevel, upgradeAccess } = useAccessControl();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing access on mount
    const savedLevel = localStorage.getItem('ctea-access-level') as AccessLevel;
    const betaAccess = localStorage.getItem('ctea-beta-access');
    const demoMode = localStorage.getItem('ctea-demo-mode');
    
    // Determine initial access level
    if (savedLevel) {
      setAccessLevel(savedLevel);
    } else if (betaAccess || demoMode) {
      setAccessLevel('beta');
    }
    
    setIsLoading(false);
  }, [setAccessLevel]);

  const handleAccessGranted = (level: AccessLevel) => {
    setAccessLevel(level);
  };

  const handleLogout = () => {
    localStorage.removeItem('ctea-beta-access');
    localStorage.removeItem('ctea-demo-mode');
    localStorage.removeItem('ctea-beta-code');
    localStorage.removeItem('ctea-access-level');
    localStorage.removeItem('ctea-peek-start');
    setAccessLevel('guest');
  };

  const handleTimeExpired = () => {
    setAccessLevel('guest');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show access gateway if no access
  if (accessLevel === 'guest' && !localStorage.getItem('ctea-peek-start')) {
    return <EnhancedAccessGateway onAccessGranted={handleAccessGranted} />;
  }

  // Show sneak peek mode
  if (accessLevel === 'guest') {
    return (
      <>
        <SneakPeekTimer 
          onTimeExpired={handleTimeExpired}
          onUpgrade={upgradeAccess}
        />
        <SneakPeekApp onUpgrade={upgradeAccess} />
        <VersionTracker />
      </>
    );
  }

  // Show admin dashboard
  if (accessLevel === 'admin') {
    return (
      <>
        <AdminDashboard onLogout={handleLogout} />
        <VersionTracker />
      </>
    );
  }

  // Show full app for authenticated/beta users
  return (
    <>
      <LiveTeaApp onLogout={handleLogout} />
      <VersionTracker />
    </>
  );
};

const EnhancedMainApp: React.FC = () => {
  return (
    <AccessControlProvider>
      <EnhancedMainAppContent />
    </AccessControlProvider>
  );
};

export default EnhancedMainApp;
