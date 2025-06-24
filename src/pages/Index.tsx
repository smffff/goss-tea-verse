import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TeaCup from '@/components/TeaCup';
import HypeCard from '@/components/HypeCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import WeeklyCampaign from '@/components/WeeklyCampaign';
import AICommentary from '@/components/AICommentary';
import OGBadge from '@/components/OGBadge';
import { ArrowRight, Sparkles, Users, Zap, Coffee, TrendingUp, Award, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // TODO: Replace mockLeaderboard with live leaderboard data from backend
  const mockLeaderboard = [
    { rank: 1, username: "SpillMaster3000", score: 15420, badge: 'og' as const, streak: 7, isRising: true },
    { rank: 2, username: "MemeLordSupreme", score: 12350, badge: 'meme-lord' as const, streak: 5 },
    { rank: 3, username: "DramaQueenCT", score: 11200, badge: 'viral-queen' as const, streak: 3, isRising: true },
    { rank: 4, username: "ChaosAgent", score: 9800, badge: 'chaos-agent' as const, streak: 12 },
    { rank: 5, username: "TeaSpiller", score: 8500, badge: 'drama-king' as const, streak: 2 }
  ];

  // TODO: Replace mockAICommentary with live AI commentary from backend
  const mockAICommentary = "Okay this is absolutely UNHINGED behavior and honestly? We're here for it. The audacity, the drama, the sheer chaos energy... *chef's kiss* 💀 This is why we can't have nice things in crypto, and that's exactly what makes it spicy 🌶️";

  return (
    <div className="min-h-screen bg-gradient-dark retro-grid">
      {/* Hero Section - Mobile First */}
      <section className="relative section-responsive">
        <div className="absolute inset-0 pointer-events-none" style={{background: 'linear-gradient(135deg, #ffb6e6 0%, #ffddb0 40%, #b6f7ef 100%)'}}></div>
        <div className="container-responsive relative z-10">
          <div className="text-center">
            {/* Logo - Mobile optimized */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <img 
                src="/ctea-logo-full.png" 
                alt="CTEA News Logo" 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48" 
              />
            </div>
            
            {/* Main Heading - Mobile responsive */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 animate-glow font-montserrat">
              CTea Newsroom
            </h1>
            
            {/* Subtitle - Mobile responsive */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-accent mb-6 sm:mb-8 font-montserrat">
              Where Crypto Twitter Comes to Spill.
            </p>
            
            {/* CTA Buttons - Mobile responsive */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Button 
                className="bg-gradient-ctea text-white font-bold btn-responsive-lg w-full sm:w-auto"
                onClick={() => navigate('/feed')}
              >
                <TrendingUp className="icon-responsive mr-2" />
                Browse Tea
              </Button>
              <Button 
                variant="outline"
                className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 btn-responsive-lg w-full sm:w-auto"
                onClick={() => navigate('/submit')}
              >
                <Plus className="icon-responsive mr-2" />
                Spill Tea Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Features Showcase - Mobile First */}
      <section className="section-responsive border-y border-ctea-teal/30 bg-ctea-darker/30">
        <div className="container-responsive">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
            Beta Features • Join Early & Shape the Chaos
          </h2>
          
          {/* Features Grid - Mobile responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center card-responsive bg-ctea-dark/50 border border-ctea-teal/20 rounded-lg">
              <Award className="icon-responsive-lg text-ctea-yellow mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Earn $TEA Points</h3>
              <p className="text-gray-300 text-sm sm:text-base">Get rewarded for viral content and community engagement</p>
            </div>
            <div className="text-center card-responsive bg-ctea-dark/50 border border-ctea-teal/20 rounded-lg">
              <Sparkles className="icon-responsive-lg text-ctea-purple mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">AI Commentary</h3>
              <p className="text-gray-300 text-sm sm:text-base">CTeaBot provides spicy takes on all the drama</p>
            </div>
            <div className="text-center card-responsive bg-ctea-dark/50 border border-ctea-teal/20 rounded-lg sm:col-span-2 lg:col-span-1">
              <Users className="icon-responsive-lg text-ctea-pink mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Build Reputation</h3>
              <p className="text-gray-300 text-sm sm:text-base">Earn $SOAP credibility through quality moderation</p>
            </div>
          </div>
          
          {/* Live Stats - Mobile responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-ctea-teal mb-1 sm:mb-2">2,420</div>
              <div className="text-gray-400 text-xs sm:text-sm">Beta Users</div>
            </div>
            <div className="card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-ctea-pink mb-1 sm:mb-2">15.7K</div>
              <div className="text-gray-400 text-xs sm:text-sm">Hot Takes</div>
            </div>
            <div className="card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-ctea-yellow mb-1 sm:mb-2">420K</div>
              <div className="text-gray-400 text-xs sm:text-sm">$TEA Points</div>
            </div>
            <div className="card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-ctea-orange mb-1 sm:mb-2">69</div>
              <div className="text-gray-400 text-xs sm:text-sm">Viral Memes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Mobile First */}
      <main className="section-responsive">
        <div className="container-responsive">
          {/* Mobile: Single Column Layout */}
          <div className="block lg:hidden space-y-6">
            {/* Weekly Campaign - Mobile */}
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
            
            {/* AI Commentary - Mobile */}
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
            
            {/* Leaderboard - Mobile */}
            <LeaderboardCard
              title="CTea Hall of Fame"
              entries={mockLeaderboard}
              period="weekly"
              resetTime="4 days"
            />
            
            {/* Active Campaigns - Mobile */}
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
              
              <div className="grid gap-4">
                <AICommentary
                  content="Not the hero we deserved, but definitely the chaos we needed 💀 Peak CT energy right here"
                  type="memy"
                />
                
                <AICommentary
                  content="This is actually big brain if you think about it. The meta implications are chef's kiss"
                  type="smart"
                />
              </div>
            </div>

            {/* Right Column - Leaderboards */}
            <div className="space-y-6">
              <LeaderboardCard
                title="CTea Hall of Fame"
                entries={mockLeaderboard}
                period="weekly"
                resetTime="4 days"
              />
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-ctea-orange" />
                  Trending Topics
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                    <span className="text-white font-medium">#SolanaSzn</span>
                    <Badge className="bg-ctea-pink text-white text-xs">🔥 Hot</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                    <span className="text-white font-medium">#EthereumETF</span>
                    <Badge className="bg-ctea-yellow text-ctea-dark text-xs">📈 Rising</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                    <span className="text-white font-medium">#MemeCoins</span>
                    <Badge className="bg-ctea-purple text-white text-xs">💎 Viral</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
