import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuthProvider';
import { useAccessControl } from '@/components/access/AccessControlProvider';
import LandingPage from '@/components/LandingPage';
import TeaFeed from '@/components/TeaFeed';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const MainApp: React.FC = () => {
  const { loading: authLoading, user } = useAuth();
  const { accessLevel, isBeta } = useAccessControl();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Wait for auth to load, then check access
    if (!authLoading) {
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 500); // Small delay to ensure smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [authLoading]);

  // Show loading spinner while initializing
  if (authLoading || isInitializing) {
    return <LoadingSpinner />;
  }

  // Show landing page if no access
  if (!isBeta && !user) {
    return <LandingPage />;
  }

  // Show main tea feed
  return <TeaFeed />;
};

export default MainApp; 