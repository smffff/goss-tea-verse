
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from '@/components/WalletProvider';
import LandingPage from '@/pages/LandingPage';
import Feed from '@/pages/Feed';
import SubmitTea from '@/pages/SubmitTea';
import Auth from '@/pages/Auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import SpillTea from '@/pages/SpillTea';

// Add new import for admin dashboard
import AdminBetaDashboard from '@/pages/admin/AdminBetaDashboard';

function App() {
  const { user, session } = useAuth();
  const [isBetaAccessGranted, setIsBetaAccessGranted] = useState(false);
  
  // Simple admin check based on user email or other criteria
  const isAdmin = user?.email === 'admin@cteanews.com' || user?.email === 'stephanie@taskbytask.net';

  useEffect(() => {
    const hasBetaAccess = localStorage.getItem('ctea-beta-access') === 'granted';
    setIsBetaAccessGranted(hasBetaAccess);
  }, [session]);

  const handleAccessGranted = () => {
    setIsBetaAccessGranted(true);
  };

  return (
    <div className="App">
      <ErrorBoundaryWrapper componentName="App">
        <WalletProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/spill" element={
                <ProtectedRoute requireVerifiedEmail={false}>
                  <SpillTea />
                </ProtectedRoute>
              } />
              <Route path="/submit" element={
                <ProtectedRoute requireVerifiedEmail={true}>
                  <SubmitTea />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/beta" element={
                isAdmin ? <AdminBetaDashboard /> : <div>Access Denied</div>
              } />
              
            </Routes>
          </Router>
        </WalletProvider>
      </ErrorBoundaryWrapper>
    </div>
  );
}

export default App;
