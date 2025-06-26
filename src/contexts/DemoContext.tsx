
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { betaCodeService } from '@/services/betaCodeService';

interface DemoContextType {
  isDemoMode: boolean;
  isPreviewMode: boolean;
  enableDemo: () => void;
  enablePreview: () => void;
  exitDemo: () => void;
  getDemoWatermark: () => string;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

interface DemoProviderProps {
  children: ReactNode;
}

export const DemoProvider: React.FC<DemoProviderProps> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // Check if user is in demo mode on load
    setIsDemoMode(betaCodeService.isDemoMode());
    
    // Check for demo URL parameters
    if (betaCodeService.checkDemoParams()) {
      enablePreview();
    }
  }, []);

  const enableDemo = () => {
    betaCodeService.enableDemoMode();
    setIsDemoMode(true);
    setIsPreviewMode(false);
  };

  const enablePreview = () => {
    setIsPreviewMode(true);
    setIsDemoMode(false);
  };

  const exitDemo = () => {
    if (isDemoMode) {
      betaCodeService.clearAccess();
      setIsDemoMode(false);
    }
    setIsPreviewMode(false);
    // Redirect to landing page
    window.location.href = '/';
  };

  const getDemoWatermark = (): string => {
    if (isDemoMode) return 'Demo Mode';
    if (isPreviewMode) return 'Preview Mode';
    return '';
  };

  return (
    <DemoContext.Provider value={{
      isDemoMode,
      isPreviewMode,
      enableDemo,
      enablePreview,
      exitDemo,
      getDemoWatermark
    }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
