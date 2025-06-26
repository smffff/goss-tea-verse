
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuthProvider';
import EnhancedBetaGate from '@/components/beta/EnhancedBetaGate';
import ConsolidatedApp from '@/components/ConsolidatedApp';
import LaunchStatus from './LaunchStatus';

const LaunchReadyApp: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Check for beta access
    const betaAccess = localStorage.getItem('ctea-beta-access');
    setHasAccess(!!betaAccess);
    setIsLoading(false);
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ctea-teal/30 border-t-ctea-teal rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return <EnhancedBetaGate onAccessGranted={handleAccessGranted} />;
  }

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50">
        <LaunchStatus 
          status="beta" 
          userCount={342} 
          spillCount={1247} 
        />
      </div>
      <ConsolidatedApp onAccessGranted={handleAccessGranted} />
    </div>
  );
};

export default LaunchReadyApp;
