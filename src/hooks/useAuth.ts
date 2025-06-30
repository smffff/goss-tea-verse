import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
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

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };
};
