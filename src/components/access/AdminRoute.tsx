import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import AdminGuard from './AdminGuard';

interface AdminRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
  redirectTo?: string;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ 
  children, 
  requireSuperAdmin = false,
  redirectTo = '/'
}) => {
  const { hasAdminAccess, hasSuperAdminAccess } = useAdminAccess();
  const location = useLocation();

  // Check if user has required access level
  const hasRequiredAccess = requireSuperAdmin ? hasSuperAdminAccess : hasAdminAccess;

  // If no access, redirect to specified route
  if (!hasRequiredAccess) {
    // Store the attempted location for potential redirect after login
    if (location.pathname !== redirectTo) {
      sessionStorage.setItem('adminRedirectPath', location.pathname);
    }
    
    return <Navigate to={redirectTo} replace />;
  }

  // If has access, render children with AdminGuard for additional protection
  return (
    <AdminGuard requireSuperAdmin={requireSuperAdmin} showAccessDenied={false}>
      {children}
    </AdminGuard>
  );
};

export default AdminRoute; 