
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireModerator?: boolean;
  requireVerifiedEmail?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false, 
  requireModerator = false,
  requireVerifiedEmail = false
}) => {
  const { 
    isAuthenticated, 
    isAdmin, 
    isModerator, 
    isVerified,
    sessionExpiry 
  } = useSecureAuth();

  // Check if session is expired
  if (sessionExpiry && Date.now() > sessionExpiry) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireVerifiedEmail && !isVerified) {
    return <Navigate to="/auth?verify=true" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireModerator && !isModerator) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
