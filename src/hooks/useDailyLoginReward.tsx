
import { useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLogging';

export const useDailyLoginReward = (walletAddress?: string) => {
  const [hasClaimedToday, setHasClaimedToday] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const checkDailyLogin = useCallback(async () => {
    if (!walletAddress) return;

    setIsChecking(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastClaimed = localStorage.getItem(`ctea_daily_login_${walletAddress}`);
      
      if (lastClaimed === today) {
        setHasClaimedToday(true);
        return;
      }

      setHasClaimedToday(false);
    } catch (error) {
      secureLog.error('Failed to check daily login status:', error);
    } finally {
      setIsChecking(false);
    }
  }, [walletAddress]);

  const claimDailyLoginReward = async () => {
    if (!walletAddress || hasClaimedToday) return;

    try {
      // Simulate daily login reward - in production this would call a proper service
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`ctea_daily_login_${walletAddress}`, today);
      setHasClaimedToday(true);
      
      toast({
        title: "Daily Login Bonus! ☕",
        description: "You earned 5 TEA tokens for logging in today!",
      });
      
      return true;
    } catch (error) {
      secureLog.error('Failed to claim daily login reward:', error);
      toast({
        title: "Daily Login Failed",
        description: "Could not claim daily login bonus. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    if (walletAddress) {
      checkDailyLogin();
    }
  }, [walletAddress, checkDailyLogin]);

  return {
    hasClaimedToday,
    isChecking,
    claimDailyLoginReward,
    checkDailyLogin
  };
};
