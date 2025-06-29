
import { useState, useEffect } from 'react';

export interface WalletHook {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
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

  return {
    isConnected,
    walletAddress,
    connectWallet,
    disconnectWallet
  };
};
