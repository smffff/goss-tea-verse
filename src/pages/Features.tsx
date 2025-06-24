import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import AICommentary from '@/components/AICommentary';
import BribeBoostSystem from '@/components/BribeBoostSystem';
import MemeRemixer from '@/components/MemeRemixer';
import SOAPCredibilitySystem from '@/components/SOAPCredibilitySystem';
import ModQueue from '@/components/ModQueue';
import { 
  Sparkles, Bot, Coins, Users, Shield, Crown, Plus, TrendingUp, 
  Zap, Palette, Flag, Award 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // TODO: Replace demo feature content with live data if available
  const features = [
    {
      id: 'ai-commentary',
      title: 'AI Commentary System',
      description: 'CTeaBot provides spicy, smart, memy, and savage takes on all submissions',
      icon: <Bot className="w-5 h-5" />,
      status: '✅ Implemented',
      demo: true,
      category: 'ai'
    },
    {
      id: 'bribe-boost',
      title: 'Bribe-to-Boost System',
      description: 'Spend $TEA points to boost your submissions for maximum visibility',
      icon: <Zap className="w-5 h-5" />,
      status: '✅ Implemented',
      demo: true,
      category: 'economy'
    },
    {
      id: 'meme-remixer',
      title: 'Meme Remixer',
      description: 'Generate viral meme templates from your submissions with AI assistance',
      icon: <Palette className="w-5 h-5" />,
      status: '✅ Implemented',
      demo: true,
      category: 'ai'
    },
    {
      id: 'soap-credibility',
      title: '$SOAP Credibility System',
      description: 'Dual reputation system with truth verification and community trust scores',
      icon: <Shield className="w-5 h-5" />,
      status: '✅ Implemented',
      demo: true,
      category: 'economy'
    },
    {
      id: 'mod-queue',
      title: 'Mod Queue & AI Filtering',
      description: 'AI-powered content moderation with risk assessment and recommendations',
      icon: <Flag className="w-5 h-5" />,
      status: '✅ Implemented',
      demo: true,
      category: 'moderation'
    },
    {
      id: 'tea-points',
      title: '$TEA Points System',
      description: 'Earn points for posting, reactions, and community engagement',
      icon: <Coins className="w-5 h-5" />,
      status: '✅ Implemented',
      demo: false,
      category: 'economy'
    },
    {
      id: 'weekly-campaigns',
      title: 'Weekly Campaigns',
      description: 'Themed challenges with rewards and leaderboards',
      icon: <Award className="w-5 h-5" />,
      status: '✅ Implemented',
      demo: false,
      category: 'community'
    },
    {
      id: 'anonymous-submissions',
      title: 'Anonymous Submissions',
      description: 'Submit tea anonymously with evidence and image support',
      icon: <Users className="w-5 h-5" />,
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
    <Layout>
      {/* Header Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-glow">
              Beta Features 🚀
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Explore all the cutting-edge features that make CTea the ultimate crypto gossip platform.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={activeTab === id ? 'default' : 'outline'}
                  className={activeTab === id ? 'bg-ctea-teal text-white' : 'border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10'}
                  onClick={() => setActiveTab(id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFeatures.map((feature) => (
              <Card key={feature.id} className="bg-ctea-dark/30 border border-ctea-teal/20">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ctea-teal/20 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  
                  {feature.demo && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Live Demo:</h4>
                      {renderDemo(feature.id)}
                    </div>
                  )}
                  
                  {!feature.demo && (
                    <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
                      <p className="text-gray-400 text-sm">Try this feature in the main application!</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border-ctea-purple/30 max-w-2xl mx-auto">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Experience These Features? 🚀
                </h3>
                <p className="text-gray-300 mb-6">
                  Join the beta and start using all these features to spill the hottest tea in crypto!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    className="bg-gradient-ctea text-white font-bold w-full sm:w-auto"
                    onClick={() => navigate('/submit')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start Spilling Tea
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

export default Features; 