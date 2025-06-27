
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { secureLog } from '@/utils/secureLogging';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  network: 'ethereum' | 'avalanche' | null;
  balance: {
    eth: string;
    avax: string;
    tea: string;
    soap: string;
  };
}

interface WalletContextType {
  wallet: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: 'ethereum' | 'avalanche') => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    network: null,
    balance: {
      eth: '0',
      avax: '0',
      tea: '0',
      soap: '0'
    }
  });

  const { toast } = useToast();

  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet();
        }
      }
    } catch (error) {
      secureLog.error('Failed to check existing connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast({
          title: "Wallet Not Found",
          description: "Please install MetaMask or another Web3 wallet",
          variant: "destructive"
        });
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      setWallet(prev => ({
        ...prev,
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        network: parseInt(chainId, 16) === 1 ? 'ethereum' : 'avalanche'
      }));

      await refreshBalance();
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error) {
      secureLog.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet",
        variant: "destructive"
      });
    }
  };

  const disconnectWallet = () => {
    try {
      setWallet({
        isConnected: false,
        address: null,
        chainId: null,
        network: null,
        balance: {
          eth: '0',
          avax: '0',
          tea: '0',
          soap: '0'
        }
      });
      
      toast({
        title: "Wallet Disconnected",
        description: "Successfully disconnected from wallet",
      });
    } catch (error) {
      secureLog.error('Failed to disconnect wallet:', error);
    }
  };

  const switchNetwork = async (network: 'ethereum' | 'avalanche') => {
    try {
      const chainId = network === 'ethereum' ? '0x1' : '0xa86a';
      
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      });
      
      setWallet(prev => ({
        ...prev,
        network,
        chainId: parseInt(chainId, 16)
      }));
      
      await refreshBalance();
    } catch (error) {
      secureLog.error('Failed to switch network:', error);
      toast({
        title: "Network Switch Failed",
        description: "Could not switch to the requested network",
        variant: "destructive"
      });
    }
  };

  const refreshBalance = async () => {
    try {
      if (!wallet.address) return;
      
      // Mock balance data for demo
      const mockBalance = {
        eth: '1.5',
        avax: '25.8',
        tea: '1000',
        soap: '500'
      };
      
      setWallet(prev => ({
        ...prev,
        balance: mockBalance
      }));
    } catch (error) {
      secureLog.error('Failed to refresh balance:', error);
    }
  };

  const contextValue: WalletContextType = {
    wallet,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    refreshBalance
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
