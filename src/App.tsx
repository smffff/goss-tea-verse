
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import { AuthProvider } from '@/hooks/useAuthProvider';
import { AccessControlProvider } from '@/components/access/AccessControlProvider';
import { RevenueProvider } from '@/components/revenue/RevenueProvider';
import EnhancedMainApp from '@/components/beta/EnhancedMainApp';

function App() {
  return (
    <ErrorBoundaryWrapper componentName="App">
      <Router>
        <RevenueProvider>
          <AuthProvider>
            <AccessControlProvider>
              <EnhancedMainApp />
              <Toaster />
            </AccessControlProvider>
          </AuthProvider>
        </RevenueProvider>
      </Router>
    </ErrorBoundaryWrapper>
  );
}

export default App;
