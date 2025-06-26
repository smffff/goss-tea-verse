
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load components for better performance
const ProductionLandingPage = React.lazy(() => import('@/components/landing/ProductionLandingPage'));
const SimpleBetaLanding = React.lazy(() => import('@/components/beta/SimpleBetaLanding'));
const Feed = React.lazy(() => import('@/pages/Feed'));
const EnhancedTeaFeed = React.lazy(() => import('@/components/EnhancedTeaFeed'));

interface AppRoutesProps {
  hasAccess: boolean;
  onAccessGranted: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ hasAccess, onAccessGranted }) => {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        {/* Main Routes */}
        <Route 
          path="/" 
          element={
            hasAccess ? (
              <ProductionLandingPage />
            ) : (
              <SimpleBetaLanding onAccessGranted={onAccessGranted} />
            )
          } 
        />
        
        {/* Protected Routes */}
        {hasAccess && (
          <>
            <Route path="/feed" element={<Feed />} />
            <Route path="/enhanced-feed" element={<EnhancedTeaFeed />} />
          </>
        )}

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
