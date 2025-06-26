import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  isAdmin: boolean;
  isModerator: boolean;
}

interface AdminAccessResponse {
  is_admin?: boolean;
  user_role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const { toast } = useToast();

  console.log('[AuthProvider] Current state:', { user: user?.email, loading, isAdmin, isModerator });

  const checkUserRole = async (userEmail: string) => {
    console.log('[AuthProvider] Checking user role for:', userEmail);
    
    try {
      const { data, error } = await supabase.rpc('validate_admin_access');
      
      if (error) {
        console.warn('[AuthProvider] Role check error:', error);
        setIsAdmin(false);
        setIsModerator(false);
        return;
      }
      
      const adminData = data as AdminAccessResponse | null;
      const adminStatus = adminData?.is_admin || false;
      const moderatorStatus = adminData?.user_role === 'moderator' || adminStatus;
      
      console.log('[AuthProvider] Role check result:', { adminStatus, moderatorStatus, adminData });
      
      setIsAdmin(adminStatus);
      setIsModerator(moderatorStatus);
    } catch (error) {
      console.error('[AuthProvider] Unexpected error during role check:', error);
      setIsAdmin(false);
      setIsModerator(false);
    }
  };

  useEffect(() => {
    console.log('[AuthProvider] Setting up auth state listener');
    
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthProvider] Auth state change:', event, session?.user?.email);
        
        if (!mounted) {
          console.log('[AuthProvider] Component unmounted, ignoring auth change');
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user?.email) {
          // Use a small delay to ensure state is properly set
          setTimeout(() => {
            if (mounted) {
              checkUserRole(session.user.email!);
            }
          }, 100);
        } else {
          setIsAdmin(false);
          setIsModerator(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        console.log('[AuthProvider] Checking for existing session');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[AuthProvider] Error getting session:', error);
          setLoading(false);
          return;
        }
        
        if (!mounted) return;
        
        console.log('[AuthProvider] Initial session:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user?.email) {
          await checkUserRole(session.user.email);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('[AuthProvider] Unexpected error during auth initialization:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      console.log('[AuthProvider] Cleaning up auth subscription');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
    console.log('[AuthProvider] Sign up attempt for:', email);
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });
    
    if (error) {
      console.error('[AuthProvider] Sign up error:', error);
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      console.log('[AuthProvider] Sign up successful');
      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link."
      });
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('[AuthProvider] Sign in attempt for:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('[AuthProvider] Sign in error:', error);
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      console.log('[AuthProvider] Sign in successful');
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('[AuthProvider] Sign out attempt');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('[AuthProvider] Sign out error:', error);
      toast({
        title: "Sign Out Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      console.log('[AuthProvider] Sign out successful');
    }
    
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
    isModerator
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
