
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { WalletProvider } from '@/components/WalletProvider';
import { useAuth } from '@/hooks/useAuthProvider';
import { useAdminAccess } from '@/hooks/useAdminAccess';

// Components
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';
import MobileBottomNavigation from '@/components/navigation/MobileBottomNavigation';
import AdminRoute from '@/components/access/AdminRoute';
import FloatingSpillCTA from '@/components/ui/FloatingSpillCTA';

// Pages
import LandingPage from '@/pages/LandingPage';
import Feed from '@/pages/Feed';
import SubmitTea from '@/pages/SubmitTea';
import Auth from '@/pages/Auth';
import SpillTea from '@/pages/SpillTea';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import NotFound from '@/pages/NotFound';
import LaunchShowcase from '@/pages/LaunchShowcase';

const AppLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <WalletProvider>
        <div className="min-h-screen bg-gradient-to-br from-tabloid-black-900 via-tabloid-black-800 to-black">
          <UnifiedNavigation />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/launch" element={<LaunchShowcase />} />
            
            {/* Protected Routes */}
            <Route 
              path="/spill" 
              element={
                user ? <SpillTea /> : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/submit" 
              element={
                user ? <SubmitTea /> : <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/profile" 
              element={
                user ? <Profile /> : <Navigate to="/auth" replace />
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute requireSuperAdmin={true}>
                  <Admin />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRoute requireSuperAdmin={true}>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <MobileBottomNavigation />
          <FloatingSpillCTA />
          
          {/* Mobile spacer */}
          <div className="h-20 md:hidden" />
        </div>
      </WalletProvider>
    </Router>
  );
};

export default AppLayout;
