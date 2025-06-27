
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedAuthTabProps {
  onAccessGranted: (level: 'guest' | 'authenticated' | 'beta' | 'admin') => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

const EnhancedAuthTab: React.FC<EnhancedAuthTabProps> = ({
  onAccessGranted,
  isProcessing,
  setIsProcessing,
  error,
  setError
}) => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleEmailAuth = async () => {
    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Simulate email authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('ctea-access-level', 'authenticated');
      localStorage.setItem('ctea-user-email', email);
      
      toast({
        title: "Authentication Successful! 📧",
        description: "Welcome to CTea!",
      });
      
      onAccessGranted('authenticated');
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <Mail className="w-16 h-16 mx-auto mb-4 text-ctea-teal" />
        <h3 className="text-xl font-bold mb-2 text-white">Email Authentication</h3>
        <p className="text-white/80 text-sm">
          Sign in with your email for full access
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-ctea-darker border-ctea-teal/30 text-white"
            disabled={isProcessing}
          />
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={handleEmailAuth}
          disabled={isProcessing || !email.trim()}
          className="w-full bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Authenticating...
            </>
          ) : (
            'Sign In with Email'
          )}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedAuthTab;
