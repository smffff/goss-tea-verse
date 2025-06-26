
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { WalletProvider } from '@/components/WalletProvider';
import { AuthProvider } from '@/hooks/useAuth';
import { SecurityProvider } from '@/components/SecurityProvider';
import Landing from '@/pages/Landing';
import Admin from '@/pages/Admin';
import LaunchReadyBanner from '@/components/launch/LaunchReadyBanner';
import DevelopmentRoutes from '@/components/development/DevelopmentRoutes';
import FeatureFlagProvider from '@/contexts/FeatureFlagContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const isProduction = window.location.hostname !== 'localhost';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const hasBetaAccess = localStorage.getItem('ctea-beta-access') === 'granted';
  
  // Feature flags for gradual rollout
  const enableDevelopmentRoutes = isDevelopment || localStorage.getItem('ENABLE_DEV_ROUTES') === 'true';
  const enableStagingFeatures = localStorage.getItem('ENABLE_STAGING_FEATURES') === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      <SecurityProvider>
        <WalletProvider>
          <AuthProvider>
            <FeatureFlagProvider>
              <Router>
                <div className="min-h-screen bg-black">
                  {isProduction && <LaunchReadyBanner />}
                  
                  <Routes>
                    {/* Production Route - Always show landing for Beta 1.2 */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/admin" element={<Admin />} />
                    
                    {/* Development/Staging Routes - Only available with flags */}
                    {(enableDevelopmentRoutes || enableStagingFeatures || hasBetaAccess) && (
                      <Route path="/dev/*" element={<DevelopmentRoutes />} />
                    )}
                    
                    {/* All other routes redirect to landing for Beta 1.2 */}
                    <Route path="*" element={<Landing />} />
                  </Routes>
                  
                  <Toaster />
                </div>
              </Router>
            </FeatureFlagProvider>
          </AuthProvider>
        </WalletProvider>
      </SecurityProvider>
    </QueryClientProvider>
  );
};

export default App;
