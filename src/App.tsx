
import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import AppProviders from '@/components/app/AppProviders';
import AppHead from '@/components/app/AppHead';
import AppRoutes from '@/components/app/AppRoutes';
import AppMonitoring from '@/components/app/AppMonitoring';

function App() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isProduction] = useState(
    process.env.NODE_ENV === 'production' || 
    window.location.hostname === 'cteanews.com'
  );

  useEffect(() => {
    // Check for existing access
    const existingAccess = localStorage.getItem('ctea-beta-access') === 'granted' ||
                          localStorage.getItem('ctea_access_method') ||
                          localStorage.getItem('ENABLE_DEV_ROUTES') === 'true';
    
    setHasAccess(existingAccess);
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  return (
    <AppProviders>
      <AppHead isProduction={isProduction} />
      <AppRoutes hasAccess={hasAccess} onAccessGranted={handleAccessGranted} />
      <Toaster />
      <AppMonitoring isProduction={isProduction} />
    </AppProviders>
  );
}

export default App;
