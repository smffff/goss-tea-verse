import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Zap, 
  Users, 
  Bot, 
  Trophy, 
  Shield, 
  TrendingUp,
  Rocket,
  Star,
  Coins,
  Globe
} from 'lucide-react';

const Roadmap = () => {
  const roadmapPhases = [
    {
      phase: 'Phase 1: Foundation',
      status: 'completed',
      timeline: 'Q1 2024',
      description: 'Core platform development and launch',
      features: [
        { name: 'Anonymous Tea Submission', status: 'completed', icon: CheckCircle },
        { name: 'AI-Powered Moderation', status: 'completed', icon: Bot },
        { name: 'Basic Leaderboard System', status: 'completed', icon: Trophy },
        { name: 'Community Voting', status: 'completed', icon: Users },
        { name: 'CTeaBot AI Commentary', status: 'completed', icon: Bot },
        { name: 'Mobile-Responsive Design', status: 'completed', icon: Globe }
      ]
    },
    {
      phase: 'Phase 2: Tokenization',
      status: 'active',
      timeline: 'Q2 2024',
      description: '$TEA token launch and economic incentives',
      features: [
        { name: '$TEA Token Launch', status: 'completed', icon: Coins },
        { name: 'Token Rewards System', status: 'completed', icon: Trophy },
        { name: 'Wallet Integration', status: 'completed', icon: Shield },
        { name: 'Staking Mechanisms', status: 'active', icon: Zap },
        { name: 'Content Boosting', status: 'active', icon: TrendingUp },
        { name: 'Governance Framework', status: 'upcoming', icon: Users }
      ]
    },
    {
      phase: 'Phase 3: Community & Governance',
      status: 'upcoming',
      timeline: 'Q3 2024',
      description: 'Advanced community features and DAO governance',
      features: [
        { name: 'DAO Governance Launch', status: 'upcoming', icon: Users },
        { name: 'Proposal Voting System', status: 'upcoming', icon: CheckCircle },
        { name: 'Community Moderation Tools', status: 'upcoming', icon: Shield },
        { name: 'Advanced Analytics Dashboard', status: 'upcoming', icon: TrendingUp },
        { name: 'Cross-Chain Integration', status: 'upcoming', icon: Globe },
        { name: 'API for Developers', status: 'upcoming', icon: Zap }
      ]
    },
    {
      phase: 'Phase 4: Ecosystem Expansion',
      status: 'upcoming',
      timeline: 'Q4 2024',
      description: 'Platform expansion and ecosystem partnerships',
      features: [
        { name: 'Mobile App Launch', status: 'upcoming', icon: Globe },
        { name: 'NFT Badge System', status: 'upcoming', icon: Trophy },
        { name: 'Partner Integrations', status: 'upcoming', icon: Users },
        { name: 'Advanced AI Features', status: 'upcoming', icon: Bot },
        { name: 'Multi-Language Support', status: 'upcoming', icon: Globe },
        { name: 'Enterprise Solutions', status: 'upcoming', icon: Shield }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'upcoming': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      case 'upcoming': return <Star className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full border border-ctea-teal/30">
              <Rocket className="w-8 h-8 text-ctea-teal" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-glow">
            CTea Roadmap
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From anonymous gossip to a full Web3 ecosystem. Here's how we're building 
            the future of crypto information sharing, one spicy take at a time.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-12">
          {roadmapPhases.map((phase, index) => (
            <Card key={index} className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {phase.phase}
                    </CardTitle>
                    <p className="text-gray-300">{phase.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(phase.status)}>
                      {getStatusIcon(phase.status)}
                      <span className="ml-2 capitalize">{phase.status}</span>
                    </Badge>
                    <Badge variant="outline" className="border-ctea-teal/30 text-ctea-teal">
                      {phase.timeline}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phase.features.map((feature, featureIndex) => {
                    const Icon = feature.icon;
                    return (
                      <div 
                        key={featureIndex} 
                        className="flex items-center gap-3 p-3 rounded-lg bg-ctea-dark/30 border border-white/10"
                      >
                        <Icon className={`w-5 h-5 ${
                          feature.status === 'completed' ? 'text-green-400' :
                          feature.status === 'active' ? 'text-blue-400' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm ${
                          feature.status === 'completed' ? 'text-white' :
                          feature.status === 'active' ? 'text-blue-200' : 'text-gray-400'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vision Section */}
        <Card className="bg-gradient-to-br from-ctea-teal/10 to-ctea-purple/10 border-ctea-teal/30 mt-16">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-ctea-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Community First</h3>
                <p className="text-gray-300">
                  Building a platform where every voice matters and quality content is rewarded.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-ctea-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Privacy & Security</h3>
                <p className="text-gray-300">
                  Anonymous by design, secure by default. Your identity is protected while maintaining accountability.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-ctea-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                <p className="text-gray-300">
                  Pushing the boundaries of AI, Web3, and community governance to create something truly unique.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-ctea-teal/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Join the Journey 🚀
              </h3>
              <p className="text-gray-300 mb-6">
                Be part of building the future of crypto information sharing. 
                Your contributions today shape the platform of tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/spill" 
                  className="bg-gradient-ctea text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  Start Spilling Tea
                </a>
                <a 
                  href="/about" 
                  className="border border-ctea-teal text-ctea-teal px-6 py-3 rounded-lg font-bold hover:bg-ctea-teal/10 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Roadmap; 