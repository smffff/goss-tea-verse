
import { useState, useEffect } from 'react';

export interface WalletHook {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchToAvalanche: () => Promise<void>;
}

export const useWallet = (): WalletHook => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Mock wallet connection
      setIsConnected(true);
      setWalletAddress('0x1234...5678');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
  };

  const switchToAvalanche = async () => {
    try {
      // Mock switch to Avalanche network
      console.log('Switching to Avalanche network...');
      // In a real implementation, this would switch the wallet network
    } catch (error) {
      console.error('Failed to switch to Avalanche:', error);
      throw error;
    }
  };

  return {
    isConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    switchToAvalanche
  };
};
