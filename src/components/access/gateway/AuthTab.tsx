import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import AccessLevelIndicator from '../AccessLevelIndicator';
import { getErrorMessage } from '@/utils/authErrorHandler';
import { secureLog } from '@/utils/secureLogging';

interface AuthTabProps {
  onAccessGranted: (level: 'guest' | 'authenticated' | 'beta' | 'admin') => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

interface AuthFormData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
  };
}

const AuthTab: React.FC<AuthTabProps> = ({ 
  onAccessGranted, 
  isProcessing, 
  setIsProcessing, 
  error, 
  setError 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleAuthSubmit = async (formData: AuthFormData): Promise<AuthResponse> => {
    try {
      // Handle authentication logic here
      const response = await authenticateUser(formData);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const result = await signIn(email, password);
      if (result.success) {
        localStorage.setItem('ctea-access-level', 'authenticated');
        toast({
          title: "Welcome back! 🫖",
          description: "Successfully signed in to CTea",
        });
        onAccessGranted('authenticated');
      } else {
        setError(result.error || 'Sign in failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign in failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const result = await signUp(email, password);
      if (result.success) {
        toast({
          title: "Welcome to CTea! 🫖",
          description: "Your account has been created successfully",
        });
        localStorage.setItem('ctea-access-level', 'authenticated');
        onAccessGranted('authenticated');
      } else {
        setError(result.error || 'Sign up failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign up failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <AccessLevelIndicator level="authenticated" />
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-ctea-darker/50">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-ctea-darker border-ctea-teal/30 text-white"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-ctea-darker border-ctea-teal/30 text-white"
              required
            />
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-ctea-teal hover:bg-ctea-teal/80"
            >
              {isProcessing ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-ctea-darker border-ctea-teal/30 text-white"
              required
            />
            <Input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-ctea-darker border-ctea-teal/30 text-white"
              minLength={6}
              required
            />
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-ctea-purple hover:bg-ctea-purple/80"
            >
              {isProcessing ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthTab;
