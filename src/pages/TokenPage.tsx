import React from 'react';
import Layout from '@/components/Layout';
import TokenIntegration from '@/components/TokenIntegration';
import { Coins, TrendingUp, Lock, Award } from 'lucide-react';

const TokenPage = () => {
  return (
    <Layout>
      {/* Header Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 rounded-full border border-ctea-yellow/30">
                <Coins className="w-8 h-8 text-ctea-yellow" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
              $TEA Token Hub
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Manage your $TEA tokens, stake for rewards, and participate in platform governance. 
              Your tokens, your power, your community.
            </p>
            
            {/* Token Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="p-4 bg-gradient-to-br from-ctea-yellow/10 to-ctea-orange/10 rounded-lg border border-ctea-yellow/20">
                <div className="text-2xl font-bold text-ctea-yellow">100M</div>
                <div className="text-sm text-gray-400">Total Supply</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-ctea-purple/10 to-ctea-pink/10 rounded-lg border border-ctea-purple/20">
                <div className="text-2xl font-bold text-ctea-purple">45.2M</div>
                <div className="text-sm text-gray-400">Circulating</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">1%</div>
                <div className="text-sm text-gray-400">Staking APY</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-ctea-teal/10 to-ctea-blue/10 rounded-lg border border-ctea-teal/20">
                <div className="text-2xl font-bold text-ctea-teal">12.5K</div>
                <div className="text-sm text-gray-400">Holders</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-gradient-to-br from-ctea-purple/10 to-ctea-pink/10 rounded-lg border border-ctea-purple/20">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-ctea-purple" />
                <h3 className="text-lg font-bold text-white">Stake & Earn</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Lock your $TEA tokens to earn passive rewards and unlock exclusive platform features.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-ctea-yellow/10 to-ctea-orange/10 rounded-lg border border-ctea-yellow/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-ctea-yellow" />
                <h3 className="text-lg font-bold text-white">Boost Content</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Use $TEA to boost your submissions and increase visibility across the platform.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-ctea-teal/10 to-ctea-blue/10 rounded-lg border border-ctea-teal/20">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-ctea-teal" />
                <h3 className="text-lg font-bold text-white">Governance</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Participate in platform decisions and vote on proposals that shape the future of CTea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Integration Component */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TokenIntegration />
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why $TEA Token?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              $TEA is more than just a token - it's the backbone of the CTea ecosystem, 
              powering everything from content boosting to community governance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-6 h-6 text-ctea-yellow" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Utility First</h3>
              <p className="text-gray-400 text-sm">
                Every $TEA token has real utility within the platform ecosystem.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-ctea-purple" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Staking Rewards</h3>
              <p className="text-gray-400 text-sm">
                Earn passive income by staking your tokens and supporting the network.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-ctea-teal/20 to-ctea-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-ctea-teal" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Content Boosting</h3>
              <p className="text-gray-400 text-sm">
                Increase visibility and engagement for your submissions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Governance Rights</h3>
              <p className="text-gray-400 text-sm">
                Vote on platform proposals and help shape the future of CTea.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TokenPage; 