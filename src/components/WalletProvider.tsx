
import React, { createContext, useContext, useState, useEffect } from 'react';
import { identify, track } from '@/utils/analytics';
import { adminConfigService } from '@/services/adminConfigService';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  walletType: 'metamask' | 'core' | 'phantom' | null;
  balance: {
    eth: string;
    tea: string;
    soap: string;
  };
}

interface WalletContextType {
  wallet: WalletState;
  connectWallet: (type: 'metamask' | 'walletconnect' | 'core' | 'phantom') => Promise<void>;
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
  if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👛 WalletProvider initializing...');
  
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    walletType: null,
    balance: {
      eth: '0.0',
      tea: '0',
      soap: '0'
    }
  });

  if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👛 Initial wallet state:', wallet);

  const AVALANCHE_CHAIN_ID = 43114;
  const AVALANCHE_TESTNET_CHAIN_ID = 43113;

  // Initialize admin config
  useEffect(() => {
    adminConfigService.initializeAdmin();
  }, []);

  const connectWallet = async (type: 'metamask' | 'walletconnect' | 'core' | 'phantom') => {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔗 Connecting wallet:', type);
    
    try {
      if (type === 'phantom') {
        // Connect Phantom wallet for Solana
        if (typeof window.solana !== 'undefined' && window.solana.isPhantom) {
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👻 Connecting Phantom wallet...');
          await window.solana.connect();
          const address = window.solana.publicKey.toString();
          
          const newWalletState = {
            isConnected: true,
            address,
            chainId: 101, // Solana mainnet
            walletType: 'phantom' as const,
            balance: {
              eth: '0.0',
              tea: '0', // Will be updated by auth system
              soap: '0'
            }
          };

          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('✅ Phantom wallet connected:', newWalletState);
          setWallet(newWalletState);

          localStorage.setItem('ctea_wallet_connected', 'true');
          localStorage.setItem('ctea_wallet_type', type);
          localStorage.setItem('ctea_wallet_address', address);

          identify(address);
          track('connected_wallet', { wallet_type: type, chain_id: 101 });
        } else {
          throw new Error('Phantom wallet not found. Please install Phantom wallet.');
        }
      } else if ((type === 'metamask' || type === 'core') && typeof window.ethereum !== 'undefined') {
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🦊 Connecting MetaMask/Core wallet...');
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔗 Got accounts:', accounts);
        
        const chainId = await window.ethereum.request({
          method: 'eth_chainId'
        });

        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('⛓️ Current chain ID:', chainId);

        if (accounts.length > 0) {
          const newWalletState = {
            isConnected: true,
            address: accounts[0],
            chainId: parseInt(chainId, 16),
            walletType: type as 'metamask' | 'core',
            balance: {
              eth: '1.234',
              tea: '0', // Will be updated by auth system
              soap: '0'
            }
          };

          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('✅ Wallet connected:', newWalletState);
          setWallet(newWalletState);

          localStorage.setItem('ctea_wallet_connected', 'true');
          localStorage.setItem('ctea_wallet_type', type);
          localStorage.setItem('ctea_wallet_address', accounts[0]);

          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('💾 Wallet data saved to localStorage');

          identify(accounts[0]);
          track('connected_wallet', { wallet_type: type, chain_id: parseInt(chainId, 16) });
        }
      } else {
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('❌ Wallet provider not available');
        throw new Error(`${type} wallet not available`);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('❌ Failed to connect wallet:', error);
      throw error;
    }
  };

  const switchToAvalanche = async () => {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔄 Switching to Avalanche...');
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${AVALANCHE_CHAIN_ID.toString(16)}` }],
      });
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('✅ Switched to Avalanche');
    } catch (switchError: any) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('⚠️ Switch error, trying to add network...', switchError.code);
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
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('✅ Added and switched to Avalanche');
        } catch (addError) {
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('❌ Failed to add Avalanche network:', addError);
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
  };

  const disconnectWallet = () => {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔌 Disconnecting wallet...');
    
    if (wallet.walletType === 'phantom' && window.solana) {
      window.solana.disconnect();
    }
    
    setWallet({
      isConnected: false,
      address: null,
      chainId: null,
      walletType: null,
      balance: {
        eth: '0.0',
        tea: '0',
        soap: '0'
      }
    });
    localStorage.removeItem('ctea_wallet_connected');
    localStorage.removeItem('ctea_wallet_type');
    localStorage.removeItem('ctea_wallet_address');
    
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🗑️ Wallet data cleared from localStorage');
    track('disconnected_wallet');
  };

  const switchChain = async (chainId: number) => {
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔄 Switching chain to:', chainId);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      setWallet(prev => ({ ...prev, chainId }));
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('✅ Chain switched to:', chainId);
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('❌ Failed to switch chain:', error);
      throw error;
    }
  };

  // Auto-connect on load with enhanced checks
  useEffect(() => {
    const autoConnect = async () => {
      const isConnected = localStorage.getItem('ctea_wallet_connected');
      const walletType = localStorage.getItem('ctea_wallet_type') as 'metamask' | 'core' | 'phantom' | null;
      const savedAddress = localStorage.getItem('ctea_wallet_address');
      
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔍 Checking auto-connect:', { isConnected, walletType, savedAddress });
      
      if (isConnected && walletType && savedAddress) {
        try {
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔄 Attempting auto-connect...');
          
          if (walletType === 'phantom' && typeof window.solana !== 'undefined') {
            // Auto-connect Phantom
            if (window.solana.isConnected) {
              await connectWallet('phantom');
            }
          } else if ((walletType === 'metamask' || walletType === 'core') && typeof window.ethereum !== 'undefined') {
            // Auto-connect MetaMask/Core
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            
            if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👥 Current accounts:', accounts);
            
            if (accounts.length > 0 && accounts[0].toLowerCase() === savedAddress.toLowerCase()) {
              if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔄 Auto-connecting wallet...');
              await connectWallet(walletType);
            } else {
              if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🧹 Clearing stale wallet data');
              disconnectWallet();
            }
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('❌ Auto-connect failed:', error);
          disconnectWallet();
        }
      } else {
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('ℹ️ No auto-connect data found');
      }
    };

    autoConnect();
  }, []);

  // Listen for account/chain changes (only for Ethereum wallets)
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👛 Accounts changed:', accounts);
        
        if (accounts.length === 0) {
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔌 No accounts, disconnecting...');
          disconnectWallet();
        } else if (wallet.isConnected && accounts[0] !== wallet.address) {
          if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔄 Account changed, reconnecting...');
          const walletType = localStorage.getItem('ctea_wallet_type');
          if (walletType && walletType !== 'phantom') {
            connectWallet(walletType as 'metamask' | 'core');
          }
        }
      };

      const handleChainChanged = (chainId: string) => {
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('⛓️ Chain changed:', chainId);
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

  // Listen for Phantom wallet changes
  useEffect(() => {
    if (typeof window.solana !== 'undefined') {
      const handleDisconnect = () => {
        if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👻 Phantom disconnected');
        if (wallet.walletType === 'phantom') {
          disconnectWallet();
        }
      };

      window.solana.on('disconnect', handleDisconnect);

      return () => {
        window.solana.removeListener('disconnect', handleDisconnect);
      };
    }
  }, [wallet.walletType]);

  if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('👛 WalletProvider rendering with state:', wallet);

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
