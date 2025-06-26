
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useBetaAccess = (onAccessGranted: () => void) => {
  const [betaCode, setBetaCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const validateBetaCode = async (code: string): Promise<boolean> => {
    try {
      const validCodes = ['CTEA2024', 'BETA-ACCESS', 'EARLY-BIRD'];
      return validCodes.includes(code.toUpperCase());
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Beta code validation error:', error);
      return false;
    }
  };

  const handleBetaSubmit = async () => {
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const isValid = await validateBetaCode(betaCode);
      
      if (isValid) {
        localStorage.setItem('ctea-beta-access', 'granted');
        toast({
          title: "Welcome to CTea! ☕",
          description: "You now have access to the hottest gossip platform.",
        });
        onAccessGranted();
      } else {
        setError('Invalid beta code. Please check your code and try again.');
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Beta verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    betaCode,
    setBetaCode,
    error,
    isVerifying,
    handleBetaSubmit
  };
};
