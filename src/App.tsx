
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { WalletProvider } from '@/components/WalletProvider';
import { AuthProvider } from '@/hooks/useAuth';
import { SecurityProvider } from '@/components/SecurityProvider';
import FeatureFlagProvider from '@/contexts/FeatureFlagContext';
import EnhancedMainApp from '@/components/beta/EnhancedMainApp';
import Admin from '@/pages/Admin';
import LaunchReadyBanner from '@/components/launch/LaunchReadyBanner';

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
                    {/* Main App Route - Enhanced Access Control */}
                    <Route path="/" element={<EnhancedMainApp />} />
                    
                    {/* Admin Route */}
                    <Route path="/admin" element={<Admin />} />
                    
                    {/* All other routes redirect to main app */}
                    <Route path="*" element={<EnhancedMainApp />} />
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
