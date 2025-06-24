import React, { useState } from 'react';
import WeeklyCampaignManager from '@/components/WeeklyCampaignManager';
import HypeCard from '@/components/HypeCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Users, Zap, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  const hypeItems = [
    {
      title: "Top Tea Spillers",
      description: "See who's dominating the leaderboards this week",
      type: "leaderboard" as const,
      participants: 1247,
      featured: true
    },
    {
      title: "Evidence Spotlight",
      description: "The most credible submissions with receipts",
      type: "spotlight" as const,
      participants: 89
    },
    {
      title: "Chaos Challenge",
      description: "Who can create the most chaotic but entertaining content?",
      type: "challenge" as const,
      isActive: true,
      timeLeft: "3 days",
      participants: 234
    }
  ];

  const upcomingCampaigns = [
    {
      title: "Meme Monday Massacre",
      description: "Drop your spiciest crypto memes",
      startDate: "Tomorrow",
      reward: "500 $TEA + Meme Lord Badge",
      participants: 0
    },
    {
      title: "Wednesday Drama Wars",
      description: "Spill the hottest gossip with receipts",
      startDate: "In 3 days",
      reward: "300 $TEA + Drama Queen Badge",
      participants: 0
    }
  ];

  const pastWinners = [
    {
      campaign: "Sunday Savage Showdown",
      winner: "ChaosAgent",
      prize: "1000 $TEA",
      submission: "The most unhinged NFT marketplace drama you've ever seen..."
    },
    {
      campaign: "Friday FUD Fighter",
      winner: "TruthSeeker",
      prize: "750 $TEA",
      submission: "Exposed the fake partnership announcements with receipts..."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark retro-grid">
      {/* Header Section - Mobile First */}
      <section className="section-responsive">
        <div className="container-responsive">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 animate-glow">
              Weekly Campaigns 🚀
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
              Join themed challenges, earn $TEA points, and climb the leaderboards. 
              The spiciest content gets the biggest rewards!
            </p>

            {/* Quick Stats - Mobile responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md sm:max-w-lg mx-auto mb-6 sm:mb-8">
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-ctea-teal mb-1">12</div>
                <div className="text-xs sm:text-sm text-gray-400">Active</div>
              </div>
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-ctea-pink mb-1">2.4K</div>
                <div className="text-xs sm:text-sm text-gray-400">Participants</div>
              </div>
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-ctea-yellow mb-1">15.7K</div>
                <div className="text-xs sm:text-sm text-gray-400">$TEA Rewarded</div>
              </div>
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-ctea-purple mb-1">69</div>
                <div className="text-xs sm:text-sm text-gray-400">Winners</div>
              </div>
            </div>
          </div>

          {/* Campaign Tabs - Mobile responsive */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex bg-ctea-darker/50 rounded-lg p-1 w-full sm:w-auto">
              {[
                { id: 'active', label: 'Active', icon: Zap },
                { id: 'upcoming', label: 'Upcoming', icon: Star },
                { id: 'winners', label: 'Hall of Fame', icon: Trophy }
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={activeTab === id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 sm:flex-none ${
                    activeTab === id 
                      ? 'bg-gradient-ctea text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="icon-responsive mr-2" />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Mobile First */}
      <section className="section-responsive">
        <div className="container-responsive">
          {/* Active Campaigns */}
          {activeTab === 'active' && (
            <div className="space-y-6 sm:space-y-8">
              <WeeklyCampaignManager />

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <TrendingUp className="icon-responsive text-ctea-teal" />
                  Community Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {hypeItems.map((item, index) => (
                    <HypeCard key={index} {...item} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Campaigns */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Star className="icon-responsive text-ctea-yellow" />
                Coming Soon
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {upcomingCampaigns.map((campaign, index) => (
                  <Card key={index} className="card-responsive bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-teal/30 neon-border">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{campaign.title}</h3>
                        <p className="text-gray-300 text-sm sm:text-base mb-3">{campaign.description}</p>
                      </div>
                      <Badge className="bg-ctea-yellow text-ctea-dark font-bold badge-responsive self-start">
                        {campaign.startDate}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-ctea-teal">
                        <Trophy className="icon-responsive" />
                        <span>Reward: {campaign.reward}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="icon-responsive" />
                        <span>{campaign.participants} registered</span>
                      </div>
                    </div>

                    <Button className="w-full bg-ctea-purple hover:bg-ctea-purple/80 text-white btn-responsive">
                      Set Reminder
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Hall of Fame */}
          {activeTab === 'winners' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Trophy className="icon-responsive text-ctea-yellow" />
                Hall of Fame
              </h2>
              <div className="space-y-4">
                {pastWinners.map((winner, index) => (
                  <Card key={index} className="card-responsive bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30 neon-border">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-ctea rounded-full flex items-center justify-center">
                          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white">{winner.campaign}</h3>
                          <p className="text-ctea-yellow font-medium text-sm sm:text-base">Winner: {winner.winner}</p>
                        </div>
                      </div>
                      <Badge className="bg-ctea-yellow text-ctea-dark font-bold badge-responsive self-start">
                        {winner.prize}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 italic text-sm sm:text-base">"{winner.submission}"</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section - Mobile responsive */}
          <div className="mt-8 sm:mt-12 text-center">
            <Card className="card-responsive bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 border-ctea-teal/30 neon-border">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Ready to Join the Chaos? 🚀
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
                Start participating in campaigns and earn your way to the top of the leaderboards!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  className="bg-gradient-ctea text-white font-bold btn-responsive w-full sm:w-auto"
                  onClick={() => navigate('/submit')}
                >
                  <Plus className="icon-responsive mr-2" />
                  Start Campaigning
                </Button>
                <Button 
                  variant="outline"
                  className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 btn-responsive w-full sm:w-auto"
                  onClick={() => navigate('/feed')}
                >
                  <TrendingUp className="icon-responsive mr-2" />
                  Browse Feed
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Campaigns;
