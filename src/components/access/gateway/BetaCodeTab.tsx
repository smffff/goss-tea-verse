
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { betaCodeService } from '@/services/betaCodeService';
import AccessLevelIndicator from '../AccessLevelIndicator';

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
  const [showTestCodes, setShowTestCodes] = useState(false);
  const { toast } = useToast();

  const handleBetaCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!betaCode.trim()) {
      setError('Please enter a beta code bestie');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const result = await betaCodeService.validateCode(betaCode, true);
      
      if (result.valid) {
        localStorage.setItem('ctea-access-level', 'beta');
        localStorage.setItem('ctea-beta-code', betaCode);
        toast({
          title: "Beta Access Granted! 🚀",
          description: "Welcome to the exclusive CTea beta experience!",
        });
        onAccessGranted('beta');
      } else {
        setError('Invalid beta code. Need access? Try other options below!');
      }
    } catch (error) {
      secureLog.error('Beta verification error:', error);
      setError('Verification failed - probably the server having main character energy 🎭');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTestCode = (code: string) => {
    setBetaCode(code);
    setShowTestCodes(false);
  };

  return (
    <div className="space-y-4">
      <AccessLevelIndicator level="beta" />
      <form onSubmit={handleBetaCode} className="space-y-4">
        <Input
          placeholder="Enter your beta code..."
          value={betaCode}
          onChange={(e) => setBetaCode(e.target.value)}
          className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal font-mono text-center"
        />
        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80"
        >
          {isProcessing ? 'Verifying...' : 'Access Beta'}
        </Button>
      </form>

      {process.env.NODE_ENV === 'development' && (
        <div className="pt-4 border-t border-ctea-teal/20">
          <Button
            variant="ghost"
            onClick={() => setShowTestCodes(!showTestCodes)}
            className="w-full text-ctea-teal hover:bg-ctea-teal/10 text-xs"
          >
            <Eye className="w-3 h-3 mr-2" />
            {showTestCodes ? 'Hide' : 'Show'} Test Codes
          </Button>

          {showTestCodes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {betaCodeService.getTestCodes().map((code) => (
                  <Badge
                    key={code}
                    variant="outline"
                    className="cursor-pointer border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10 font-mono text-xs justify-center py-1"
                    onClick={() => handleTestCode(code)}
                  >
                    {code}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default BetaCodeTab;
