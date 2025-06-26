import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Wallet, 
  TrendingUp, 
  Gift, 
  Send, 
  RefreshCw,
  Coffee,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useTeaTokens } from '@/hooks/useTeaTokens';
import { formatDistanceToNow } from 'date-fns';

interface WalletBalanceProps {
  walletAddress: string;
  className?: string;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ 
  walletAddress, 
  className = "" 
}) => {
  const { balance, transactions, isLoading, refreshBalance } = useTeaTokens(walletAddress);
  const [activeTab, setActiveTab] = useState('balance');

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'spill':
        return <Coffee className="w-4 h-4" />;
      case 'tip':
        return <Gift className="w-4 h-4" />;
      case 'reward':
        return <TrendingUp className="w-4 h-4" />;
      case 'penalty':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Send className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'spill':
        return 'text-blue-600';
      case 'tip':
        return 'text-purple-600';
      case 'reward':
        return 'text-green-600';
      case 'penalty':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Card className={`bg-pale-pink border-vintage-red/30 ${className}`}>
        <CardHeader>
          <CardTitle className="text-tabloid-black flex items-center gap-2">
            <Wallet className="w-5 h-5 text-vintage-red" />
            Loading Wallet...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!balance) {
    return (
      <Card className={`bg-pale-pink border-vintage-red/30 ${className}`}>
        <CardHeader>
          <CardTitle className="text-tabloid-black flex items-center gap-2">
            <Wallet className="w-5 h-5 text-vintage-red" />
            No Wallet Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Connect your wallet to view $TEA balance</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-pale-pink border-vintage-red/30 ${className}`}>
      <CardHeader>
        <CardTitle className="text-tabloid-black flex items-center gap-2">
          <Wallet className="w-5 h-5 text-vintage-red" />
          $TEA Wallet
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshBalance}
            className="ml-auto"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardTitle>
        <p className="text-sm text-gray-600 font-mono">
          {formatAddress(walletAddress)}
        </p>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="balance" className="space-y-4">
            {/* Main Balance */}
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-3xl font-bold text-vintage-red">
                {balance.tea_balance.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">$TEA Balance</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-semibold text-green-600">
                  {balance.total_earned.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Total Earned</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-lg font-semibold text-red-600">
                  {balance.total_spent.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Total Spent</div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="space-y-2">
              <h4 className="font-semibold text-tabloid-black">Activity Summary</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-semibold text-blue-600">{balance.spills_posted}</div>
                  <div className="text-xs text-gray-600">Spills</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-semibold text-purple-600">{balance.tips_given}</div>
                  <div className="text-xs text-gray-600">Tips</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-semibold text-green-600">{balance.rewards_received}</div>
                  <div className="text-xs text-gray-600">Rewards</div>
                </div>
              </div>
            </div>

            {balance.last_transaction_at && (
              <div className="text-xs text-gray-500 text-center">
                Last activity: {formatDistanceToNow(new Date(balance.last_transaction_at))} ago
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Wallet className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No transactions yet</p>
                    <p className="text-xs">Start spilling tea to earn $TEA tokens!</p>
                  </div>
                ) : (
                  transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${getActionColor(tx.action)}`}>
                          {getActionIcon(tx.action)}
                        </div>
                        <div>
                          <div className="font-medium capitalize">
                            {tx.action}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(tx.created_at))} ago
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-semibold ${
                          tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount} $TEA
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(tx.status)}
                          <span className="text-xs text-gray-500 capitalize">
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WalletBalance; 