import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Coffee, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap, 
  MessageSquare,
  Eye,
  Heart,
  Share2,
  Trophy,
  Star,
  Crown,
  Lock,
  ChevronRight
} from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';
import ViralCTA from '@/components/ui/ViralCTA';
import SubmissionModal from '@/components/SubmissionModal';
import { useToast } from '@/hooks/use-toast';

interface ConsolidatedAppProps {
  onAccessGranted: () => void;
}

const ConsolidatedApp: React.FC<ConsolidatedAppProps> = ({ onAccessGranted }) => {
  const [betaCode, setBetaCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('beta');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [stats, setStats] = useState({
    totalSpills: 1247,
    activeUsers: 342,
    hotTopics: 23,
    dailyGrowth: 15.7
  });
  const { toast } = useToast();

  const validateBetaCode = async (code: string): Promise<boolean> => {
    try {
      // Simple validation - in production you might want to check against a database table
      const validCodes = ['CTEA2024', 'BETA-ACCESS', 'EARLY-BIRD'];
      return validCodes.includes(code.toUpperCase());
    } catch (error) {
      console.error('Beta code validation error:', error);
      return false;
    }
  };

  const handleBetaSubmit = async () => {
    if (!betaCode.trim()) {
      setError('Please enter a beta code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const isValid = await validateBetaCode(betaCode);
      
      if (isValid) {
        localStorage.setItem('ctea-beta-access', 'granted');
        toast({
          title: "Welcome to CTea! ☕",
          description: "You now have access to the hottest gossip platform.",
        });
        onAccessGranted();
      } else {
        setError('Invalid beta code. Please check your code and try again.');
      }
    } catch (error) {
      console.error('Beta verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmissionSubmit = async (data: { content: string; wallet?: string; email?: string }) => {
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Spill Submitted! 🫖",
        description: "Your tea has been added to our review queue.",
      });
      
      setShowSubmissionModal(false);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const mockData = {
    hotSpills: [
      { id: 1, content: "Major crypto exchange might be planning surprise announcement...", heat: 94, comments: 127 },
      { id: 2, content: "Celebrity spotted at exclusive tech conference in stealth mode...", heat: 89, comments: 203 },
      { id: 3, content: "New AI startup raised $50M but keeping their product secret...", heat: 87, comments: 156 }
    ],
    trendingTopics: [
      { name: "DeFi Drama", count: 234, trend: "+15%" },
      { name: "AI Secrets", count: 187, trend: "+23%" },
      { name: "Celeb Tech", count: 156, trend: "+8%" },
      { name: "Startup Tea", count: 143, trend: "+31%" }
    ],
    recentSpills: [
      { id: 1, content: "Heard from a reliable source that...", author: "Anonymous", time: "2m ago", reactions: 23 },
      { id: 2, content: "Someone in the know told me...", author: "Insider", time: "5m ago", reactions: 41 },
      { id: 3, content: "Can't reveal my source but...", author: "Whistleblower", time: "8m ago", reactions: 67 },
      { id: 4, content: "Breaking: Industry insider says...", author: "DeepThroat", time: "12m ago", reactions: 89 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ctea-teal rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-ctea-purple rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Elements */}
      <ParallaxElement speed={0.5} direction="up" className="absolute top-20 left-10">
        <Coffee className="w-12 h-12 text-ctea-teal opacity-30" />
      </ParallaxElement>
      <ParallaxElement speed={0.3} direction="down" className="absolute top-40 right-20">
        <Sparkles className="w-8 h-8 text-pink-400 opacity-40" />
      </ParallaxElement>
      <ParallaxElement speed={0.7} direction="up" className="absolute bottom-32 left-20">
        <Zap className="w-10 h-10 text-yellow-400 opacity-35" />
      </ParallaxElement>

      <div className="relative z-10 p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-ctea-teal to-ctea-purple rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-ctea-dark rounded-full flex items-center justify-center">
              <Coffee className="w-8 h-8 text-ctea-teal" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent mb-2">
            CTea Newsroom
          </h1>
          <p className="text-gray-300 text-lg">Where Gossip Meets Intelligence</p>
        </motion.div>

        {/* Main Content Tabs */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-ctea-dark/50 border border-ctea-teal/30">
              <TabsTrigger value="beta" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
                <Lock className="w-4 h-4 mr-2" />
                Beta Access
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-ctea-teal data-[state=active]:text-black">
                <Users className="w-4 h-4 mr-2" />
                Community
              </TabsTrigger>
            </TabsList>

            {/* Beta Access Tab */}
            <TabsContent value="beta" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto"
              >
                <Card className="bg-ctea-dark/80 border-ctea-teal/30 backdrop-blur-lg">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-ctea-teal to-ctea-purple rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">Beta Access Required</CardTitle>
                    <p className="text-gray-400">Enter your exclusive beta code to continue</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Enter beta code..."
                        value={betaCode}
                        onChange={(e) => setBetaCode(e.target.value)}
                        className="bg-ctea-darker border-ctea-teal/30 text-white placeholder-gray-500 focus:border-ctea-teal"
                        onKeyPress={(e) => e.key === 'Enter' && handleBetaSubmit()}
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-400 text-sm"
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>
                    <ViralCTA
                      variant="spill"
                      size="md"
                      onClick={handleBetaSubmit}
                      className="w-full"
                      showParticles={false}
                      shakeOnHover={false}
                    >
                      {isVerifying ? 'Verifying...' : 'Access The Tea'}
                    </ViralCTA>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Hot Spills */}
                <Card className="bg-ctea-dark/80 border-pink-400/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Coffee className="w-5 h-5 mr-2 text-pink-400" />
                      Hottest Tea ☕
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockData.hotSpills.map((spill) => (
                      <div key={spill.id} className="bg-ctea-darker rounded-lg p-4 border border-pink-400/20">
                        <p className="text-gray-300 mb-3 text-sm">{spill.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {spill.heat}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              {spill.comments}
                            </span>
                          </div>
                          <Badge variant="secondary" className="bg-pink-400/20 text-pink-400">
                            Hot
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Live Stats */}
                <Card className="bg-ctea-dark/80 border-ctea-teal/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-ctea-teal" />
                      Live Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ctea-teal">{stats.totalSpills.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Total Spills</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">{stats.activeUsers}</div>
                        <div className="text-sm text-gray-400">Active Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">{stats.hotTopics}</div>
                        <div className="text-sm text-gray-400">Hot Topics</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">+{stats.dailyGrowth}%</div>
                        <div className="text-sm text-gray-400">Daily Growth</div>
                      </div>
                    </div>
                    
                    <ViralCTA
                      variant="spill"
                      size="md"
                      onClick={() => setShowSubmissionModal(true)}
                      className="w-full"
                      showParticles={false}
                      shakeOnHover={false}
                    >
                      Spill Some Tea 🫖
                    </ViralCTA>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trending Tab */}
            <TabsContent value="trending" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-ctea-dark/80 border-ctea-purple/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Star className="w-5 h-5 mr-2 text-ctea-purple" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockData.trendingTopics.map((topic, index) => (
                      <div key={topic.name} className="flex items-center justify-between p-3 bg-ctea-darker rounded-lg border border-ctea-purple/20">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-ctea-purple/20 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-bold text-ctea-purple">#{index + 1}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{topic.name}</div>
                            <div className="text-sm text-gray-400">{topic.count} mentions</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-400/20 text-green-400">
                          {topic.trend}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-ctea-dark/80 border-yellow-400/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                      Recent Spills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockData.recentSpills.map((spill) => (
                      <div key={spill.id} className="p-3 bg-ctea-darker rounded-lg border border-yellow-400/20">
                        <p className="text-gray-300 text-sm mb-2">{spill.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>by {spill.author}</span>
                          <div className="flex items-center space-x-3">
                            <span>{spill.time}</span>
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {spill.reactions}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="mt-6">
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto"
                >
                  <Users className="w-16 h-16 text-ctea-teal mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Join the Community</h3>
                  <p className="text-gray-300 mb-6">
                    Connect with thousands of gossip enthusiasts and stay updated with the latest insider news.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-teal/20 rounded-lg p-6">
                      <MessageSquare className="w-8 h-8 text-ctea-teal mx-auto mb-3" />
                      <h4 className="text-white font-semibold mb-2">Share Stories</h4>
                      <p className="text-gray-400 text-sm">Submit your insider knowledge</p>
                    </div>
                    <div className="bg-ctea-dark/40 backdrop-blur border border-pink-400/20 rounded-lg p-6">
                      <Trophy className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                      <h4 className="text-white font-semibold mb-2">Earn Rewards</h4>
                      <p className="text-gray-400 text-sm">Get recognized for quality content</p>
                    </div>
                    <div className="bg-ctea-dark/40 backdrop-blur border border-ctea-purple/20 rounded-lg p-6">
                      <Crown className="w-8 h-8 text-ctea-purple mx-auto mb-3" />
                      <h4 className="text-white font-semibold mb-2">Build Reputation</h4>
                      <p className="text-gray-400 text-sm">Become a trusted source</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setActiveTab('beta')}
                    className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-teal/80 hover:to-ctea-purple/80 text-white px-8 py-3"
                  >
                    Get Beta Access
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleSubmissionSubmit}
      />
    </div>
  );
};

export default ConsolidatedApp;
