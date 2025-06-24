
import React, { useState } from 'react';
import WeeklyCampaignManager from '@/components/WeeklyCampaignManager';
import HypeCard from '@/components/HypeCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Users, Zap, TrendingUp } from 'lucide-react';

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState('active');

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
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 animate-glow">
          Weekly Campaigns 🚀
        </h1>
        <p className="text-lg text-gray-300">
          Join themed challenges, earn $TEA points, and climb the leaderboards. 
          The spiciest content gets the biggest rewards!
        </p>
      </div>

      {/* Campaign Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-ctea-darker/50 rounded-lg p-1">
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
              className={`${
                activeTab === id 
                  ? 'bg-gradient-ctea text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Campaigns */}
      {activeTab === 'active' && (
        <div className="space-y-8">
          <WeeklyCampaignManager />

          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-ctea-teal" />
              Community Highlights
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-ctea-yellow" />
            Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingCampaigns.map((campaign, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-teal/30 neon-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                    <p className="text-gray-300 mb-3">{campaign.description}</p>
                  </div>
                  <Badge className="bg-ctea-yellow text-ctea-dark font-bold">
                    {campaign.startDate}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-ctea-teal">
                    <Trophy className="w-4 h-4" />
                    <span>Reward: {campaign.reward}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{campaign.participants} registered</span>
                  </div>
                </div>

                <Button className="w-full bg-ctea-purple hover:bg-ctea-purple/80 text-white">
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
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-ctea-yellow" />
            Hall of Fame
          </h2>
          <div className="space-y-4">
            {pastWinners.map((winner, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/30 neon-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-ctea rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{winner.campaign}</h3>
                      <p className="text-ctea-yellow font-medium">Winner: {winner.winner}</p>
                    </div>
                  </div>
                  <Badge className="bg-ctea-yellow text-ctea-dark font-bold">
                    {winner.prize}
                  </Badge>
                </div>
                
                <p className="text-gray-300 italic">"{winner.submission}"</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <Card className="p-8 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 border-ctea-teal/30 neon-border">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Join the Action?</h3>
          <p className="text-gray-300 mb-6">
            Start participating in campaigns to earn $TEA points, unlock exclusive badges, 
            and climb the leaderboards!
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              className="bg-gradient-ctea text-white font-bold"
              onClick={() => window.location.href = '/submit'}
            >
              Spill Your First Tea
            </Button>
            <Button 
              variant="outline"
              className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
              onClick={() => window.location.href = '/feed'}
            >
              Browse Hot Takes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Campaigns;
