
import React, { createContext, useContext, useState, useEffect } from 'react';
import { secureLog } from '@/utils/secureLogging';

interface FeatureFlags {
  enableSOAPGating: boolean;
  enableCTeaBot: boolean;
  enableArenaIntegration: boolean;
  enableMemeOps: boolean;
  enableAdvancedAnalytics: boolean;
  enableBetaFeedback: boolean;
  enableSocialSharing: boolean;
  enableUserProgression: boolean;
}

interface FeatureFlagContextType {
  flags: FeatureFlags;
  toggleFlag: (flag: keyof FeatureFlags) => void;
  isFeatureEnabled: (flag: keyof FeatureFlags) => boolean;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

const defaultFlags: FeatureFlags = {
  enableSOAPGating: true,
  enableCTeaBot: true,
  enableArenaIntegration: false, // Will enable when webhook is ready
  enableMemeOps: true,
  enableAdvancedAnalytics: false,
  enableBetaFeedback: true,
  enableSocialSharing: true,
  enableUserProgression: false,
};

const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);

  useEffect(() => {
    // Load flags from localStorage
    const savedFlags = localStorage.getItem('ctea-feature-flags');
    if (savedFlags) {
      try {
        const parsedFlags = JSON.parse(savedFlags);
        setFlags({ ...defaultFlags, ...parsedFlags });
      } catch (error) {
        secureLog.error('Failed to parse feature flags:', error);
      }
    }
  }, []);

  const toggleFlag = (flag: keyof FeatureFlags) => {
    setFlags(prev => {
      const newFlags = { ...prev, [flag]: !prev[flag] };
      localStorage.setItem('ctea-feature-flags', JSON.stringify(newFlags));
      return newFlags;
    });
  };

  const isFeatureEnabled = (flag: keyof FeatureFlags) => {
    return flags[flag];
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, toggleFlag, isFeatureEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};

export default FeatureFlagProvider;
