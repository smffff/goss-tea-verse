import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TeaCup from '@/components/TeaCup';
import HypeCard from '@/components/HypeCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import WeeklyCampaign from '@/components/WeeklyCampaign';
import AICommentary from '@/components/AICommentary';
import Layout from '@/components/Layout';
import { ArrowRight, Sparkles, Users, Zap, Coffee, TrendingUp, Award, Plus, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Mock data - TODO: Replace with live data from backend
  const mockLeaderboard = [
    { rank: 1, username: "SpillMaster3000", score: 15420, badge: 'og' as const, streak: 7, isRising: true },
    { rank: 2, username: "MemeLordSupreme", score: 12350, badge: 'meme-lord' as const, streak: 5 },
    { rank: 3, username: "DramaQueenCT", score: 11200, badge: 'viral-queen' as const, streak: 3, isRising: true },
    { rank: 4, username: "ChaosAgent", score: 9800, badge: 'chaos-agent' as const, streak: 12 },
    { rank: 5, username: "TeaSpiller", score: 8500, badge: 'drama-king' as const, streak: 2 }
  ];

  const mockAICommentary = "Okay this is absolutely UNHINGED behavior and honestly? We're here for it. The audacity, the drama, the sheer chaos energy... *chef's kiss* 💀 This is why we can't have nice things in crypto, and that's exactly what makes it spicy 🌶️";

  const stats = [
    { label: 'Beta Users', value: '2,420', color: 'text-ctea-teal' },
    { label: 'Hot Takes', value: '15.7K', color: 'text-ctea-pink' },
    { label: '$TEA Points', value: '420K', color: 'text-ctea-yellow' },
    { label: 'Viral Memes', value: '69', color: 'text-ctea-orange' }
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6 text-ctea-yellow" />,
      title: 'Earn $TEA Points',
      description: 'Get rewarded for viral content and community engagement'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-ctea-purple" />,
      title: 'AI Commentary',
      description: 'CTeaBot provides spicy takes on all the drama'
    },
    {
      icon: <Users className="w-6 h-6 text-ctea-pink" />,
      title: 'Build Reputation',
      description: 'Earn $SOAP credibility through quality moderation'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 pointer-events-none" style={{background: 'linear-gradient(135deg, #ffb6e6 0%, #ffddb0 40%, #b6f7ef 100%)'}}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src="/ctea-logo-full.png" 
                alt="CTEA News Logo" 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" 
              />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-glow font-montserrat">
              CTea Newsroom
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-accent mb-8 font-montserrat">
              Where Crypto Twitter Comes to Spill.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="bg-gradient-ctea text-white font-bold px-8 py-3 text-lg w-full sm:w-auto"
                onClick={() => navigate('/feed')}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Browse Tea
              </Button>
              <Button 
                variant="outline"
                className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 px-8 py-3 text-lg w-full sm:w-auto"
                onClick={() => navigate('/submit')}
              >
                <Plus className="w-5 h-5 mr-2" />
                Spill Tea Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Features Showcase */}
      <section className="py-16 sm:py-24 border-y border-ctea-teal/30 bg-ctea-darker/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Beta Features • Join Early & Shape the Chaos
          </h2>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-ctea-dark/50 border border-ctea-teal/20 rounded-lg p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Live Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Single Column Layout */}
          <div className="block lg:hidden space-y-8">
            {/* Weekly Campaign */}
            <WeeklyCampaign
              title="Monday Meme Dump"
              description="Drop your spiciest crypto memes and gossip. Winner gets eternal glory and bragging rights on CT."
              theme="meme"
              startDate={new Date('2024-01-01')}
              endDate={new Date('2024-01-07')}
              participants={1337}
              topPrize="Hall of Fame"
              isActive={true}
              submissions={420}
            />
            
            {/* AI Commentary */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-ctea-yellow" />
                CTeaBot Hot Takes
              </h3>
              <AICommentary
                content={mockAICommentary}
                type="savage"
                onRegenerate={() => console.log('Regenerating...')}
              />
            </div>
            
            {/* Leaderboard */}
            <LeaderboardCard
              title="CTea Hall of Fame"
              entries={mockLeaderboard}
              period="weekly"
              resetTime="4 days"
            />
            
            {/* Active Campaigns */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ctea-teal" />
                Active Campaigns
              </h3>
              
              <HypeCard
                title="Tuesday Tea Time"
                description="Spill the hottest gossip from the week"
                type="campaign"
                isActive={true}
                participants={856}
                timeLeft="3 days"
                featured
              />
              
              <HypeCard
                title="Friday FUD or FACT?"
                description="Debunk or confirm the wildest rumors"
                type="challenge"
                isActive={false}
                participants={642}
              />
            </div>
          </div>

          {/* Desktop: Three Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {/* Left Column - Weekly Campaign */}
            <div className="space-y-6">
              <WeeklyCampaign
                title="Monday Meme Dump"
                description="Drop your spiciest crypto memes and gossip. Winner gets eternal glory and bragging rights on CT."
                theme="meme"
                startDate={new Date('2024-01-01')}
                endDate={new Date('2024-01-07')}
                participants={1337}
                topPrize="Hall of Fame"
                isActive={true}
                submissions={420}
              />
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-ctea-teal" />
                  Active Campaigns
                </h3>
                
                <HypeCard
                  title="Tuesday Tea Time"
                  description="Spill the hottest gossip from the week"
                  type="campaign"
                  isActive={true}
                  participants={856}
                  timeLeft="3 days"
                  featured
                />
                
                <HypeCard
                  title="Friday FUD or FACT?"
                  description="Debunk or confirm the wildest rumors"
                  type="challenge"
                  isActive={false}
                  participants={642}
                />
              </div>
            </div>

            {/* Middle Column - AI Commentary */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-ctea-yellow" />
                  CTeaBot Hot Takes
                </h3>
                <AICommentary
                  content={mockAICommentary}
                  type="savage"
                  onRegenerate={() => console.log('Regenerating...')}
                />
              </div>
              
              <Card className="bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-ctea-teal" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-ctea text-white font-bold"
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
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Leaderboard */}
            <div className="space-y-6">
              <LeaderboardCard
                title="CTea Hall of Fame"
                entries={mockLeaderboard}
                period="weekly"
                resetTime="4 days"
              />
              
              <Card className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-ctea-teal" />
                    Trending Topics
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">#SolanaDrama</span>
                      <span className="text-ctea-teal">🔥</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">#NFTChaos</span>
                      <span className="text-ctea-teal">🔥</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">#DeFiRug</span>
                      <span className="text-ctea-teal">🔥</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
