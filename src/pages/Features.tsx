import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Zap, 
  Shield, 
  Palette, 
  Coins, 
  TrendingUp, 
  Users, 
  Award,
  Sparkles,
  Crown,
  MessageCircle,
  Image,
  Link2,
  Flag,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AICommentary from '@/components/AICommentary';
import SOAPCredibilitySystem from '@/components/SOAPCredibilitySystem';
import ModQueue from '@/components/ModQueue';
import BribeBoostSystem from '@/components/BribeBoostSystem';
import MemeRemixer from '@/components/MemeRemixer';

const Features = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // TODO: Replace demo feature content with live data if available
  const features = [
    {
      id: 'ai-commentary',
      title: 'AI Commentary System',
      description: 'CTeaBot provides spicy, smart, memy, and savage takes on all submissions',
      icon: <Bot className="icon-responsive" />,
      status: '✅ Implemented',
      demo: true,
      category: 'ai'
    },
    {
      id: 'bribe-boost',
      title: 'Bribe-to-Boost System',
      description: 'Spend $TEA points to boost your submissions for maximum visibility',
      icon: <Zap className="icon-responsive" />,
      status: '✅ Implemented',
      demo: true,
      category: 'economy'
    },
    {
      id: 'meme-remixer',
      title: 'Meme Remixer',
      description: 'Generate viral meme templates from your submissions with AI assistance',
      icon: <Palette className="icon-responsive" />,
      status: '✅ Implemented',
      demo: true,
      category: 'ai'
    },
    {
      id: 'soap-credibility',
      title: '$SOAP Credibility System',
      description: 'Dual reputation system with truth verification and community trust scores',
      icon: <Shield className="icon-responsive" />,
      status: '✅ Implemented',
      demo: true,
      category: 'economy'
    },
    {
      id: 'mod-queue',
      title: 'Mod Queue & AI Filtering',
      description: 'AI-powered content moderation with risk assessment and recommendations',
      icon: <Flag className="icon-responsive" />,
      status: '✅ Implemented',
      demo: true,
      category: 'moderation'
    },
    {
      id: 'tea-points',
      title: '$TEA Points System',
      description: 'Earn points for posting, reactions, and community engagement',
      icon: <Coins className="icon-responsive" />,
      status: '✅ Implemented',
      demo: false,
      category: 'economy'
    },
    {
      id: 'weekly-campaigns',
      title: 'Weekly Campaigns',
      description: 'Themed challenges with rewards and leaderboards',
      icon: <Award className="icon-responsive" />,
      status: '✅ Implemented',
      demo: false,
      category: 'community'
    },
    {
      id: 'anonymous-submissions',
      title: 'Anonymous Submissions',
      description: 'Submit tea anonymously with evidence and image support',
      icon: <Users className="icon-responsive" />,
      status: '✅ Implemented',
      demo: false,
      category: 'core'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Features', icon: Sparkles },
    { id: 'ai', label: 'AI Features', icon: Bot },
    { id: 'economy', label: 'Token Economy', icon: Coins },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'moderation', label: 'Moderation', icon: Shield },
    { id: 'core', label: 'Core Features', icon: Crown }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeTab);

  const renderDemo = (featureId: string) => {
    switch (featureId) {
      case 'ai-commentary':
        return (
          <div className="space-y-4">
            <AICommentary
              content="🌶️ OKAY this is absolutely UNHINGED behavior and honestly? We're here for it. The audacity, the drama, the sheer chaos energy... *chef's kiss* 💀 This is why we can't have nice things in crypto, and that's exactly what makes it spicy!"
              type="spicy"
            />
            <AICommentary
              content="🧠 If we analyze this objectively, what we're witnessing is a fascinating intersection of game theory and social capital dynamics that perfectly encapsulates the volatile nature of crypto communities."
              type="smart"
            />
            <AICommentary
              content="😂 *whispers* 'and then they rug pulled anyway' 💀 Nobody: Absolutely nobody: CT: 'Let's create ANOTHER pointless drama that somehow makes perfect sense in this timeline'"
              type="memy"
            />
          </div>
        );

      case 'bribe-boost':
        return (
          <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
            <BribeBoostSystem
              submissionId="demo-submission"
              currentBoost={0}
              onBoostUpdated={() => {}}
            />
            <div className="mt-4 text-sm text-gray-400 space-y-1">
              <p>• Small Boost: 25 points for 10 $TEA</p>
              <p>• Medium Boost: 50 points for 25 $TEA</p>
              <p>• Large Boost: 100 points for 50 $TEA</p>
              <p>• Viral Boost: 200 points for 100 $TEA</p>
            </div>
          </div>
        );

      case 'meme-remixer':
        return (
          <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
            <MemeRemixer
              submissionId="demo-submission"
              content="This is a demo submission for meme generation"
              category="gossip"
            />
            <div className="mt-4 text-sm text-gray-400 space-y-1">
              <p>• 6 popular meme templates</p>
              <p>• AI-generated text suggestions</p>
              <p>• Download and share functionality</p>
              <p>• Integration with submissions</p>
            </div>
          </div>
        );

      case 'soap-credibility':
        return (
          <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
            <SOAPCredibilitySystem />
          </div>
        );

      case 'mod-queue':
        return (
          <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
            <ModQueue isModerator={true} />
          </div>
        );

      default:
        return (
          <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
            <p className="text-gray-400">Demo available in the main application</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark retro-grid">
      {/* Header Section - Mobile First */}
      <section className="section-responsive">
        <div className="container-responsive">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 animate-glow">
              CTea Newsroom Features 🚀
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
              Explore all the features that make CTea the ultimate crypto gossip platform. 
              From AI commentary to dual-token economics, we've built everything from the pitch deck.
            </p>

            {/* Feature Stats - Mobile responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md sm:max-w-lg mx-auto mb-6 sm:mb-8">
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-ctea-teal mb-1">{features.length}</div>
                <div className="text-xs sm:text-sm text-gray-400">Features</div>
              </div>
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-ctea-pink mb-1">8</div>
                <div className="text-xs sm:text-sm text-gray-400">Live</div>
              </div>
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-ctea-yellow mb-1">5</div>
                <div className="text-xs sm:text-sm text-gray-400">Demos</div>
              </div>
              <div className="text-center card-responsive bg-ctea-dark/30 border border-ctea-teal/20 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-ctea-purple mb-1">4</div>
                <div className="text-xs sm:text-sm text-gray-400">Categories</div>
              </div>
            </div>
          </div>

          {/* Category Tabs - Mobile responsive */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex flex-wrap bg-ctea-darker/50 rounded-lg p-1 gap-1 w-full sm:w-auto">
              {categories.map(({ id, label, icon: Icon }) => (
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
                  <Icon className="icon-responsive mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile First */}
      <section className="section-responsive">
        <div className="container-responsive">
          {/* Mobile: Single Column */}
          <div className="block lg:hidden space-y-6">
            {filteredFeatures.map((feature) => (
              <Card key={feature.id} className="card-responsive bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-ctea-teal/20 rounded-lg text-ctea-teal">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 badge-responsive">
                    {feature.status}
                  </Badge>
                </div>
                
                {feature.demo && (
                  <div className="mt-4">
                    {renderDemo(feature.id)}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredFeatures.map((feature) => (
              <Card key={feature.id} className="card-responsive bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-ctea-teal/20 rounded-lg text-ctea-teal">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 badge-responsive">
                    {feature.status}
                  </Badge>
                </div>
                
                {feature.demo && (
                  <div className="mt-4">
                    {renderDemo(feature.id)}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* CTA Section - Mobile responsive */}
          <div className="mt-8 sm:mt-12 text-center">
            <Card className="card-responsive bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30 neon-border">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Ready to Experience These Features? 🚀
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
                Join the beta and start using all these features to spill the hottest tea in crypto!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  className="bg-gradient-ctea text-white font-bold btn-responsive w-full sm:w-auto"
                  onClick={() => navigate('/submit')}
                >
                  <Plus className="icon-responsive mr-2" />
                  Start Spilling Tea
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

export default Features; 