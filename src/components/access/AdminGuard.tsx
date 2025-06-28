
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthProvider';

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireSuperAdmin?: boolean;
  showAccessDenied?: boolean;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ 
  children, 
  fallback, 
  requireSuperAdmin = false,
  showAccessDenied = true 
}) => {
  const { user, isAdmin } = useAuth();

  // Check if user has required access level
  const hasRequiredAccess = requireSuperAdmin ? isAdmin : isAdmin;

  // If no access and we shouldn't show access denied, return null
  if (!hasRequiredAccess && !showAccessDenied) {
    return null;
  }

  // If no access, show fallback or default access denied
  if (!hasRequiredAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
        <Card className="bg-ctea-dark/60 border-red-500/30 max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <Shield className="w-16 h-16 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">🫖 Access Denied</h2>
              <p className="text-gray-300 mb-4">
                {requireSuperAdmin 
                  ? 'You need super admin privileges to access this tea ceremony.'
                  : 'You need admin privileges to access this exclusive tea lounge.'
                }
              </p>
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 space-y-1 p-3 bg-gray-800 rounded">
                  <p>Current user: {user?.email || 'Not authenticated'}</p>
                  <p>Admin access: {isAdmin ? 'Yes' : 'No'}</p>
                  <p>Super admin required: {requireSuperAdmin ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-400 hover:bg-gray-700"
              onClick={() => window.history.back()}
            >
              <Lock className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If has access, render children
  return <>{children}</>;
};

export default AdminGuard;
