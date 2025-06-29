import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { WalletProvider } from '@/components/WalletProvider';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import UnifiedErrorBoundary from '@/components/error/UnifiedErrorBoundary';
import EnhancedLandingPage from '@/components/landing/EnhancedLandingPage';
import SimpleApp from '@/components/SimpleApp';
import NotFound from '@/components/NotFound';

function App() {
  return (
    <UnifiedErrorBoundary 
      mode={process.env.NODE_ENV === 'development' ? 'development' : 'production'}
      componentName="App"
    >
      <ThemeProvider defaultTheme="dark" storageKey="ctea-theme">
        <WalletProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<EnhancedLandingPage />} />
                <Route path="/feed" element={<SimpleApp />} />
                <Route path="/newsroom" element={<SimpleApp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <SonnerToaster />
            </Router>
          </AuthProvider>
        </WalletProvider>
      </ThemeProvider>
    </UnifiedErrorBoundary>
  );
}

export default App;
