
import React, { useEffect } from 'react';
import { useAccessControl } from '../../access/AccessControlProvider';
import { logError, getRandomErrorMessage } from '@/utils/errorUtils';
import { secureLog } from '@/utils/secureLogging';
import type { AccessLevel } from '../../access/AccessControlProvider';

interface AppInitializerProps {
  onInitialized: () => void;
  onError: (error: string) => void;
  onLoadingSteps: (steps: number) => void;
}

export const AppInitializer: React.FC<AppInitializerProps> = ({
  onInitialized,
  onError,
  onLoadingSteps
}) => {
  const { setAccessLevel } = useAccessControl();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        secureLog.info('🚀 Starting CTea app initialization...');
        onLoadingSteps(1);
        
        // Check for existing access
        const savedLevel = localStorage.getItem('ctea-access-level') as AccessLevel;
        const betaAccess = localStorage.getItem('ctea-beta-access');
        const demoMode = localStorage.getItem('ctea-demo-mode');
        
        secureLog.info('📱 Found existing storage:', { savedLevel, betaAccess, demoMode });
        
        onLoadingSteps(2);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Determine initial access level
        if (savedLevel && ['guest', 'authenticated', 'beta', 'admin'].includes(savedLevel)) {
          secureLog.info('✅ Using saved access level:', savedLevel);
          setAccessLevel(savedLevel);
        } else if (betaAccess || demoMode) {
          secureLog.info('🔄 Upgrading to beta access from legacy storage');
          setAccessLevel('beta');
        } else {
          secureLog.info('🆕 No existing access found, defaulting to guest');
          setAccessLevel('guest');
        }
        
        onLoadingSteps(3);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        secureLog.info('✅ App initialization complete');
        onInitialized();
      } catch (error) {
        secureLog.error('💥 App initialization error:', error);
        logError(error, 'App initialization');
        onError(getRandomErrorMessage());
      }
    };

    initializeApp();
  }, [setAccessLevel, onInitialized, onError, onLoadingSteps]);

  return null;
};
