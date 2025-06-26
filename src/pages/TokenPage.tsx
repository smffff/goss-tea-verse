import React from 'react';
import Layout from '@/components/Layout';
import TokenIntegration from '@/components/TokenIntegration';
import { Coins, TrendingUp, Lock, Award, Users, Shield, Bot, Zap, PieChart, BarChart3 } from 'lucide-react';

const TokenPage = () => {
  const tokenStats = [
    {
      metric: '100M',
      label: 'Total Supply',
      description: '$TEA tokens',
      icon: Coins,
      color: 'from-ctea-yellow to-ctea-orange'
    },
    {
      metric: '45.2M',
      label: 'Circulating',
      description: 'Currently in wallets',
      icon: TrendingUp,
      color: 'from-ctea-purple to-ctea-pink'
    },
    {
      metric: '1%',
      label: 'Staking APY',
      description: 'Annual yield',
      icon: Lock,
      color: 'from-green-500 to-green-600'
    },
    {
      metric: '12.5K',
      label: 'Holders',
      description: 'Active users',
      icon: Users,
      color: 'from-ctea-teal to-ctea-blue'
    }
  ];

  const tokenFeatures = [
    {
      title: 'Content Rewards',
      description: 'Earn $TEA for quality submissions and community engagement',
      icon: Award,
      rewards: [
        '5 $TEA per approved submission',
        '2 $TEA per helpful upvote',
        '1 $TEA per community engagement'
      ]
    },
    {
      title: 'Staking & Governance',
      description: 'Stake tokens to earn rewards and participate in platform decisions',
      icon: Lock,
      rewards: [
        '1% APY on staked tokens',
        'Governance voting rights',
        'Exclusive platform features'
      ]
    },
    {
      title: 'Content Boosting',
      description: 'Use tokens to increase visibility and engagement for your posts',
      icon: TrendingUp,
      rewards: [
        'Boost submission visibility',
        'Increase engagement rates',
        'Priority placement in feeds'
      ]
    }
  ];

  const soapTokenInfo = {
    title: '$SOAP Token',
    description: 'Credibility and reputation token that tracks your standing in the community',
    features: [
      'Credibility tracking and scoring',
      'Feature unlocking based on reputation',
      'Moderation rights and privileges',
      'Community governance participation',
      'Dynamic supply based on activity'
    ],
    earning: [
      'Earn through quality submissions',
      'Build reputation over time',
      'Community recognition',
      'Consistent engagement'
    ]
  };

  const tokenomics = [
    {
      category: 'Community Rewards',
      percentage: 40,
      amount: '40M $TEA',
      description: 'Distributed to users for content creation and engagement'
    },
    {
      category: 'Staking Rewards',
      percentage: 25,
      amount: '25M $TEA',
      description: 'Reserved for staking incentives and governance participation'
    },
    {
      category: 'Platform Development',
      percentage: 20,
      amount: '20M $TEA',
      description: 'Funding for ongoing development and feature expansion'
    },
    {
      category: 'Team & Advisors',
      percentage: 15,
      amount: '15M $TEA',
      description: 'Allocated to team members and strategic advisors'
    }
  ];

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
              {tokenStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`p-4 bg-gradient-to-br ${stat.color}/10 rounded-lg border border-${stat.color.split('-')[1]}/20`}>
                    <div className="flex items-center justify-center mb-2">
                      <Icon className={`w-6 h-6 text-${stat.color.split('-')[1]}`} />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.metric}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Token Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tokenFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-6 bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-ctea-teal" />
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.rewards.map((reward, rewardIndex) => (
                      <div key={rewardIndex} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-ctea-teal rounded-full"></div>
                        {reward}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOAP Token Section */}
      <section className="py-16 bg-gradient-to-br from-ctea-teal/10 to-ctea-purple/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {soapTokenInfo.title}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {soapTokenInfo.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-ctea-dark/30 rounded-lg p-6 border border-ctea-teal/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-ctea-teal" />
                Features & Benefits
              </h3>
              <div className="space-y-3">
                {soapTokenInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-ctea-teal rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-ctea-dark/30 rounded-lg p-6 border border-ctea-teal/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-ctea-teal" />
                How to Earn
              </h3>
              <div className="space-y-3">
                {soapTokenInfo.earning.map((method, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-ctea-teal rounded-full"></div>
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Distribution */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Token Distribution
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transparent allocation of $TEA tokens across the ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokenomics.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 rounded-lg p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-ctea-teal mb-2">{category.percentage}%</div>
                <h3 className="text-lg font-bold text-white mb-2">{category.category}</h3>
                <div className="text-sm text-ctea-yellow font-semibold mb-3">{category.amount}</div>
                <p className="text-gray-300 text-sm">{category.description}</p>
              </div>
            ))}
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