
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedTeaFeed from '@/components/EnhancedTeaFeed';
import Leaderboard from '@/components/Leaderboard';
import TokenGatedContent from '@/components/TokenGatedContent';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap, Users, Plus, Filter, Trophy, Crown, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/components/WalletProvider';
import BetaDisclaimer from '@/components/BetaDisclaimer';

const Feed = () => {
  const navigate = useNavigate();
  const { wallet } = useWallet();
  
  const stats = [
    { label: 'Hot Takes Today', value: '1,247', icon: TrendingUp, color: 'text-ctea-teal' },
    { label: 'Active Users', value: '2,420', icon: Users, color: 'text-ctea-purple' },
    { label: 'Viral Posts', value: '69', icon: Zap, color: 'text-ctea-yellow' }
  ];

  return (
    <Layout>
      {/* Enhanced Header Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
              CTea Feed ☕
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              The hottest crypto gossip, fresh from the blockchain
            </p>

            {/* Beta Disclaimer */}
            <BetaDisclaimer variant="inline" className="mb-6" />

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

            {/* Live Feed Notice */}
            <div className="bg-gradient-to-r from-green-500/20 to-ctea-teal/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Live Feed</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Real-time updates
                </Badge>
              </div>
              <p className="text-gray-300 text-sm mt-2">
                New submissions appear instantly! Your tea will be visible to the community immediately after posting.
              </p>
            </div>
          </div>

          {/* Enhanced CTA */}
          <Card className="bg-gradient-to-br from-ctea-pink/20 to-ctea-purple/20 border-ctea-pink/30 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-2">Got Some Tea to Spill? ☕</h3>
                <p className="text-gray-300">Share your hottest takes and earn $TEA points for viral content!</p>
                {wallet.isConnected && (
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Wallet Connected
                    </Badge>
                    <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30">
                      Earning Enabled
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button 
                  className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold w-full sm:w-auto"
                  onClick={() => navigate('/submit')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Spill Tea
                </Button>
                <Button 
                  variant="outline"
                  className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 w-full sm:w-auto"
                  onClick={() => navigate('/campaigns')}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  View Campaigns
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Feed Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Single Column Feed */}
          <div className="block lg:hidden">
            <EnhancedTeaFeed />
          </div>

          {/* Desktop: Two Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {/* Main Feed - 3 columns */}
            <div className="lg:col-span-3">
              <EnhancedTeaFeed />
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Token Gated Premium Content */}
              <TokenGatedContent
                requiredTea={100}
                requiredSoap={50}
                contentType="premium"
                title="Premium Tea Access"
                description="Get exclusive access to verified insider information and premium gossip."
              >
                <Card className="bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30 p-4">
                  <h4 className="font-bold text-white mb-2">🔥 Exclusive Insider Tea</h4>
                  <p className="text-sm text-gray-300">Premium content for verified members</p>
                </Card>
              </TokenGatedContent>

              {/* Leaderboard */}
              <Leaderboard 
                title="Top Contributors" 
                period="weekly" 
                maxEntries={5}
                showRefresh={true}
              />

              {/* Trending Topics */}
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-ctea-teal" />
                    Trending Topics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                      <span className="text-white font-medium text-sm">#SolanaSzn</span>
                      <Badge className="bg-ctea-pink text-white text-xs">🔥 Hot</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                      <span className="text-white font-medium text-sm">#EthereumETF</span>
                      <Badge className="bg-ctea-yellow text-ctea-dark text-xs">📈 Rising</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                      <span className="text-white font-medium text-sm">#MemeCoins</span>
                      <Badge className="bg-ctea-purple text-white text-xs">💎 Viral</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-ctea-yellow" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold"
                      onClick={() => navigate('/submit')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Spill New Tea
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                      onClick={() => navigate('/campaigns')}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Join Campaign
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Become Moderator
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Community Stats */}
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-ctea-pink" />
                    Community Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Total Posts</span>
                      <span className="text-white font-bold">15,742</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Active Users</span>
                      <span className="text-white font-bold">2,420</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">$TEA Distributed</span>
                      <span className="text-ctea-yellow font-bold">420K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Uptime</span>
                      <span className="text-green-400 font-bold">99.2%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Feed;
