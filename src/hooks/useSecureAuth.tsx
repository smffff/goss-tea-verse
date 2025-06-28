
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecureAuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isVerified: boolean;
  sessionExpiry: number | null;
}

interface AdminAccessResponse {
  is_admin?: boolean;
  user_role?: string;
}

export const useSecureAuth = () => {
  const { user, isAdmin, isModerator } = useAuth();
  const [secureState, setSecureState] = useState<SecureAuthState>({
    isAuthenticated: false,
    isAdmin: false,
    isModerator: false,
    isVerified: false,
    sessionExpiry: null
  });
  const { toast } = useToast();

  useEffect(() => {
    const validateSession = async () => {
      if (!user) {
        setSecureState({
          isAuthenticated: false,
          isAdmin: false,
          isModerator: false,
          isVerified: false,
          sessionExpiry: null
        });
        return;
      }

      try {
        // Validate session server-side
        const { data, error } = await supabase.rpc('validate_admin_access');
        
        if (error) {
          console.error('Session validation error:', error);
          setSecureState(prev => ({
            ...prev,
            isAuthenticated: false,
            isAdmin: false,
            isModerator: false
          }));
          return;
        }

        // Check if email is verified
        const isVerified = user.email_confirmed_at !== null;
        
        // Calculate session expiry (24 hours from last sign in)
        const lastSignIn = user.last_sign_in_at ? new Date(user.last_sign_in_at) : null;
        const sessionExpiry = lastSignIn ? lastSignIn.getTime() + (24 * 60 * 60 * 1000) : null;
        
        // Safely parse the response data
        let adminData: AdminAccessResponse = {};
        if (data && typeof data === 'object') {
          adminData = data as AdminAccessResponse;
        }

        setSecureState({
          isAuthenticated: true,
          isAdmin: adminData.is_admin || isAdmin,
          isModerator: adminData.user_role === 'moderator' || adminData.is_admin || isModerator,
          isVerified,
          sessionExpiry
        });

        // Check if session is close to expiry
        if (sessionExpiry && Date.now() > sessionExpiry - (2 * 60 * 60 * 1000)) {
          toast({
            title: "Session Expiring Soon ⏰",
            description: "Please sign in again to continue brewing tea.",
            variant: "destructive"
          });
        }

      } catch (error) {
        console.error('Session validation failed:', error);
        setSecureState(prev => ({
          ...prev,
          isAuthenticated: false,
          isAdmin: false,
          isModerator: false
        }));
      }
    };

    validateSession();
    
    // Re-validate every 5 minutes
    const interval = setInterval(validateSession, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user, toast, isAdmin, isModerator]);

  const requireAdmin = (): boolean => {
    if (!secureState.isAdmin) {
      toast({
        title: "Access Denied 🔒",
        description: "Administrator privileges required to access this tea ceremony.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const requireModerator = (): boolean => {
    if (!secureState.isModerator) {
      toast({
        title: "Access Denied 🔒",
        description: "Moderator privileges required to manage this tea lounge.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const requireVerifiedEmail = (): boolean => {
    if (!secureState.isVerified) {
      toast({
        title: "Email Verification Required 📧",
        description: "Please verify your email address to continue.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return {
    ...secureState,
    requireAdmin,
    requireModerator,
    requireVerifiedEmail
  };
};
