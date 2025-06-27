import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, RefreshCw, Coins } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/components/WalletProvider';
import { useToast } from '@/hooks/use-toast';

const WalletStatus = () => {
  const { user, loading, refreshBalance } = useAuth();
  const { wallet, connectWallet } = useWallet();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connectWallet('metamask');
    } catch (error: any) {
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect wallet',
        variant: 'destructive',
      });
    }
  };

  const handleRefreshBalance = async () => {
    try {
      await refreshBalance();
      toast({
        title: 'Balance Updated',
        description: 'Your balance has been refreshed',
      });
    } catch (error: any) {
      toast({
        title: 'Refresh Failed',
        description: error.message || 'Failed to refresh balance',
        variant: 'destructive',
      });
    }
  };

  if (!wallet.isConnected) {
    return (
      <div className="flex justify-center mb-6">
        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Wallet className="w-4 h-4" />
              <span className="text-sm">Connect wallet to earn $TEA rewards</span>
            </div>
            <Button 
              onClick={handleConnect}
              size="sm"
              className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600"
            >
              Connect
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center mb-6">
        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center gap-2 text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading wallet data...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-6">
      <Card className="bg-gradient-to-r from-teal-500/20 to-purple-500/20 border-teal-500/30 p-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-teal-400">
                {user?.token_balance?.toLocaleString() || '0'}
              </div>
              <div className="text-xs text-gray-400">$TEA</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">0</div>
              <div className="text-xs text-gray-400">$SOAP</div>
            </div>
            {user?.verification_level && (
              <div className="text-center">
                <div className="text-xs text-green-400 font-medium">
                  {user.verification_level === 'wallet_connected' ? '✓ Verified' : user.verification_level}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefreshBalance}
              size="sm"
              variant="ghost"
              className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            
            {wallet.address && (
              <div className="text-xs text-gray-400 font-mono">
                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
              </div>
            )}
          </div>
        </div>
        
        {user?.token_balance && user.token_balance > 0 && (
          <div className="mt-2 text-xs text-center text-green-400">
            <Coins className="w-3 h-3 inline mr-1" />
            Earning rewards for your participation!
          </div>
        )}
      </Card>
    </div>
  );
};

export default WalletStatus;
