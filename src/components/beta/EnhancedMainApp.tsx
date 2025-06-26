
import React, { useState, useEffect } from 'react';
import EnhancedAccessGateway from '../access/EnhancedAccessGateway';
import LiveTeaApp from './LiveTeaApp';
import SneakPeekApp from './SneakPeekApp';
import AdminDashboard from '../admin/AdminDashboard';
import SneakPeekTimer from '../access/SneakPeekTimer';
import VersionTracker from '../access/VersionTracker';
import LoadingSpinner from '../LoadingSpinner';
import { AccessControlProvider, useAccessControl } from '../access/AccessControlProvider';
import { logError, getRandomLoadingMessage } from '@/utils/errorUtils';
import type { AccessLevel } from '../access/AccessControlProvider';

const EnhancedMainAppContent: React.FC = () => {
  const { accessLevel, setAccessLevel, upgradeAccess } = useAccessControl();
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Initializing CTea app...');
        
        // Check for existing access on mount
        const savedLevel = localStorage.getItem('ctea-access-level') as AccessLevel;
        const betaAccess = localStorage.getItem('ctea-beta-access');
        const demoMode = localStorage.getItem('ctea-demo-mode');
        
        console.log('Found existing access:', { savedLevel, betaAccess, demoMode });
        
        // Determine initial access level with validation
        if (savedLevel && ['guest', 'authenticated', 'beta', 'admin'].includes(savedLevel)) {
          console.log('Using saved access level:', savedLevel);
          setAccessLevel(savedLevel);
        } else if (betaAccess || demoMode) {
          console.log('Upgrading to beta access from legacy storage');
          setAccessLevel('beta');
        } else {
          console.log('No existing access found, defaulting to guest');
          setAccessLevel('guest');
        }
        
        // Reasonable delay to prevent flash and allow React to settle
        await new Promise(resolve => setTimeout(resolve, 800));
        
        console.log('✅ App initialization complete');
        setIsLoading(false);
      } catch (error) {
        logError(error, 'EnhancedMainApp initialization');
        setInitError('Failed to initialize app - probably just me being dramatic 🎭');
        setIsLoading(false);
      }
    };

    // Add timeout protection
    const initTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('⚠️ App initialization taking too long, forcing load');
        setIsLoading(false);
      }
    }, 5000);

    initializeApp();

    return () => clearTimeout(initTimeout);
  }, [setAccessLevel, isLoading]);

  const handleAccessGranted = (level: AccessLevel) => {
    console.log('✅ Access granted:', level);
    setAccessLevel(level);
  };

  const handleLogout = () => {
    console.log('👋 Logging out...');
    try {
      // Clean up all access-related localStorage
      const keysToRemove = [
        'ctea-beta-access',
        'ctea-demo-mode', 
        'ctea-beta-code',
        'ctea-access-level',
        'ctea-peek-start'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      setAccessLevel('guest');
    } catch (error) {
      logError(error, 'EnhancedMainApp logout');
      // Force refresh as fallback
      window.location.reload();
    }
  };

  const handleTimeExpired = () => {
    console.log('⏰ Time expired, resetting to guest');
    try {
      localStorage.removeItem('ctea-access-level');
      localStorage.removeItem('ctea-peek-start');
      setAccessLevel('guest');
    } catch (error) {
      logError(error, 'EnhancedMainApp time expiry');
    }
  };

  // Show loading state with error fallback
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <LoadingSpinner size="lg" variant="tea" message={getRandomLoadingMessage()} />
          {initError && (
            <p className="text-red-400 text-sm mt-4 bg-red-500/10 border border-red-500/20 rounded p-3">
              {initError}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Show access gateway if no access or guest without peek
  if (accessLevel === 'guest' && !localStorage.getItem('ctea-peek-start')) {
    return <EnhancedAccessGateway onAccessGranted={handleAccessGranted} />;
  }

  // Show sneak peek mode with timer
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
