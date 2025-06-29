import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { secureLog } from '@/utils/secureLogging';

interface WalletContextType {
  walletAddress: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  balance: number;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState(0);

  const connect = async () => {
    try {
      setIsConnecting(true);
      secureLog.info('Attempting to connect wallet');
      
      // Check if MetaMask is available
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          await refreshBalance();
          secureLog.info('Wallet connected successfully', { address: accounts[0] });
        }
      } else {
        throw new Error('MetaMask not found. Please install MetaMask.');
      }
    } catch (error) {
      secureLog.error('Wallet connection failed:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setWalletAddress(null);
    setIsConnected(false);
    setBalance(0);
    secureLog.info('Wallet disconnected');
  };

  const refreshBalance = async () => {
    if (!walletAddress) return;
    
    try {
      // This would typically fetch from your blockchain or API
      // For now, we'll simulate a balance
      const mockBalance = Math.floor(Math.random() * 1000);
      setBalance(mockBalance);
    } catch (error) {
      secureLog.error('Failed to refresh balance:', error);
    }
  };

  useEffect(() => {
    // Check for existing connection on mount
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            refreshBalance();
          }
        })
        .catch((error: Error) => {
          secureLog.error('Failed to check existing wallet connection:', error);
        });
    }
  }, []);

  const value: WalletContextType = {
    walletAddress,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    balance,
    refreshBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 