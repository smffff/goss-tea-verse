
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Zap, 
  Trophy, 
  Shield,
  PieChart,
  DollarSign,
  Gift
} from 'lucide-react';
import { BrandHeader } from '@/components/brand/BrandElements';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const Tokenomics = () => {
  const tokenAllocation = [
    { category: 'Community Rewards', percentage: 40, amount: '400M', color: 'bg-vintage-red', description: 'Rewards for tea spillers, voters, and active community members' },
    { category: 'Development', percentage: 20, amount: '200M', color: 'bg-neon-pink', description: 'Platform development, AI improvements, and technical infrastructure' },
    { category: 'Marketing & Growth', percentage: 15, amount: '150M', color: 'bg-teal-400', description: 'Community growth, partnerships, and user acquisition' },
    { category: 'Team & Advisors', percentage: 10, amount: '100M', color: 'bg-purple-400', description: 'Core team and strategic advisors (1-year cliff, 2-year vest)' },
    { category: 'Liquidity', percentage: 10, amount: '100M', color: 'bg-yellow-400', description: 'DEX liquidity provision and market making' },
    { category: 'Treasury', percentage: 5, amount: '50M', color: 'bg-blue-400', description: 'DAO treasury for governance and future initiatives' }
  ];

  const utilities = [
    {
      icon: Trophy,
      title: 'Reputation Staking',
      description: 'Stake TEA to boost your credibility score and earn higher rewards for quality submissions.',
      color: 'text-vintage-red'
    },
    {
      icon: Zap,
      title: 'Premium Features',
      description: 'Access advanced analytics, early intel notifications, and exclusive community channels.',
      color: 'text-neon-pink'
    },
    {
      icon: Users,
      title: 'Governance Rights',
      description: 'Vote on platform changes, moderation policies, and community fund allocation.',
      color: 'text-teal-400'
    },
    {
      icon: Gift,
      title: 'Tip & Reward',
      description: 'Tip quality content creators and earn rewards for engaging with the community.',
      color: 'text-purple-400'
    },
    {
      icon: Shield,
      title: 'Verification Bonds',
      description: 'Bond TEA tokens to verify your identity for higher-tier content and exclusive access.',
      color: 'text-yellow-400'
    },
    {
      icon: DollarSign,
      title: 'Revenue Share',
      description: 'Holders receive a share of platform revenue from premium subscriptions and partnerships.',
      color: 'text-blue-400'
    }
  ];

  const rewardMechanics = [
    { action: 'Quality Tea Submission', reward: '50-500 TEA', frequency: 'Per submission' },
    { action: 'Accurate Voting', reward: '5-25 TEA', frequency: 'Per vote' },
    { action: 'Daily Engagement', reward: '10-50 TEA', frequency: 'Daily' },
    { action: 'Referral Bonus', reward: '100 TEA', frequency: 'Per referral' },
    { action: 'Weekly Top Spiller', reward: '1,000 TEA', frequency: 'Weekly' },
    { action: 'Community Moderation', reward: '25-100 TEA', frequency: 'Per action' }
  ];

  return (
    <Layout pageTitle="Tokenomics" pageDescription="Learn about TEA token utility, distribution, and rewards in the CTea ecosystem">
      <div className="min-h-screen bg-gradient-to-br from-newsprint via-pale-pink to-vintage-red-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-6xl animate-float">{BRAND_CONFIG.token.symbol}</div>
              <div>
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-vintage-red uppercase tracking-wider">
                  TEA Token
                </h1>
                <p className="text-xl text-tabloid-black/70 font-bold">
                  Fueling the Gossip Economy
                </p>
              </div>
            </div>
            <p className="text-lg md:text-xl text-tabloid-black/70 mt-6 max-w-3xl mx-auto leading-relaxed">
              The native token of CTea Newsroom. Reward quality intel, govern the platform, 
              and earn from the world's juiciest crypto gossip.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Badge variant="outline" className="border-vintage-red text-vintage-red px-4 py-2">
                <Coins className="w-4 h-4 mr-2" />
                Total Supply: 1B TEA
              </Badge>
              <Badge variant="outline" className="border-neon-pink text-neon-pink px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Deflationary Model
              </Badge>
            </div>
          </div>
        </section>

        {/* Token Allocation */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              Token Distribution
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Pie Chart Representation */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto relative">
                  {/* This would be replaced with an actual pie chart component */}
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-vintage-red via-neon-pink via-teal-400 via-purple-400 via-yellow-400 to-blue-400 animate-pulse-glow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white/90 backdrop-blur-sm rounded-full p-8">
                      <div className="text-4xl mb-2">☕</div>
                      <div className="font-bold text-vintage-red">1B TEA</div>
                      <div className="text-sm text-tabloid-black/70">Total Supply</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Allocation Breakdown */}
              <div className="space-y-4">
                {tokenAllocation.map((item, index) => (
                  <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-tabloid-black">{item.category}</h3>
                        <div className="text-right">
                          <div className="font-bold text-vintage-red">{item.percentage}%</div>
                          <div className="text-sm text-tabloid-black/70">{item.amount} TEA</div>
                        </div>
                      </div>
                      <Progress value={item.percentage} className="mb-2" />
                      <p className="text-sm text-tabloid-black/70">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Token Utility */}
        <section className="py-16 bg-gradient-to-r from-vintage-red/5 to-neon-pink/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              Token Utility
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {utilities.map((utility, index) => (
                <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <utility.icon className={`w-8 h-8 ${utility.color} mb-4`} />
                    <CardTitle className="text-xl font-headline text-tabloid-black">
                      {utility.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-tabloid-black/70 leading-relaxed">
                      {utility.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reward Mechanics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              Earn TEA Tokens
            </h2>
            <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline text-vintage-red">
                  Reward Structure
                </CardTitle>
                <p className="text-tabloid-black/70">
                  Multiple ways to earn TEA tokens by contributing to the community
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rewardMechanics.map((reward, index) => (
                    <div key={index} className="p-4 border border-vintage-red/20 rounded-lg bg-gradient-to-br from-newsprint to-pale-pink">
                      <h3 className="font-bold text-tabloid-black mb-2">{reward.action}</h3>
                      <div className="text-2xl font-bold text-vintage-red mb-1">{reward.reward}</div>
                      <div className="text-sm text-tabloid-black/60">{reward.frequency}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Deflationary Mechanics */}
        <section className="py-16 bg-gradient-to-r from-teal-400/5 to-purple-400/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              Deflationary Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-headline text-vintage-red flex items-center">
                    <Zap className="w-6 h-6 mr-2" />
                    Token Burns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-tabloid-black/70">
                    <li>• 1% of all premium subscriptions</li>
                    <li>• 0.5% of all tip transactions</li>
                    <li>• 2% of advertising revenue</li>
                    <li>• Quarterly buyback & burn events</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-headline text-vintage-red flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2" />
                    Supply Reduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-tabloid-black/70">Target Annual Burn</span>
                        <span className="font-bold text-vintage-red">2-5%</span>
                      </div>
                      <Progress value={3.5} className="mb-2" />
                    </div>
                    <p className="text-sm text-tabloid-black/60">
                      Gradual supply reduction increases scarcity and value for long-term holders.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline text-vintage-red mb-6">
              Start Earning TEA Today
            </h2>
            <p className="text-lg text-tabloid-black/70 mb-8 max-w-2xl mx-auto">
              Join the gossip economy. Spill tea, vote on submissions, and earn tokens 
              for building the world's most valuable crypto intel network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold px-8 py-3"
                onClick={() => window.location.href = '/spill'}
              >
                <Coins className="w-5 h-5 mr-2" />
                Start Earning TEA
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white font-bold px-8 py-3"
                onClick={() => window.open(BRAND_CONFIG.social.discord, '_blank')}
              >
                Join Community
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Tokenomics;
