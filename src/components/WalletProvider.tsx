
import React, { createContext, useContext, useState, useEffect } from 'react';
import { identify, track } from '@/utils/analytics';

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
  connectWallet: (type: 'metamask' | 'walletconnect' | 'core') => Promise<void>;
  disconnectWallet: () => void;
  switchChain: (chainId: number) => Promise<void>;
  switchToAvalanche: () => Promise<void>;
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
  console.log('👛 WalletProvider initializing...');
  
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

  const AVALANCHE_CHAIN_ID = 43114;
  const AVALANCHE_TESTNET_CHAIN_ID = 43113;

  const connectWallet = async (type: 'metamask' | 'walletconnect' | 'core') => {
    console.log('🔗 Connecting wallet:', type);
    
    try {
      if ((type === 'metamask' || type === 'core') && typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        const chainId = await window.ethereum.request({
          method: 'eth_chainId'
        });

        if (accounts.length > 0) {
          const newWalletState = {
            isConnected: true,
            address: accounts[0],
            chainId: parseInt(chainId, 16),
            balance: {
              eth: '1.234',
              tea: '0', // Will be updated by auth system
              soap: '0'
            }
          };

          console.log('✅ Wallet connected:', newWalletState);
          setWallet(newWalletState);

          localStorage.setItem('ctea_wallet_connected', 'true');
          localStorage.setItem('ctea_wallet_type', type);
          localStorage.setItem('ctea_wallet_address', accounts[0]);

          // Analytics: identify user and track wallet connection
          identify(accounts[0]);
          track('connected_wallet', { wallet_type: type, chain_id: parseInt(chainId, 16) });
        }
      }
    } catch (error) {
      console.error('❌ Failed to connect wallet:', error);
      throw error;
    }
  };

  const switchToAvalanche = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${AVALANCHE_CHAIN_ID.toString(16)}` }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${AVALANCHE_CHAIN_ID.toString(16)}`,
                chainName: 'Avalanche Network',
                nativeCurrency: {
                  name: 'AVAX',
                  symbol: 'AVAX',
                  decimals: 18,
                },
                rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
                blockExplorerUrls: ['https://snowtrace.io/'],
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add Avalanche network:', addError);
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
  };

  const disconnectWallet = () => {
    console.log('🔌 Disconnecting wallet...');
    
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
    localStorage.removeItem('ctea_wallet_address');
    
    track('disconnected_wallet');
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

  // Auto-connect on load with enhanced checks
  useEffect(() => {
    const autoConnect = async () => {
      const isConnected = localStorage.getItem('ctea_wallet_connected');
      const walletType = localStorage.getItem('ctea_wallet_type');
      const savedAddress = localStorage.getItem('ctea_wallet_address');
      
      console.log('🔍 Checking auto-connect:', { isConnected, walletType, savedAddress });
      
      if (isConnected && walletType && savedAddress && typeof window.ethereum !== 'undefined') {
        try {
          // Check if wallet is still connected
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0 && accounts[0].toLowerCase() === savedAddress.toLowerCase()) {
            console.log('🔄 Auto-connecting wallet...');
            await connectWallet(walletType as 'metamask' | 'walletconnect' | 'core');
          } else {
            // Clear stale connection data
            console.log('🧹 Clearing stale wallet data');
            disconnectWallet();
          }
        } catch (error) {
          console.error('❌ Auto-connect failed:', error);
          disconnectWallet();
        }
      }
    };

    autoConnect();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('👛 Accounts changed:', accounts);
        
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (wallet.isConnected && accounts[0] !== wallet.address) {
          // Account changed, reconnect with new account
          const walletType = localStorage.getItem('ctea_wallet_type');
          if (walletType) {
            connectWallet(walletType as 'metamask' | 'walletconnect' | 'core');
          }
        }
      };

      const handleChainChanged = (chainId: string) => {
        console.log('⛓️ Chain changed:', chainId);
        setWallet(prev => ({ ...prev, chainId: parseInt(chainId, 16) }));
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [wallet.isConnected, wallet.address]);

  console.log('👛 WalletProvider rendering with state:', wallet);

  return (
    <WalletContext.Provider value={{
      wallet,
      connectWallet,
      disconnectWallet,
      switchChain,
      switchToAvalanche
    }}>
      {children}
    </WalletContext.Provider>
  );
};
