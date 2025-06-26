
import React from 'react';
import { AuthProvider } from '@/hooks/useAuthProvider';
import { DemoProvider } from '@/contexts/DemoContext';
import AppLayout from '@/components/AppLayout';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import LaunchReadyApp from '@/components/launch/LaunchReadyApp';
import DemoModeGate from '@/components/demo/DemoModeGate';
import { useAuth } from '@/hooks/useAuthProvider';

function AppContent() {
  const { loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  // For beta launch, use LaunchReadyApp instead of AppLayout
  const isLaunchMode = true; // Toggle this for different modes
  
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
  
  return (
    <div className="App">
      <AppErrorBoundary>
        <DemoProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </DemoProvider>
      </AppErrorBoundary>
    </div>
  );
}

export default App;
