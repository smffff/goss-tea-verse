
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WalletIntegrationProps {
  onSuccess: (address: string) => void;
  onError: (error: string) => void;
  isLoading?: boolean;
}

const WalletIntegration: React.FC<WalletIntegrationProps> = ({
  onSuccess,
  onError,
  isLoading = false
}) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [teaBalance, setTeaBalance] = useState<number>(0);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          await checkTeaBalance(address);
          onSuccess(address);
        }
      } else {
        onError('MetaMask not detected. Please install MetaMask to continue.');
      }
    } catch (error: any) {
      onError(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const checkTeaBalance = async (address: string) => {
    setIsCheckingBalance(true);
    
    try {
      // Mock $TEA balance check - replace with actual contract call
      const mockBalance = Math.floor(Math.random() * 1000);
      setTeaBalance(mockBalance);
    } catch (error) {
      console.error('Failed to check TEA balance:', error);
    } finally {
      setIsCheckingBalance(false);
    }
  };

  const connectPhantom = async () => {
    setIsConnecting(true);
    
    try {
      if (typeof window.solana !== 'undefined') {
        await window.solana.connect();
        const address = window.solana.publicKey.toString();
        setWalletAddress(address);
        await checkTeaBalance(address);
        onSuccess(address);
      } else {
        onError('Phantom wallet not detected. Please install Phantom to continue.');
      }
    } catch (error: any) {
      onError(error.message || 'Failed to connect Phantom wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      {!walletAddress ? (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center mb-4">Connect Your Wallet</h3>
          <p className="text-white/80 text-center text-sm mb-6">
            Connect your wallet to check $TEA balance and get instant access
          </p>
          
          <div className="grid gap-3">
            <Button
              onClick={connectWallet}
              disabled={isConnecting || isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4"
            >
              <Wallet className="mr-3 w-5 h-5" />
              {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
            </Button>
            
            <Button
              onClick={connectPhantom}
              disabled={isConnecting || isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4"
            >
              <Wallet className="mr-3 w-5 h-5" />
              {isConnecting ? 'Connecting...' : 'Connect Phantom'}
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-white/60 mt-4">
            <AlertCircle className="w-4 h-4" />
            <span>Hold 100+ $TEA for instant access</span>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-bold text-green-400">Wallet Connected</span>
            </div>
            <p className="text-sm text-white/80 font-mono">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
          
          <div className="bg-[#00D4AA]/20 border border-[#00D4AA]/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#00D4AA]">$TEA Balance</span>
              {isCheckingBalance ? (
                <div className="animate-spin w-4 h-4 border-2 border-[#00D4AA] border-t-transparent rounded-full" />
              ) : (
                <span className="font-bold text-2xl text-[#00D4AA]">{teaBalance.toLocaleString()}</span>
              )}
            </div>
            {teaBalance >= 100 ? (
              <p className="text-sm text-green-400 mt-2">✅ Eligible for instant access!</p>
            ) : (
              <div className="mt-2">
                <p className="text-sm text-orange-400">Need {100 - teaBalance} more $TEA for instant access</p>
                <Button
                  className="mt-2 w-full bg-gradient-to-r from-[#00D4AA] to-[#FF6B9D] text-white text-sm py-2"
                  onClick={() => window.open('https://uniswap.org', '_blank')}
                >
                  Buy $TEA <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WalletIntegration;
