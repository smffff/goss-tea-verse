
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TeaCup from '@/components/TeaCup';
import HypeCard from '@/components/HypeCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import WeeklyCampaign from '@/components/WeeklyCampaign';
import AICommentary from '@/components/AICommentary';
import OGBadge from '@/components/OGBadge';
import { ArrowRight, Sparkles, Users, Zap, Coffee, TrendingUp, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockLeaderboard = [
    { rank: 1, username: "SpillMaster3000", score: 15420, badge: 'og' as const, streak: 7, isRising: true },
    { rank: 2, username: "MemeLordSupreme", score: 12350, badge: 'meme-lord' as const, streak: 5 },
    { rank: 3, username: "DramaQueenCT", score: 11200, badge: 'viral-queen' as const, streak: 3, isRising: true },
    { rank: 4, username: "ChaosAgent", score: 9800, badge: 'chaos-agent' as const, streak: 12 },
    { rank: 5, username: "TeaSpiller", score: 8500, badge: 'drama-king' as const, streak: 2 }
  ];

  const mockAICommentary = "Okay this is absolutely UNHINGED behavior and honestly? We're here for it. The audacity, the drama, the sheer chaos energy... *chef's kiss* 💀 This is why we can't have nice things in crypto, and that's exactly what makes it spicy 🌶️";

  return (
    <div className="min-h-screen bg-gradient-dark retro-grid">
      {/* Enhanced Header with Better CTAs */}
      <header className="border-b border-ctea-teal/30 bg-ctea-darker/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TeaCup className="w-12 h-12" animated />
              <div>
                <h1 className="text-2xl font-bold text-white animate-glow">CTea Newsroom</h1>
                <p className="text-sm text-ctea-teal">Where Crypto Drama Gets Served Hot ☕</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                onClick={() => navigate('/feed')}
              >
                Browse Tea
              </Button>
              <Button 
                className="bg-gradient-ctea text-white font-bold hover:opacity-90"
                onClick={() => navigate('/submit')}
              >
                Spill Tea Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Stronger CTAs */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <TeaCup className="w-32 h-32 mx-auto mb-8" animated />
            <h1 className="text-6xl font-bold text-white mb-4 animate-glow">
              CTea Newsroom
            </h1>
            <p className="text-2xl text-ctea-teal mb-4">
              Beta Launch • Join the Chaos ☕
            </p>
            <div className="inline-block bg-gradient-to-r from-ctea-pink/20 to-ctea-purple/20 border border-ctea-teal/30 rounded-lg px-4 py-2 mb-8">
              <span className="text-ctea-yellow font-bold">🚀 EARLY ACCESS</span>
              <span className="text-white ml-2">• Earn $TEA Points • Build $SOAP Reputation</span>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              The most unhinged gossip app in Web3. Anonymous spills, AI-powered hot takes, 
              meme templates, and pure chaotic neutral energy. <span className="text-ctea-pink font-bold">No tokens required to start the drama.</span>
            </p>
          </div>
          
          {/* Enhanced CTA Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-gradient-to-br from-ctea-pink/20 to-ctea-purple/20 border-ctea-pink/30 neon-border">
              <Coffee className="w-12 h-12 text-ctea-pink mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Spill the Tea</h3>
              <p className="text-gray-300 mb-4">Share gossip, drama, and chaos. Earn $TEA points for viral content.</p>
              <Button 
                className="w-full bg-gradient-to-r from-ctea-pink to-ctea-purple text-white font-bold"
                onClick={() => navigate('/submit')}
              >
                Start Spilling <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-ctea-teal/20 to-ctea-cyan/20 border-ctea-teal/30 neon-border">
              <TrendingUp className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Browse Hot Takes</h3>
              <p className="text-gray-300 mb-4">Rate, comment, and discover the spiciest crypto drama.</p>
              <Button 
                variant="outline"
                className="w-full border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
                onClick={() => navigate('/feed')}
              >
                View Feed <Sparkles className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Beta Features Showcase */}
      <section className="py-12 px-4 border-y border-ctea-teal/30 bg-ctea-darker/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Beta Features • Join Early & Shape the Chaos
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <Award className="w-12 h-12 text-ctea-yellow mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Earn $TEA Points</h3>
              <p className="text-gray-300">Get rewarded for viral content and community engagement</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-ctea-purple mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI Commentary</h3>
              <p className="text-gray-300">CTeaBot provides spicy takes on all the drama</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-ctea-pink mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Build Reputation</h3>
              <p className="text-gray-300">Earn $SOAP credibility through quality moderation</p>
            </div>
          </div>
          
          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-ctea-teal mb-2">2,420</div>
              <div className="text-gray-400">Beta Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ctea-pink mb-2">15.7K</div>
              <div className="text-gray-400">Hot Takes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ctea-yellow mb-2">420K</div>
              <div className="text-gray-400">$TEA Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ctea-orange mb-2">69</div>
              <div className="text-gray-400">Viral Memes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
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
              
              <Card className="p-6 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-teal/30 neon-border">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-ctea-teal" />
                  Elite Status
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Become an OG</span>
                    <OGBadge type="og" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Meme Lord Status</span>
                    <OGBadge type="meme-lord" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Drama Royalty</span>
                    <OGBadge type="viral-queen" size="sm" />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-ctea-teal hover:bg-ctea-teal/80 text-white font-bold"
                  onClick={() => navigate('/submit')}
                >
                  Earn Your Badge
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer CTA */}
      <footer className="py-16 px-4 border-t border-ctea-teal/30 bg-ctea-darker/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Beta? ☕
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of the most chaotic community in crypto. Early access means better rewards and exclusive badges.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-ctea text-white font-bold hover:opacity-90"
              onClick={() => navigate('/submit')}
            >
              Spill Your First Tea
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10"
              onClick={() => navigate('/feed')}
            >
              Browse the Drama
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
