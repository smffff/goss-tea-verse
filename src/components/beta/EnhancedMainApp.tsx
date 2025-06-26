
import React, { useState } from 'react';
import { SecurityAuditProvider } from '../security/SecurityAuditProvider';
import EnhancedSecurityMonitor from '../security/EnhancedSecurityMonitor';
import { AccessControlProvider, useAccessControl } from '../access/AccessControlProvider';
import { logError } from '@/utils/errorUtils';
import { AppInitializer } from './components/AppInitializer';
import { LoadingScreen } from './components/LoadingScreen';
import { AppRenderer } from './components/AppRenderer';
import { AppTimeouts } from './components/AppTimeouts';
import type { AccessLevel } from '../access/AccessControlProvider';

const EnhancedMainAppContent: React.FC = () => {
  const { accessLevel, setAccessLevel } = useAccessControl();
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [showEmergencyAccess, setShowEmergencyAccess] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState(0);

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

  const handleInitialized = () => {
    setIsLoading(false);
  };

  const handleInitError = (error: string) => {
    setInitError(error);
    setIsLoading(false);
  };

  const handleEmergencyTimeout = () => {
    setShowEmergencyAccess(true);
  };

  const handleForceTimeout = (error: string) => {
    setInitError(error);
    setIsLoading(false);
  };

  // Show loading state with emergency options
  if (isLoading) {
    return (
      <>
        <AppInitializer
          onInitialized={handleInitialized}
          onError={handleInitError}
          onLoadingSteps={setLoadingSteps}
        />
        <AppTimeouts
          isLoading={isLoading}
          onEmergencyTimeout={handleEmergencyTimeout}
          onForceTimeout={handleForceTimeout}
        />
        <LoadingScreen
          loadingSteps={loadingSteps}
          showEmergencyAccess={showEmergencyAccess}
          initError={initError}
          onEmergencyAccess={handleEmergencyAccess}
          onForceRefresh={handleForceRefresh}
        />
      </>
    );
  }

  return (
    <AppRenderer
      accessLevel={accessLevel}
      onAccessGranted={handleAccessGranted}
      onLogout={handleLogout}
      onTimeExpired={handleTimeExpired}
    />
  );
};

const EnhancedMainApp: React.FC = () => {
  console.log('🏁 EnhancedMainApp wrapper rendering');
  return (
    <SecurityAuditProvider>
      <AccessControlProvider>
        <EnhancedMainAppContent />
        <EnhancedSecurityMonitor />
      </AccessControlProvider>
    </SecurityAuditProvider>
  );
};

export default EnhancedMainApp;
