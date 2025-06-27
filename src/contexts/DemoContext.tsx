
import React, { createContext, useContext, useState, useEffect } from 'react';
import { betaCodeService } from '@/services/betaCodeService';

interface DemoContextType {
  isDemoMode: boolean;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export const useDemoMode = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoProvider');
  }
  return context;
};

interface DemoProviderProps {
  children: React.ReactNode;
}

export const DemoProvider: React.FC<DemoProviderProps> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check if demo mode is enabled
    const demoModeEnabled = betaCodeService.isDemoMode();
    setIsDemoMode(demoModeEnabled);

    // Check URL parameters for demo mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true') {
      betaCodeService.enableDemoMode();
      setIsDemoMode(true);
    }
  }, []);

  const enableDemoMode = () => {
    betaCodeService.enableDemoMode();
    setIsDemoMode(true);
  };

  const disableDemoMode = () => {
    betaCodeService.clearAccess();
    setIsDemoMode(false);
  };

  const value: DemoContextType = {
    isDemoMode,
    enableDemoMode,
    disableDemoMode
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};
