
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CrossChainUser, OGStatus } from '@/types/crossChain';
import { web3CrossChainService } from '@/services/web3CrossChainService';
import { useWallet } from '@/components/WalletProvider';
import { useToast } from '@/hooks/use-toast';

interface CrossChainContextType {
  crossChainUser: CrossChainUser | null;
  isCheckingOGStatus: boolean;
  refreshOGStatus: () => Promise<void>;
  getOGPerks: () => string[];
  createOGShareLink: () => string;
}

const CrossChainContext = createContext<CrossChainContextType | undefined>(undefined);

interface CrossChainProviderProps {
  children: ReactNode;
}

export const CrossChainProvider: React.FC<CrossChainProviderProps> = ({ children }) => {
  const [crossChainUser, setCrossChainUser] = useState<CrossChainUser | null>(null);
  const [isCheckingOGStatus, setIsCheckingOGStatus] = useState(false);
  const { wallet } = useWallet();
  const { toast } = useToast();

  const refreshOGStatus = async () => {
    if (!wallet.address) return;

    setIsCheckingOGStatus(true);
    try {
      console.log('🔄 Refreshing OG status for:', wallet.address);
      
      // Ensure we're on Avalanche network
      await web3CrossChainService.ensureAvalancheNetwork();
      
      const ogStatus = await web3CrossChainService.getOGStatus(wallet.address);
      
      setCrossChainUser({
        avalancheAddress: wallet.address,
        ogStatus,
        migrationStatus: 'not_started',
        airdropClaimed: false
      });

      if (ogStatus.isOG) {
        toast({
          title: `OG ${ogStatus.tier.toUpperCase()} Detected! 🎉`,
          description: `You have ${ogStatus.balance} $TEA on Avalanche. Welcome back, OG!`,
        });
      }
    } catch (error) {
      console.error('Failed to refresh OG status:', error);
      toast({
        title: 'OG Check Failed',
        description: 'Could not verify OG status. Please ensure you\'re connected to Avalanche network.',
        variant: 'destructive',
      });
    } finally {
      setIsCheckingOGStatus(false);
    }
  };

  const getOGPerks = (): string[] => {
    if (!crossChainUser?.ogStatus.isOG) return [];
    return web3CrossChainService.getOGPerks(crossChainUser.ogStatus.tier);
  };

  const createOGShareLink = (): string => {
    if (!crossChainUser?.ogStatus.isOG) return '';
    return web3CrossChainService.createOGShareLink(crossChainUser.ogStatus);
  };

  // Auto-check OG status when wallet connects
  useEffect(() => {
    if (wallet.isConnected && wallet.address && !crossChainUser) {
      refreshOGStatus();
    }
  }, [wallet.isConnected, wallet.address]);

  return (
    <CrossChainContext.Provider value={{
      crossChainUser,
      isCheckingOGStatus,
      refreshOGStatus,
      getOGPerks,
      createOGShareLink
    }}>
      {children}
    </CrossChainContext.Provider>
  );
};

export const useCrossChain = () => {
  const context = useContext(CrossChainContext);
  if (context === undefined) {
    throw new Error('useCrossChain must be used within a CrossChainProvider');
  }
  return context;
};
