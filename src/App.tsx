
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
import FloatingSpillCTA from '@/components/ui/FloatingSpillCTA';
import Profile from '@/pages/Profile';
import AdminBetaDashboard from '@/pages/admin/AdminBetaDashboard';
import NotFound from '@/pages/NotFound';
import FallbackPage from '@/pages/FallbackPage';

function AppContent() {
  console.log('🎯 App component rendering...');
  
  const { user, session, loading } = useAuth();
  const [isBetaAccessGranted, setIsBetaAccessGranted] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  console.log('🔍 Auth state:', { 
    user: !!user, 
    session: !!session, 
    loading,
    userWallet: user?.wallet_address 
  });
  
  // Simple admin check based on user email or other criteria
  const isAdmin = user?.email === 'admin@cteanews.com' || user?.email === 'stephanie@taskbytask.net';
  console.log('👑 Admin check:', { isAdmin, userEmail: user?.email });

  useEffect(() => {
    const hasBetaAccess = localStorage.getItem('ctea-beta-access') === 'granted';
    setIsBetaAccessGranted(hasBetaAccess);
    console.log('🔑 Beta access:', hasBetaAccess);
  }, [session]);

  useEffect(() => {
    // Check if we have a critical error after 10 seconds of loading
    const timer = setTimeout(() => {
      if (loading) {
        console.warn('⚠️ App stuck in loading state, showing fallback');
        setHasError(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [loading]);

  const handleAccessGranted = () => {
    setIsBetaAccessGranted(true);
  };

  // Show fallback page if there's an error or stuck loading
  if (hasError) {
    console.log('🚨 Showing fallback page due to error');
    return <FallbackPage onRetry={() => {
      setHasError(false);
      window.location.reload();
    }} />;
  }

  if (loading) {
    console.log('⏳ App is loading...');
    return <LoadingSpinner />;
  }

  console.log('✅ App rendering router...');

  return (
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
      
      <Route path="/profile" element={<Profile />} />
      <Route path="/fallback" element={<FallbackPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <ErrorBoundaryWrapper componentName="App">
        <WalletProvider>
          <Router>
            <AppContent />
            <FloatingSpillCTA />
          </Router>
        </WalletProvider>
      </ErrorBoundaryWrapper>
    </div>
  );
}

export default App;
