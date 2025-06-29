import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/contexts/WalletContext';
import { secureLog } from '@/utils/secureLogging';

interface UnifiedState {
  user: any;
  wallet: any;
  isAuthenticated: boolean;
  isWalletConnected: boolean;
  loading: boolean;
  error: string | null;
}

interface UnifiedActions {
  refreshUser: () => Promise<void>;
  refreshWallet: () => Promise<void>;
  clearError: () => void;
}

export const useUnifiedState = (): UnifiedState & UnifiedActions => {
  const { user, loading: authLoading } = useAuth();
  const { isConnected, walletAddress, balance, refreshBalance } = useWallet();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // This would typically refresh user data from the API
      secureLog.info('Refreshing user data');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh user data';
      setError(errorMessage);
      secureLog.error('Failed to refresh user data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await refreshBalance();
      secureLog.info('Refreshed wallet data');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh wallet data';
      setError(errorMessage);
      secureLog.error('Failed to refresh wallet data:', err);
    } finally {
      setLoading(false);
    }
  }, [refreshBalance]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (error) {
      // Auto-clear errors after 5 seconds
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    user,
    wallet: {
      isConnected,
      address: walletAddress,
      balance
    },
    isAuthenticated: !!user,
    isWalletConnected: isConnected,
    loading: authLoading || loading,
    error,
    refreshUser,
    refreshWallet,
    clearError
  };
}; 