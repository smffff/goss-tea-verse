
import React, { useEffect } from 'react';
import { useAccessControl } from '../../access/AccessControlProvider';
import { logError, getRandomErrorMessage } from '@/utils/errorUtils';
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
        console.log('🚀 Starting CTea app initialization...');
        onLoadingSteps(1);
        
        // Check for existing access
        const savedLevel = localStorage.getItem('ctea-access-level') as AccessLevel;
        const betaAccess = localStorage.getItem('ctea-beta-access');
        const demoMode = localStorage.getItem('ctea-demo-mode');
        
        console.log('📱 Found existing storage:', { savedLevel, betaAccess, demoMode });
        
        onLoadingSteps(2);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Determine initial access level
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
        
        onLoadingSteps(3);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('✅ App initialization complete');
        onInitialized();
      } catch (error) {
        console.error('💥 App initialization error:', error);
        logError(error, 'App initialization');
        onError(getRandomErrorMessage());
      }
    };

    initializeApp();
  }, [setAccessLevel, onInitialized, onError, onLoadingSteps]);

  return null;
};
