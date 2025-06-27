
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Crown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { betaCodeService } from '@/services/betaCodeService';

interface BetaCodeTabProps {
  onAccessGranted: (level: 'guest' | 'authenticated' | 'beta' | 'admin') => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

const BetaCodeTab: React.FC<BetaCodeTabProps> = ({
  onAccessGranted,
  isProcessing,
  setIsProcessing,
  error,
  setError
}) => {
  const [betaCode, setBetaCode] = useState('');
  const { toast } = useToast();

  const handleBetaCodeSubmit = async () => {
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const result = await betaCodeService.validateCode(betaCode.trim());
      
      if (result.success) {
        localStorage.setItem('ctea-access-level', 'beta');
        localStorage.setItem('ctea-beta-code', betaCode.trim());
        
        toast({
          title: "Beta Access Granted! 👑",
          description: "Welcome to CTea Beta!",
        });
        
        onAccessGranted('beta');
      } else {
        setError(result.message || 'Invalid beta code');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <Crown className="w-16 h-16 mx-auto mb-4 text-pink-400" />
        <h3 className="text-xl font-bold mb-2 text-white">Beta Access</h3>
        <p className="text-white/80 text-sm">
          Enter your exclusive beta code for premium access
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="beta-code" className="text-white">Beta Code</Label>
          <Input
            id="beta-code"
            type="text"
            value={betaCode}
            onChange={(e) => setBetaCode(e.target.value)}
            placeholder="Enter beta code"
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
          onClick={handleBetaCodeSubmit}
          disabled={isProcessing || !betaCode.trim()}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Submit Beta Code'
          )}
        </Button>
      </div>
    </div>
  );
};

export default BetaCodeTab;
