
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from '@/components/WalletProvider';
import LandingPage from '@/pages/LandingPage';
import Feed from '@/pages/Feed';
import SubmitTea from '@/pages/SubmitTea';
import Auth from '@/pages/Auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import SpillTea from '@/pages/SpillTea';
import FloatingSpillCTA from '@/components/ui/FloatingSpillCTA';
import Profile from '@/pages/Profile';
import AdminBetaDashboard from '@/pages/admin/AdminBetaDashboard';
import NotFound from '@/pages/NotFound';
import LaunchShowcase from '@/pages/LaunchShowcase';
import { useAuth } from '@/hooks/useAuthProvider';

const AppLayout: React.FC = () => {
  const { user } = useAuth();
  
  // Simple admin check based on user email
  const isAdmin = user?.email === 'admin@cteanews.com' || user?.email === 'stephanie@taskbytask.net';

  return (
    <Router>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/spill" element={
            <ProtectedRoute requireAuth={true}>
              <SpillTea />
            </ProtectedRoute>
          } />
          <Route path="/submit" element={
            <ProtectedRoute requireAuth={true}>
              <SubmitTea />
            </ProtectedRoute>
          } />
          
          {/* Launch Dashboard - New Feature */}
          <Route path="/launch" element={<LaunchShowcase />} />
          
          {/* Admin Routes */}
          <Route path="/admin/beta" element={
            isAdmin ? <AdminBetaDashboard /> : <div>Access Denied</div>
          } />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingSpillCTA />
      </WalletProvider>
    </Router>
  );
};

export default AppLayout;
