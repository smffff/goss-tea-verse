
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap, Users } from 'lucide-react';
import { useWallet } from '@/components/WalletProvider';

const EnhancedFeedHeader = () => {
  const { wallet } = useWallet();
  
  const stats = [
    { label: 'Hot Takes Today', value: '1,247', icon: TrendingUp, color: 'text-ctea-teal' },
    { label: 'Active Users', value: '2,420', icon: Users, color: 'text-ctea-purple' },
    { label: 'Viral Posts', value: '69', icon: Zap, color: 'text-ctea-yellow' }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
            Hot Takes & Drama ☕
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            The freshest tea from the crypto world. Upvote the spiciest takes and join the conversation.
          </p>

          {/* Wallet Status */}
          {wallet.isConnected && (
            <div className="flex justify-center mb-6">
              <Card className="bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20 border-ctea-teal/30 p-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-ctea-teal">{wallet.balance.tea}</div>
                    <div className="text-xs text-gray-400">$TEA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-ctea-purple">{wallet.balance.soap}</div>
                    <div className="text-xs text-gray-400">$SOAP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-ctea-yellow">{wallet.balance.eth}</div>
                    <div className="text-xs text-gray-400">ETH</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Live Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="bg-ctea-darker/50 border-ctea-teal/30 text-center p-4">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                <div className={`text-xl font-bold ${color}`}>{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeedHeader;
