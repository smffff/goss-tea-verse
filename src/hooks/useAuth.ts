
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  token_balance?: number;
  verification_level?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Placeholder implementation
    console.log('Sign in:', email, password);
  };

  const signUp = async (email: string, password: string) => {
    // Placeholder implementation
    console.log('Sign up:', email, password);
  };

  const signOut = async () => {
    setUser(null);
  };

  const refreshBalance = async () => {
    // Placeholder implementation
    console.log('Refresh balance');
  };

  // Check if user is admin (based on email for now)
  const isAdmin = user?.email === 'stephanie@taskbytask.net';
  const isModerator = isAdmin; // Can be expanded later

  return {
    user,
    loading,
    isAdmin,
    isModerator,
    signIn,
    signUp,
    signOut,
    refreshBalance
  };
};
