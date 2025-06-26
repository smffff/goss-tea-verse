
import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import AppProviders from '@/components/app/AppProviders';
import AppHead from '@/components/app/AppHead';
import AppRoutes from '@/components/app/AppRoutes';
import ErrorRedirectHandler from '@/components/ErrorRedirectHandler';
import AppInitializer from '@/components/AppInitializer';

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
    const demoMode = localStorage.getItem('ctea-demo-mode') === 'true';
    
    const existingAccess = Boolean(betaAccess || accessMethod || devRoutes || demoMode);
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      secureLog.info('Access check:', { betaAccess, accessMethod, devRoutes, demoMode, existingAccess });
    }
    
    setHasAccess(existingAccess);
  }, []);

  const handleAccessGranted = () => {
    if (process.env.NODE_ENV === 'development') {
      secureLog.info('Access granted');
    }
    setHasAccess(true);
  };

  return (
    <AppProviders>
      <AppHead isProduction={isProduction} />
      <ErrorRedirectHandler>
        <AppInitializer>
          <AppRoutes hasAccess={hasAccess} onAccessGranted={handleAccessGranted} />
          <Toaster />
          {/* Only show monitoring in development */}
          {process.env.NODE_ENV === 'development' && (
            <div id="dev-monitoring" style={{ display: 'none' }}>
              {/* Development monitoring components can be added here if needed */}
            </div>
          )}
        </AppInitializer>
      </ErrorRedirectHandler>
    </AppProviders>
  );
}

export default App;
