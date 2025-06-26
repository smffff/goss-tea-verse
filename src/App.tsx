
import React from 'react';
import { AuthProvider } from '@/hooks/useAuthProvider';
import AppLayout from '@/components/AppLayout';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/hooks/useAuthProvider';

function AppContent() {
  const { loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return <AppLayout />;
}

function App() {
  console.log('🎯 App component rendering...');
  
  return (
    <div className="App">
      <AppErrorBoundary>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </AppErrorBoundary>
    </div>
  );
}

export default App;
