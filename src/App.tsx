
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
    // Check for existing access - ensure boolean values only with strict equality
    const betaAccess = localStorage.getItem('ctea-beta-access') === 'granted';
    const accessMethod = localStorage.getItem('ctea_access_method') !== null;
    const devRoutes = localStorage.getItem('ENABLE_DEV_ROUTES') === 'true';
    
    const existingAccess = Boolean(betaAccess || accessMethod || devRoutes);
    console.log('Access check:', { betaAccess, accessMethod, devRoutes, existingAccess });
    
    setHasAccess(existingAccess);
  }, []);

  const handleAccessGranted = () => {
    console.log('Access granted');
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
