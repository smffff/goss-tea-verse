import React, { useState } from 'react';
import WeeklyCampaignManager from '@/components/WeeklyCampaignManager';
import HypeCard from '@/components/HypeCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
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
    <Layout>
      {/* Header Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
              Weekly Campaigns 🚀
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Join themed challenges, earn $TEA points, and climb the leaderboards. 
              The spiciest content gets the biggest rewards!
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="text-center bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                <Trophy className="w-6 h-6 text-ctea-yellow mx-auto mb-2" />
                <div className="text-xl font-bold text-ctea-yellow">12</div>
                <div className="text-gray-400 text-sm">Active</div>
              </div>
              <div className="text-center bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                <Users className="w-6 h-6 text-ctea-pink mx-auto mb-2" />
                <div className="text-xl font-bold text-ctea-pink">2.4K</div>
                <div className="text-gray-400 text-sm">Participants</div>
              </div>
              <div className="text-center bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                <Zap className="w-6 h-6 text-ctea-teal mx-auto mb-2" />
                <div className="text-xl font-bold text-ctea-teal">420K</div>
                <div className="text-gray-400 text-sm">$TEA Rewards</div>
              </div>
              <div className="text-center bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg p-4">
                <Star className="w-6 h-6 text-ctea-purple mx-auto mb-2" />
                <div className="text-xl font-bold text-ctea-purple">69</div>
                <div className="text-gray-400 text-sm">Winners</div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                variant={activeTab === 'active' ? 'default' : 'outline'}
                className={activeTab === 'active' ? 'bg-ctea-teal text-white' : 'border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10'}
                onClick={() => setActiveTab('active')}
              >
                Active Campaigns
              </Button>
              <Button
                variant={activeTab === 'upcoming' ? 'default' : 'outline'}
                className={activeTab === 'upcoming' ? 'bg-ctea-teal text-white' : 'border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10'}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </Button>
              <Button
                variant={activeTab === 'winners' ? 'default' : 'outline'}
                className={activeTab === 'winners' ? 'bg-ctea-teal text-white' : 'border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10'}
                onClick={() => setActiveTab('winners')}
              >
                Past Winners
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Campaigns */}
          {activeTab === 'active' && (
            <div className="space-y-8">
              <WeeklyCampaignManager />

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-ctea-teal" />
                  Community Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Trophy className="w-6 h-6 text-ctea-yellow" />
                Coming Soon
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {upcomingCampaigns.map((campaign, index) => (
                  <Card key={index} className="bg-ctea-dark/30 border border-ctea-teal/20">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
                        <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
                          {campaign.startDate}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-4">{campaign.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          Reward: <span className="text-ctea-yellow font-bold">{campaign.reward}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {campaign.participants} participants
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Past Winners */}
          {activeTab === 'winners' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-ctea-yellow" />
                Hall of Fame
              </h2>
              <div className="space-y-4">
                {pastWinners.map((winner, index) => (
                  <Card key={index} className="bg-gradient-to-r from-ctea-yellow/10 to-ctea-orange/10 border-ctea-yellow/30">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-white">{winner.campaign}</h3>
                        <Badge className="bg-ctea-yellow/20 text-ctea-yellow border-ctea-yellow/30">
                          {winner.prize}
                        </Badge>
                      </div>
                      <div className="mb-3">
                        <span className="text-gray-300 text-sm">Winner: </span>
                        <span className="text-ctea-teal font-bold">{winner.winner}</span>
                      </div>
                      <p className="text-gray-300 text-sm italic">"{winner.submission}"</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 border-ctea-teal/30 max-w-2xl mx-auto">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Join the Chaos? 🚀
                </h3>
                <p className="text-gray-300 mb-6">
                  Start participating in campaigns and earn your way to the top of the leaderboards!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    className="bg-gradient-ctea text-white font-bold w-full sm:w-auto"
                    onClick={() => navigate('/submit')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start Campaigning
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 w-full sm:w-auto"
                    onClick={() => navigate('/feed')}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Browse Feed
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Campaigns;
