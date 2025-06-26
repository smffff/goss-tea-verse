
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
            <Router>
              <div className="min-h-screen bg-black">
                {isProduction && <LaunchReadyBanner />}
                
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/admin" element={<Admin />} />
                  {/* All other routes redirect to landing for Beta 1.2 */}
                  <Route path="*" element={<Landing />} />
                </Routes>
                
                <Toaster />
              </div>
            </Router>
          </AuthProvider>
        </WalletProvider>
      </SecurityProvider>
    </QueryClientProvider>
  );
};

export default App;
