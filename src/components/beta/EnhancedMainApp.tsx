
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
    const initializeApp = async () => {
      try {
        // Check for existing access on mount
        const savedLevel = localStorage.getItem('ctea-access-level') as AccessLevel;
        const betaAccess = localStorage.getItem('ctea-beta-access');
        const demoMode = localStorage.getItem('ctea-demo-mode');
        
        console.log('Initializing app with:', { savedLevel, betaAccess, demoMode });
        
        // Determine initial access level
        if (savedLevel && ['guest', 'authenticated', 'beta', 'admin'].includes(savedLevel)) {
          setAccessLevel(savedLevel);
        } else if (betaAccess || demoMode) {
          setAccessLevel('beta');
        } else {
          setAccessLevel('guest');
        }
        
        // Small delay to prevent flash
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [setAccessLevel]);

  const handleAccessGranted = (level: AccessLevel) => {
    console.log('Access granted:', level);
    setAccessLevel(level);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('ctea-beta-access');
    localStorage.removeItem('ctea-demo-mode');
    localStorage.removeItem('ctea-beta-code');
    localStorage.removeItem('ctea-access-level');
    localStorage.removeItem('ctea-peek-start');
    setAccessLevel('guest');
  };

  const handleTimeExpired = () => {
    console.log('Time expired, resetting to guest');
    localStorage.removeItem('ctea-access-level');
    localStorage.removeItem('ctea-peek-start');
    setAccessLevel('guest');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Give me a min I'm not a dev I'm just a lady ok 💅</p>
          <p className="text-gray-400 text-sm mt-2">Setting up the chaos... please stand by ✨</p>
        </div>
      </div>
    );
  }

  // Show access gateway if no access or guest without peek
  if (accessLevel === 'guest' && !localStorage.getItem('ctea-peek-start')) {
    return <EnhancedAccessGateway onAccessGranted={handleAccessGranted} />;
  }

  // Show sneak peek mode
  if (accessLevel === 'guest' && localStorage.getItem('ctea-peek-start')) {
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
