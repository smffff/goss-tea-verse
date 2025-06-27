import { useAuth } from './useAuth';
import { useAccessControl } from '@/components/access/AccessControlProvider';

interface AdminAccessInfo {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  hasAdminAccess: boolean;
  hasSuperAdminAccess: boolean;
  userEmail?: string;
}

export const useAdminAccess = (): AdminAccessInfo => {
  const { user, isAdmin } = useAuth();
  const { isAdmin: accessControlAdmin } = useAccessControl();
  
  // Check if user is super admin
  const isSuperAdmin = user?.email === 'stephanie@taskbytask.net';
  
  // Check if user has any admin access
  const hasAdminAccess = isAdmin || accessControlAdmin || isSuperAdmin;
  
  // Check if user has super admin access
  const hasSuperAdminAccess = isSuperAdmin;

  return {
    isAdmin: isAdmin || accessControlAdmin,
    isSuperAdmin,
    hasAdminAccess,
    hasSuperAdminAccess,
    userEmail: user?.email
  };
};

export default useAdminAccess; 