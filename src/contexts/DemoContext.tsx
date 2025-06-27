
import React, { createContext, useContext, useState, useEffect } from 'react';
import { betaCodeService } from '@/services/betaCodeService';

interface DemoContextType {
  isDemoMode: boolean;
  isPreviewMode: boolean;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
  exitDemo: () => void;
  getDemoWatermark: () => string;
}

const DemoContext = createContext<DemoContextType | null>(null);

export const useDemoMode = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoProvider');
  }
  return context;
};

// Add the useDemo alias for backward compatibility
export const useDemo = useDemoMode;

interface DemoProviderProps {
  children: React.ReactNode;
}

export const DemoProvider: React.FC<DemoProviderProps> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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
    if (urlParams.get('preview') === 'true') {
      setIsPreviewMode(true);
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

  const exitDemo = () => {
    betaCodeService.clearAccess();
    setIsDemoMode(false);
    setIsPreviewMode(false);
    // Remove demo/preview params from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('demo');
    url.searchParams.delete('preview');
    window.history.replaceState({}, '', url.toString());
  };

  const getDemoWatermark = () => {
    if (isDemoMode) return 'Demo Mode';
    if (isPreviewMode) return 'Preview Mode';
    return '';
  };

  const value: DemoContextType = {
    isDemoMode,
    isPreviewMode,
    enableDemoMode,
    disableDemoMode,
    exitDemo,
    getDemoWatermark
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};
