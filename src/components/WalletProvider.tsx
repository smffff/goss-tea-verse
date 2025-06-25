
import React, { createContext, useContext, useState, useEffect } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: {
    eth: string;
    tea: string;
    soap: string;
  };
}

interface WalletContextType {
  wallet: WalletState;
  connectWallet: (type: 'metamask' | 'walletconnect') => Promise<void>;
  disconnectWallet: () => void;
  switchChain: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: {
      eth: '0.0',
      tea: '0',
      soap: '0'
    }
  });

  const connectWallet = async (type: 'metamask' | 'walletconnect') => {
    try {
      if (type === 'metamask' && typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        const chainId = await window.ethereum.request({
          method: 'eth_chainId'
        });

        if (accounts.length > 0) {
          setWallet({
            isConnected: true,
            address: accounts[0],
            chainId: parseInt(chainId, 16),
            balance: {
              eth: '1.234',
              tea: '1500',
              soap: '250'
            }
          });

          // Store connection preference
          localStorage.setItem('ctea_wallet_connected', 'true');
          localStorage.setItem('ctea_wallet_type', type);
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      chainId: null,
      balance: {
        eth: '0.0',
        tea: '0',
        soap: '0'
      }
    });
    localStorage.removeItem('ctea_wallet_connected');
    localStorage.removeItem('ctea_wallet_type');
  };

  const switchChain = async (chainId: number) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      setWallet(prev => ({ ...prev, chainId }));
    } catch (error) {
      console.error('Failed to switch chain:', error);
      throw error;
    }
  };

  // Auto-connect on load
  useEffect(() => {
    const isConnected = localStorage.getItem('ctea_wallet_connected');
    const walletType = localStorage.getItem('ctea_wallet_type');
    
    if (isConnected && walletType && typeof window.ethereum !== 'undefined') {
      connectWallet(walletType as 'metamask' | 'walletconnect').catch(console.error);
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      wallet,
      connectWallet,
      disconnectWallet,
      switchChain
    }}>
      {children}
    </WalletContext.Provider>
  );
};
