
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
        console.log('🚀 Starting CTea app initialization...');
        console.log('🔍 Current access level from provider:', accessLevel);
        
        // Check for existing access on mount
        const savedLevel = localStorage.getItem('ctea-access-level') as AccessLevel;
        const betaAccess = localStorage.getItem('ctea-beta-access');
        const demoMode = localStorage.getItem('ctea-demo-mode');
        const peekStart = localStorage.getItem('ctea-peek-start');
        
        console.log('📱 Found existing storage:', { 
          savedLevel, 
          betaAccess, 
          demoMode, 
          peekStart,
          currentAccessLevel: accessLevel 
        });
        
        // Determine initial access level with validation
        if (savedLevel && ['guest', 'authenticated', 'beta', 'admin'].includes(savedLevel)) {
          console.log('✅ Using saved access level:', savedLevel);
          setAccessLevel(savedLevel);
        } else if (betaAccess || demoMode) {
          console.log('🔄 Upgrading to beta access from legacy storage');
          setAccessLevel('beta');
        } else {
          console.log('🆕 No existing access found, defaulting to guest');
          setAccessLevel('guest');
        }
        
        // Add a reasonable delay to prevent flash and allow React to settle
        console.log('⏳ Waiting for app to settle...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('✅ App initialization complete, hiding loading screen');
        setIsLoading(false);
      } catch (error) {
        console.error('💥 App initialization error:', error);
        logError(error, 'EnhancedMainApp initialization');
        setInitError('Oops! Give me a min I\'m not a dev I\'m just a lady ok 💅');
        setIsLoading(false);
      }
    };

    // Add timeout protection
    const initTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('⚠️ App initialization taking too long, forcing load');
        setInitError('This is taking longer than my patience allows... forcing load 🙄');
        setIsLoading(false);
      }
    }, 8000); // Increased timeout

    initializeApp();

    return () => {
      console.log('🧹 Cleaning up initialization timeout');
      clearTimeout(initTimeout);
    };
  }, [setAccessLevel, isLoading]);

  const handleAccessGranted = (level: AccessLevel) => {
    console.log('✅ Access granted with level:', level);
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
        console.log(`🗑️ Removed ${key} from localStorage`);
      });
      
      setAccessLevel('guest');
    } catch (error) {
      logError(error, 'EnhancedMainApp logout');
      // Force refresh as fallback
      console.log('🔄 Logout cleanup failed, forcing page refresh');
      window.location.reload();
    }
  };

  const handleTimeExpired = () => {
    console.log('⏰ Sneak peek time expired, resetting to guest');
    try {
      localStorage.removeItem('ctea-access-level');
      localStorage.removeItem('ctea-peek-start');
      setAccessLevel('guest');
    } catch (error) {
      logError(error, 'EnhancedMainApp time expiry');
    }
  };

  console.log('🎯 Render decision - isLoading:', isLoading, 'accessLevel:', accessLevel, 'peekStart:', localStorage.getItem('ctea-peek-start'));

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
          <p className="text-xs text-gray-500 mt-2">
            If this takes forever, refresh and we'll pretend this never happened 💀
          </p>
        </div>
      </div>
    );
  }

  // Show access gateway if no access or guest without peek
  if (accessLevel === 'guest' && !localStorage.getItem('ctea-peek-start')) {
    console.log('🔐 Showing access gateway');
    return <EnhancedAccessGateway onAccessGranted={handleAccessGranted} />;
  }

  // Show sneak peek mode with timer
  if (accessLevel === 'guest' && localStorage.getItem('ctea-peek-start')) {
    console.log('👀 Showing sneak peek mode');
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
    console.log('👑 Showing admin dashboard');
    return (
      <>
        <AdminDashboard onLogout={handleLogout} />
        <VersionTracker />
      </>
    );
  }

  // Show full app for authenticated/beta users
  console.log('🎉 Showing full app for level:', accessLevel);
  return (
    <>
      <LiveTeaApp onLogout={handleLogout} />
      <VersionTracker />
    </>
  );
};

const EnhancedMainApp: React.FC = () => {
  console.log('🏁 EnhancedMainApp wrapper rendering');
  return (
    <AccessControlProvider>
      <EnhancedMainAppContent />
    </AccessControlProvider>
  );
};

export default EnhancedMainApp;
