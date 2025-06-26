
import React, { useState, useEffect } from 'react';
import EnhancedAccessGateway from '../access/EnhancedAccessGateway';
import LiveTeaApp from './LiveTeaApp';
import SneakPeekApp from './SneakPeekApp';
import AdminDashboard from '../admin/AdminDashboard';
import SneakPeekTimer from '../access/SneakPeekTimer';
import VersionTracker from '../access/VersionTracker';
import LoadingSpinner from '../LoadingSpinner';
import { AccessControlProvider, useAccessControl } from '../access/AccessControlProvider';
import { logError, getRandomLoadingMessage, getRandomErrorMessage } from '@/utils/errorUtils';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Coffee, RefreshCw } from 'lucide-react';
import type { AccessLevel } from '../access/AccessControlProvider';

const EnhancedMainAppContent: React.FC = () => {
  const { accessLevel, setAccessLevel, upgradeAccess } = useAccessControl();
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [showEmergencyAccess, setShowEmergencyAccess] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Starting CTea app initialization...');
        setLoadingSteps(1);
        
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
        
        setLoadingSteps(2);
        await new Promise(resolve => setTimeout(resolve, 500));
        
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
        
        setLoadingSteps(3);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        console.log('✅ App initialization complete');
        setIsLoading(false);
      } catch (error) {
        console.error('💥 App initialization error:', error);
        logError(error, 'EnhancedMainApp initialization');
        setInitError(getRandomErrorMessage());
        setIsLoading(false);
      }
    };

    // Emergency timeout - show emergency access after 5 seconds
    const emergencyTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('⚠️ Emergency timeout triggered');
        setShowEmergencyAccess(true);
      }
    }, 5000);

    // Force timeout - stop loading after 10 seconds
    const forceTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('⚠️ Force timeout - stopping loading');
        setInitError('Loading took too long. Activating emergency access! 🚨');
        setIsLoading(false);
      }
    }, 10000);

    initializeApp();

    return () => {
      clearTimeout(emergencyTimeout);
      clearTimeout(forceTimeout);
    };
  }, [setAccessLevel]); // FIXED: Removed isLoading from dependencies to prevent infinite loop

  const handleAccessGranted = (level: AccessLevel) => {
    console.log('✅ Access granted with level:', level);
    setAccessLevel(level);
  };

  const handleLogout = () => {
    console.log('👋 Logging out...');
    try {
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

  const handleEmergencyAccess = () => {
    console.log('🚨 Emergency access activated');
    try {
      localStorage.setItem('ctea-access-level', 'beta');
      localStorage.setItem('ctea-demo-mode', 'true');
      localStorage.setItem('ctea-beta-code', 'EMERGENCY');
      setAccessLevel('beta');
      setIsLoading(false);
      setShowEmergencyAccess(false);
    } catch (error) {
      console.error('Emergency access failed:', error);
      window.location.reload();
    }
  };

  const handleForceRefresh = () => {
    console.log('🔄 Force refresh triggered');
    window.location.reload();
  };

  const getLoadingMessage = () => {
    switch (loadingSteps) {
      case 1: return "Checking your vibe... 💅";
      case 2: return "Brewing the tea... ☕";
      case 3: return "Almost ready bestie... ✨";
      default: return getRandomLoadingMessage();
    }
  };

  // Show loading state with emergency options
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <LoadingSpinner size="lg" variant="tea" message={getLoadingMessage()} />
          
          {showEmergencyAccess && (
            <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-orange-300 text-sm mb-3">
                Taking longer than my patience allows... 😤
              </p>
              <div className="space-y-2">
                <Button
                  onClick={handleEmergencyAccess}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Emergency Access (Skip This Drama)
                </Button>
                <Button
                  onClick={handleForceRefresh}
                  variant="outline"
                  className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh & Pray 🙏
                </Button>
              </div>
            </div>
          )}

          {initError && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
              <p className="text-red-400 text-sm">{initError}</p>
              <Button
                onClick={handleEmergencyAccess}
                className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white"
              >
                Access Anyway (I Don't Care Anymore)
              </Button>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-4">
            Beta life hits different but we're serving looks anyway 💅
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
