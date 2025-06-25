import React, { useState } from 'react';
import TeaFeed from '@/components/TeaFeed';
import Leaderboard from '@/components/Leaderboard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import TippingModal from '@/components/TippingModal';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { TrendingUp, Zap, Users, Plus, Filter, Trophy, Coffee, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Feed = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSpillModal, setShowSpillModal] = useState(false);
  const [showTippingModal, setShowTippingModal] = useState(false);
  
  const stats = [
    { label: 'Hot Takes Today', value: '1,247', icon: TrendingUp, color: 'text-ctea-teal' },
    { label: 'Active Users', value: '2,420', icon: Users, color: 'text-ctea-purple' },
    { label: 'Viral Posts', value: '69', icon: Zap, color: 'text-ctea-yellow' }
  ];

  const handleSpillTea = async (data: { tea: string; email: string; wallet: string }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Tea Submitted! ☕",
        description: "Your submission is being reviewed. Check back soon!",
      });
      
      // In a real app, this would add to the feed
      console.log('Tea submitted:', data);
      setShowSpillModal(false);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Couldn't submit your tea. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
              Hot Takes & Drama ☕
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              The freshest tea from the crypto world. Upvote the spiciest takes and join the conversation.
            </p>

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
          </div>

          {/* CTA for new users */}
          <Card className="bg-gradient-to-br from-ctea-pink/20 to-ctea-purple/20 border-ctea-pink/30 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-2">Got Some Tea to Spill? ☕</h3>
                <p className="text-gray-300">Share your hottest takes and earn $TEA points for viral content!</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button 
                  className="bg-gradient-ctea text-white font-bold w-full sm:w-auto py-3 px-6 text-base hover:scale-105 transition-transform duration-200"
                  onClick={() => setShowSpillModal(true)}
                  data-cta="spill-tea"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Spill Tea
                </Button>
                <Button 
                  variant="outline"
                  className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 w-full sm:w-auto py-3 px-6 text-base hover:scale-105 transition-transform duration-200"
                  onClick={() => setShowTippingModal(true)}
                  data-cta="tip-gatekeepers"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Tip Gatekeepers
                </Button>
              </div>
            </div>
          </Card>

          {/* Testimonial Carousel */}
          <div className="mb-8">
            <TestimonialCarousel />
          </div>

          {/* Quick Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30 cursor-pointer hover:bg-ctea-teal/30 transition-colors duration-200">
                🔥 All Hot Takes
              </Badge>
              <Badge className="bg-ctea-dark/50 text-gray-300 border border-ctea-teal/20 cursor-pointer hover:bg-ctea-dark/70 transition-colors duration-200">
                🌶️ Spicy Drama
              </Badge>
              <Badge className="bg-ctea-dark/50 text-gray-300 border border-ctea-teal/20 cursor-pointer hover:bg-ctea-dark/70 transition-colors duration-200">
                📈 Trending
              </Badge>
              <Badge className="bg-ctea-dark/50 text-gray-300 border border-ctea-teal/20 cursor-pointer hover:bg-ctea-dark/70 transition-colors duration-200">
                ⚡ Latest
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feed Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Single Column Feed */}
          <div className="block lg:hidden">
            <TeaFeed />
          </div>

          {/* Desktop: Two Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {/* Main Feed - 3 columns */}
            <div className="lg:col-span-3">
              <TeaFeed />
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
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
                    <div className="flex items-center justify-between p-3 bg-ctea-dark/20 border border-ctea-teal/10 rounded-lg">
                      <span className="text-white font-medium text-sm">#DeFiSummer</span>
                      <Badge className="bg-ctea-orange text-white text-xs">🚀 New</Badge>
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
                      className="w-full bg-gradient-ctea text-white font-bold py-3 hover:scale-105 transition-transform duration-200"
                      onClick={() => setShowSpillModal(true)}
                      data-cta="spill-tea-sidebar"
                    >
                      <Coffee className="w-4 h-4 mr-2" />
                      Spill New Tea
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 py-3 hover:scale-105 transition-transform duration-200"
                      onClick={() => setShowTippingModal(true)}
                      data-cta="tip-gatekeepers-sidebar"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Tip Gatekeepers
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
                      <span className="text-gray-300 text-sm">Viral Posts</span>
                      <span className="text-ctea-pink font-bold">69</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Spill Tea Modal */}
      <Modal
        isOpen={showSpillModal}
        onClose={() => setShowSpillModal(false)}
        title="Spill Your Tea ☕"
        showForm={true}
        onSubmit={handleSpillTea}
        submitButtonText="Spill Tea"
      />

      {/* Tipping Modal */}
      <TippingModal
        isOpen={showTippingModal}
        onClose={() => setShowTippingModal(false)}
      />
    </Layout>
  );
};

export default Feed;
