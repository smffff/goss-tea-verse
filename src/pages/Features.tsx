import React from 'react';
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
  Flag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AICommentary from '@/components/AICommentary';
import SOAPCredibilitySystem from '@/components/SOAPCredibilitySystem';
import ModQueue from '@/components/ModQueue';
import BribeBoostSystem from '@/components/BribeBoostSystem';
import MemeRemixer from '@/components/MemeRemixer';

const Features = () => {
  const navigate = useNavigate();

  // TODO: Replace demo feature content with live data if available
  const features = [
    {
      id: 'ai-commentary',
      title: 'AI Commentary System',
      description: 'CTeaBot provides spicy, smart, memy, and savage takes on all submissions',
      icon: <Bot className="w-6 h-6" />,
      status: '✅ Implemented',
      demo: true
    },
    {
      id: 'bribe-boost',
      title: 'Bribe-to-Boost System',
      description: 'Spend $TEA points to boost your submissions for maximum visibility',
      icon: <Zap className="w-6 h-6" />,
      status: '✅ Implemented',
      demo: true
    },
    {
      id: 'meme-remixer',
      title: 'Meme Remixer',
      description: 'Generate viral meme templates from your submissions with AI assistance',
      icon: <Palette className="w-6 h-6" />,
      status: '✅ Implemented',
      demo: true
    },
    {
      id: 'soap-credibility',
      title: '$SOAP Credibility System',
      description: 'Dual reputation system with truth verification and community trust scores',
      icon: <Shield className="w-6 h-6" />,
      status: '✅ Implemented',
      demo: true
    },
    {
      id: 'mod-queue',
      title: 'Mod Queue & AI Filtering',
      description: 'AI-powered content moderation with risk assessment and recommendations',
      icon: <Flag className="w-6 h-6" />,
      status: '✅ Implemented',
      demo: true
    },
    {
      id: 'tea-points',
      title: '$TEA Points System',
      description: 'Earn points for posting, reactions, and community engagement',
      icon: <Coins className="w-6 h-6" />,
      status: '✅ Implemented',
      demo: false
    },
    {
      id: 'weekly-campaigns',
      title: 'Weekly Campaigns',
      description: 'Themed challenges with rewards and leaderboards',
      icon: <Award className="w-6 h-6" />,
      status: '✅ Implemented',
      demo: false
    },
    {
      id: 'anonymous-submissions',
      title: 'Anonymous Submissions',
      description: 'Submit tea anonymously with evidence and image support',
      icon: <Users className="w-6 h-6" />,
      status: '✅ Implemented',
      demo: false
    }
  ];

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
            <div className="mt-4 text-sm text-gray-400">
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
            <div className="mt-4 text-sm text-gray-400">
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
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 animate-glow">
          CTea Newsroom Features 🚀
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Explore all the features that make CTea the ultimate crypto gossip platform. 
          From AI commentary to dual-token economics, we've built everything from the pitch deck.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <Card key={feature.id} className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-ctea-teal/20 rounded-lg text-ctea-teal">
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
            
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {feature.description}
            </p>

            {feature.demo && (
              <Button
                size="sm"
                variant="outline"
                className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                onClick={() => {
                  const element = document.getElementById(`demo-${feature.id}`);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                View Demo
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Live Demos */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Live Feature Demos 🎮
        </h2>

        {features.filter(f => f.demo).map((feature) => (
          <div key={feature.id} id={`demo-${feature.id}`} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-ctea-teal/20 rounded-lg text-ctea-teal">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
            </div>
            {renderDemo(feature.id)}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <Card className="p-8 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 border-ctea-teal/30 neon-border">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience CTea?</h3>
          <p className="text-gray-300 mb-6">
            All features are fully implemented and ready for use. Join the beta and start spilling tea!
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              className="bg-gradient-ctea text-white font-bold"
              onClick={() => navigate('/submit')}
            >
              Spill Your First Tea
            </Button>
            <Button 
              variant="outline"
              className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10"
              onClick={() => navigate('/feed')}
            >
              Browse Hot Takes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Features; 