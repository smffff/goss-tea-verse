
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, Plus, TrendingUp, Users, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface SimpleTeaAppProps {
  onLogout: () => void;
}

const SimpleTeaApp: React.FC<SimpleTeaAppProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<'feed' | 'spill' | 'profile'>('feed');
  const { toast } = useToast();

  const isDemoMode = localStorage.getItem('ctea-demo-mode') === 'true';
  const userCode = localStorage.getItem('ctea-beta-code') || 'DEMO';

  const handleSpillTea = () => {
    toast({
      title: "Tea Spill Coming Soon! ☕",
      description: "Anonymous submissions will be available in the next update.",
    });
  };

  const handleViewProfile = () => {
    setActiveSection('profile');
  };

  const sampleSpills = [
    {
      id: 1,
      content: "Heard through the grapevine that a major DeFi protocol is planning a surprise token burn... 👀",
      reactions: 42,
      comments: 18,
      timeAgo: "2h ago"
    },
    {
      id: 2,
      content: "Someone just moved 10,000 ETH to an unknown wallet. Big moves happening behind the scenes...",
      reactions: 89,
      comments: 35,
      timeAgo: "4h ago"
    },
    {
      id: 3,
      content: "That 'community-driven' project? The team holds 60% of the tokens. Do your own research, anons!",
      reactions: 156,
      comments: 67,
      timeAgo: "6h ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Header */}
      <div className="bg-ctea-dark/80 backdrop-blur-sm border-b border-ctea-teal/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  CTea Newsroom
                  <BrandedTeacupIcon size="sm" />
                </h1>
                <p className="text-xs text-gray-400">
                  {isDemoMode ? 'Demo Mode' : `Beta User • ${userCode}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSpillTea}
                className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Spill Tea
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-600"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveSection('feed')}
            variant={activeSection === 'feed' ? 'default' : 'outline'}
            className={activeSection === 'feed' ? 'bg-ctea-teal text-white' : 'border-gray-600 text-gray-400'}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Hot Tea
          </Button>
          <Button
            onClick={() => setActiveSection('profile')}
            variant={activeSection === 'profile' ? 'default' : 'outline'}
            className={activeSection === 'profile' ? 'bg-ctea-teal text-white' : 'border-gray-600 text-gray-400'}
          >
            <Users className="w-4 h-4 mr-2" />
            Community
          </Button>
        </div>

        {/* Content */}
        {activeSection === 'feed' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-ctea-dark/60 border-ctea-teal/30">
                <CardContent className="p-4 text-center">
                  <BrandedTeacupIcon size="lg" variant="spilling" className="mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">1,337</div>
                  <div className="text-sm text-gray-400">Tea Spills</div>
                </CardContent>
              </Card>
              <Card className="bg-ctea-dark/60 border-pink-400/30">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">420</div>
                  <div className="text-sm text-gray-400">Beta OGs</div>
                </CardContent>
              </Card>
              <Card className="bg-ctea-dark/60 border-ctea-purple/30">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-ctea-purple mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">+25%</div>
                  <div className="text-sm text-gray-400">Daily Chaos</div>
                </CardContent>
              </Card>
            </div>

            {/* Tea Feed */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Latest Tea Spills ☕</h2>
              {sampleSpills.map((spill) => (
                <Card key={spill.id} className="bg-ctea-dark/60 border-ctea-teal/30">
                  <CardContent className="p-4">
                    <p className="text-white mb-3">{spill.content}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="border-ctea-teal/50 text-ctea-teal">
                          ☕ {spill.reactions}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                          💬 {spill.comments}
                        </Badge>
                      </div>
                      <span className="text-gray-400">{spill.timeAgo}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coming Soon Notice */}
            <Card className="bg-gradient-to-r from-ctea-teal/20 to-pink-400/20 border-ctea-teal/50">
              <CardContent className="p-6 text-center">
                <BrandedTeacupIcon size="lg" variant="steaming" className="mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">More Features Brewing...</h3>
                <p className="text-gray-300 mb-4">
                  Anonymous submissions, AI commentary, token rewards, and more coming soon!
                </p>
                <Button
                  onClick={handleSpillTea}
                  className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
                >
                  Be the First to Spill
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="space-y-6">
            <Card className="bg-ctea-dark/60 border-ctea-teal/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-ctea-darker/50 rounded">
                    <div className="text-2xl font-bold text-ctea-teal">Beta OG</div>
                    <div className="text-sm text-gray-400">Your Status</div>
                  </div>
                  <div className="text-center p-4 bg-ctea-darker/50 rounded">
                    <div className="text-2xl font-bold text-pink-400">{userCode}</div>
                    <div className="text-sm text-gray-400">Access Code</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-ctea-dark/60 border-ctea-teal/30">
              <CardHeader>
                <CardTitle className="text-white">Join the Movement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  You're part of the CTea beta community! Help us build the hottest gossip platform in crypto.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-ctea-teal/20 text-ctea-teal border-ctea-teal/50">
                    #CTeaApp
                  </Badge>
                  <Badge className="bg-pink-400/20 text-pink-400 border-pink-400/50">
                    #BetaOG
                  </Badge>
                  <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/50">
                    #SpillTheTea
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleTeaApp;
