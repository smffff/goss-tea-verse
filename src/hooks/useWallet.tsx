
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchToAvalanche?: () => Promise<void>;
}

export const useWallet = (): WalletContextType => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const connectWallet = useCallback(async () => {
    try {
      // Mock wallet connection for now
      const mockAddress = '0x' + Array.from(crypto.getRandomValues(new Uint8Array(20)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      setWalletAddress(mockAddress);
      setIsConnected(true);
      
      toast({
        title: "Wallet Connected! 💰",
        description: `Connected to ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setWalletAddress(null);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  }, [toast]);

  const switchToAvalanche = useCallback(async () => {
    try {
      toast({
        title: "Avalanche Network",
        description: "Chain switching functionality coming soon!",
      });
    } catch (error) {
      toast({
        title: "Chain Switch Failed",
        description: "Unable to switch to Avalanche network. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  return {
    isConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    switchToAvalanche
  };
};
