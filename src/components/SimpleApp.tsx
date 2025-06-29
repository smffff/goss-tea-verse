import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, TrendingUp, Users, MessageCircle, Eye, Heart, Flame, Zap, Twitter, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SpillTeaModal from '@/components/modals/SpillTeaModal';
import EarlyAccessGate from '@/components/EarlyAccessGate';
import { SOCIAL_CONFIG } from '@/config/social';

const SimpleApp: React.FC = () => {
  const [isSpillModalOpen, setIsSpillModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSpillSuccess = () => {
    toast({
      title: "Tea Spilled Successfully! 🫖",
      description: "Your gossip is now brewing in the feed!",
    });
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Sample tea submissions for display
  const sampleSubmissions = [
    {
      id: 1,
      content: "Major crypto exchange might be planning surprise announcement...",
      category: "business",
      reactions: { hot: 94, cold: 12, spicy: 67 },
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      content: "Celebrity spotted at exclusive tech conference in stealth mode...",
      category: "celebrity",
      reactions: { hot: 89, cold: 8, spicy: 45 },
      created_at: "2024-01-15T09:15:00Z"
    },
    {
      id: 3,
      content: "New AI startup raised $50M but keeping their product secret...",
      category: "tech",
      reactions: { hot: 87, cold: 15, spicy: 52 },
      created_at: "2024-01-15T08:45:00Z"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-ctea-dark/95 backdrop-blur-lg border-b border-ctea-teal/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🫖</div>
              <h1 className="text-xl font-bold text-white font-cyber">CTea Newsroom</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={() => openLink(SOCIAL_CONFIG.twitter.url)}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <Twitter className="w-4 h-4 mr-2" />
                {SOCIAL_CONFIG.twitter.handle}
              </Button>
              
              <Button 
                onClick={() => setIsSpillModalOpen(true)}
                className="bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Spill Tea
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EarlyAccessGate>
        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-ctea-dark/50 border-ctea-teal/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Coffee className="w-8 h-8 text-ctea-teal" />
                  <div>
                    <p className="text-2xl font-bold text-white">1,247</p>
                    <p className="text-gray-400 text-sm">Total Spills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-ctea-dark/50 border-ctea-purple/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-ctea-purple" />
                  <div>
                    <p className="text-2xl font-bold text-white">342</p>
                    <p className="text-gray-400 text-sm">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-ctea-dark/50 border-ctea-orange/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-ctea-orange" />
                  <div>
                    <p className="text-2xl font-bold text-white">23</p>
                    <p className="text-gray-400 text-sm">Hot Topics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-ctea-dark/50 border-ctea-pink/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Zap className="w-8 h-8 text-ctea-pink" />
                  <div>
                    <p className="text-2xl font-bold text-white">+15.7%</p>
                    <p className="text-gray-400 text-sm">Daily Growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tea Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white font-cyber">Latest Tea ☕</h2>
                <Button 
                  onClick={() => setIsSpillModalOpen(true)}
                  className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Spill More Tea
                </Button>
              </div>

              {sampleSubmissions.map((submission) => (
                <Card key={submission.id} className="bg-ctea-dark/50 border-ctea-teal/30 hover:border-ctea-teal/50 transition-all">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <p className="text-white text-lg leading-relaxed flex-1">
                          {submission.content}
                        </p>
                        <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/30 ml-4">
                          {submission.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Flame className="w-4 h-4 text-orange-500" />
                            <span className="text-white font-medium">{submission.reactions.hot}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4 text-pink-500" />
                            <span className="text-white font-medium">{submission.reactions.spicy}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="text-white font-medium">{submission.reactions.cold}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <Card className="bg-ctea-dark/50 border-ctea-purple/30">
                <CardHeader>
                  <CardTitle className="text-white font-cyber flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-ctea-purple" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "DeFi Drama", count: 234, trend: "+15%" },
                    { name: "AI Secrets", count: 187, trend: "+23%" },
                    { name: "Celeb Tech", count: 156, trend: "+8%" },
                    { name: "Startup Tea", count: 143, trend: "+31%" }
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-ctea-darker/50">
                      <span className="text-white font-medium">{topic.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">{topic.count}</span>
                        <span className="text-green-400 text-sm font-medium">{topic.trend}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Community */}
              <Card className="bg-ctea-dark/50 border-ctea-teal/30">
                <CardHeader>
                  <CardTitle className="text-white font-cyber flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-ctea-teal" />
                    Join the Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    Connect with fellow tea spillers and stay updated on the latest gossip!
                  </p>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => openLink(SOCIAL_CONFIG.twitter.url)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Follow on Twitter
                    </Button>
                    
                    <Button
                      onClick={() => openLink(SOCIAL_CONFIG.arena.url)}
                      variant="outline"
                      className="w-full border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Arena Social
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </EarlyAccessGate>

      <SpillTeaModal
        isOpen={isSpillModalOpen}
        onClose={() => setIsSpillModalOpen(false)}
        onSuccess={handleSpillSuccess}
      />
    </div>
  );
};

export default SimpleApp;
