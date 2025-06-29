import React, { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { secureLog } from '@/utils/secureLogging';

interface TokenBalance {
  tea: number;
  xp: number;
  level: number;
}

const TokenIntegration: React.FC = () => {
  const { isConnected, walletAddress, connect, balance } = useWallet();
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState<TokenBalance>({
    tea: 0,
    xp: 0,
    level: 1
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && walletAddress) {
      fetchTokenBalance();
    }
  }, [isConnected, walletAddress]);

  const fetchTokenBalance = async () => {
    try {
      setLoading(true);
      // This would typically fetch from your blockchain or API
      // For now, we'll simulate token data
      const mockBalance: TokenBalance = {
        tea: Math.floor(Math.random() * 1000),
        xp: Math.floor(Math.random() * 5000),
        level: Math.floor(Math.random() * 10) + 1
      };
      setTokenBalance(mockBalance);
    } catch (error) {
      secureLog.error('Failed to fetch token balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      secureLog.error('Failed to connect wallet:', error);
    }
  };

  const handleClaimRewards = async () => {
    try {
      setLoading(true);
      // This would typically interact with your smart contract
      secureLog.info('Claiming rewards for user:', user?.id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update balance
      await fetchTokenBalance();
    } catch (error) {
      secureLog.error('Failed to claim rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-ctea-dark border-ctea-teal/30">
        <CardHeader>
          <CardTitle className="text-ctea-teal flex items-center gap-2">
            🫖 TEA Token Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center space-y-4">
              <p className="text-gray-400">
                Connect your wallet to view and manage your TEA tokens
              </p>
              <Button
                onClick={handleConnectWallet}
                className="bg-ctea-teal hover:bg-ctea-teal/80 text-white"
              >
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-ctea-darker p-4 rounded-lg border border-ctea-teal/20">
                  <div className="text-2xl font-bold text-ctea-teal">
                    {tokenBalance.tea}
                  </div>
                  <div className="text-sm text-gray-400">TEA Tokens</div>
                </div>
                
                <div className="bg-ctea-darker p-4 rounded-lg border border-ctea-purple/20">
                  <div className="text-2xl font-bold text-ctea-purple">
                    {tokenBalance.xp}
                  </div>
                  <div className="text-sm text-gray-400">Experience Points</div>
                </div>
                
                <div className="bg-ctea-darker p-4 rounded-lg border border-ctea-pink/20">
                  <div className="text-2xl font-bold text-ctea-pink">
                    Level {tokenBalance.level}
                  </div>
                  <div className="text-sm text-gray-400">User Level</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={handleClaimRewards}
                  disabled={loading}
                  className="bg-ctea-purple hover:bg-ctea-purple/80 text-white"
                >
                  {loading ? 'Claiming...' : 'Claim Rewards'}
                </Button>
                
                <Button
                  onClick={fetchTokenBalance}
                  disabled={loading}
                  variant="outline"
                  className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                >
                  Refresh Balance
                </Button>
              </div>
              
              <div className="text-xs text-gray-500">
                Wallet: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenIntegration; 