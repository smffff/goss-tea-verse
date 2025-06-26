
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuthProvider';
import { DemoProvider } from '@/contexts/DemoContext';
import { WalletProvider } from '@/components/WalletProvider';
import { CrossChainProvider } from '@/contexts/CrossChainContext';
import AppLayout from '@/components/AppLayout';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import LaunchReadyApp from '@/components/launch/LaunchReadyApp';
import DemoModeGate from '@/components/demo/DemoModeGate';
import EnhancedLandingPage from '@/components/landing/EnhancedLandingPage';
import { useAuth } from '@/hooks/useAuthProvider';
import { adminConfigService } from '@/services/adminConfigService';

function AppContent() {
  const { loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  // Check current route to determine which landing page to show
  const currentPath = window.location.pathname;
  
  // Show enhanced landing page for root route
  if (currentPath === '/') {
    // Check if user has access or should see gated landing
    const hasAccess = localStorage.getItem('ctea_access_method') || adminConfigService.shouldForceOGAccess();
    const isLaunchMode = true; // Toggle this for different modes
    
    if (!hasAccess && isLaunchMode) {
      // Show wallet-gated landing page for non-authenticated users
      return (
        <DemoModeGate>
          <EnhancedLandingPage />
        </DemoModeGate>
      );
    }
  }

  // For users with access or other routes, use LaunchReadyApp
  const isLaunchMode = true;
  
  if (isLaunchMode) {
    return (
      <DemoModeGate>
        <LaunchReadyApp />
      </DemoModeGate>
    );
  }

  return (
    <DemoModeGate>
      <AppLayout />
    </DemoModeGate>
  );
}

function App() {
  console.log('🎯 App component rendering...');
  
  // Initialize admin configuration
  React.useEffect(() => {
    adminConfigService.initializeAdmin();
  }, []);
  
  return (
    <div className="App">
      <AppErrorBoundary>
        <Router>
          <DemoProvider>
            <AuthProvider>
              <WalletProvider>
                <CrossChainProvider>
                  <AppContent />
                </CrossChainProvider>
              </WalletProvider>
            </AuthProvider>
          </DemoProvider>
        </Router>
      </AppErrorBoundary>
    </div>
  );
}

export default App;
