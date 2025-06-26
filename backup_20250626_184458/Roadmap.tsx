
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Rocket, 
  Users, 
  Zap, 
  Trophy,
  DollarSign,
  Globe,
  Shield
} from 'lucide-react';
import { BrandHeader } from '@/components/brand/BrandElements';

const Roadmap = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const roadmapPhases = [
    {
      phase: 'Phase 1',
      title: 'Foundation Launch',
      period: 'Q1 2024',
      status: 'completed',
      progress: 100,
      description: 'Core platform launch with essential features',
      milestones: [
        { title: 'Anonymous Tea Submission System', completed: true, description: 'Secure, anonymous gossip submission platform' },
        { title: 'AI Commentary Engine (CTeaBot)', completed: true, description: 'AI-powered witty commentary on all submissions' },
        { title: 'Community Voting System', completed: true, description: 'Hot/Cold voting mechanism for community curation' },
        { title: 'Basic Reputation System', completed: true, description: 'Credibility scoring for regular contributors' },
        { title: 'Web App MVP', completed: true, description: 'Responsive web application with core functionality' },
        { title: 'Content Moderation Tools', completed: true, description: 'Automated and manual content filtering systems' }
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Community & Token Launch',
      period: 'Q2 2024',
      status: 'in-progress',
      progress: 75,
      description: 'TEA token launch and enhanced community features',
      milestones: [
        { title: 'TEA Token Launch', completed: true, description: 'Native token deployment on Base network' },
        { title: 'Token Rewards System', completed: true, description: 'Earn TEA for quality submissions and engagement' },  
        { title: 'Enhanced AI Commentary', completed: false, description: 'Multi-modal AI responses with memes and GIFs' },
        { title: 'Mobile App Beta', completed: false, description: 'iOS and Android apps for mobile tea spilling' },
        { title: 'Referral Program', completed: false, description: 'Earn TEA for bringing new community members' },
        { title: 'Premium Subscriptions', completed: false, description: 'Ad-free experience and exclusive features' }
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Advanced Features',
      period: 'Q3 2024',
      status: 'planned',
      progress: 25,
      description: 'Advanced analytics and creator tools',
      milestones: [
        { title: 'Creator Monetization', completed: false, description: 'Direct monetization tools for top tea spillers' },
        { title: 'Advanced Analytics Dashboard', completed: false, description: 'Deep insights into gossip trends and patterns' },
        { title: 'Cross-Platform Integration', completed: false, description: 'Twitter, Discord, and Telegram bot integration' },
        { title: 'NFT Tea Receipts', completed: false, description: 'Mint significant tea moments as collectible NFTs' },
        { title: 'Governance Platform', completed: false, description: 'DAO voting system for platform decisions' },
        { title: 'API for Developers', completed: false, description: 'Public API for third-party integrations' }
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Scale & Expansion',
      period: 'Q4 2024',
      status: 'planned',
      progress: 0,
      description: 'Global expansion and enterprise features',
      milestones: [
        { title: 'Multi-Language Support', completed: false, description: 'Platform available in 10+ languages' },
        { title: 'Enterprise Intelligence', completed: false, description: 'B2B intel services for crypto companies' },
        { title: 'AI News Aggregation', completed: false, description: 'Automated crypto news synthesis and analysis' },
        { title: 'Mainstream Media Integration', completed: false, description: 'Partnerships with major crypto media outlets' },
        { title: 'Global Community Expansion', completed: false, description: 'Regional community managers and localization' },
        { title: 'Institutional Access Tier', completed: false, description: 'Premium intel services for institutions' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in-progress': return 'text-yellow-500';
      case 'planned': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'planned': return Circle;
      default: return Circle;
    }
  };

  return (
    <Layout pageTitle="Roadmap" pageDescription="CTea Newsroom development roadmap - Our journey to become Web3's premier gossip platform">
      <div className="min-h-screen bg-gradient-to-br from-newsprint via-pale-pink to-vintage-red-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <BrandHeader showLogo={true} showTagline={false} logoSize="lg" />
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-vintage-red uppercase tracking-wider mb-4">
              Development Roadmap
            </h1>
            <p className="text-lg md:text-xl text-tabloid-black/70 mt-6 max-w-3xl mx-auto leading-relaxed">
              Our journey to build the ultimate crypto gossip platform. From anonymous tea spilling 
              to global intelligence network — here's how we're brewing the future.
            </p>
          </div>
        </section>

        {/* Progress Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm mb-12">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline text-vintage-red">
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {roadmapPhases.map((phase, index) => {
                    const StatusIcon = getStatusIcon(phase.status);
                    return (
                      <div 
                        key={index} 
                        className={`text-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPhase === index 
                            ? 'border-vintage-red bg-vintage-red/10' 
                            : 'border-vintage-red/20 hover:border-vintage-red/40'
                        }`}
                        onClick={() => setSelectedPhase(index)}
                      >
                        <StatusIcon className={`w-8 h-8 ${getStatusColor(phase.status)} mx-auto mb-2`} />
                        <h3 className="font-bold text-tabloid-black mb-1">{phase.phase}</h3>
                        <p className="text-sm text-tabloid-black/70 mb-2">{phase.period}</p>
                        <Progress value={phase.progress} className="mb-2" />
                        <p className="text-xs text-tabloid-black/60">{phase.progress}% Complete</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detailed Phase View */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-headline text-vintage-red">
                      {roadmapPhases[selectedPhase].title}
                    </CardTitle>
                    <p className="text-tabloid-black/70 mt-2">
                      {roadmapPhases[selectedPhase].description}
                    </p>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(roadmapPhases[selectedPhase].status)} border-current px-4 py-2`}>
                    {roadmapPhases[selectedPhase].period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roadmapPhases[selectedPhase].milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border border-vintage-red/20 rounded-lg">
                      {milestone.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                      )}
                      <div>
                        <h3 className={`font-bold mb-2 ${milestone.completed ? 'text-tabloid-black' : 'text-tabloid-black/70'}`}>
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-tabloid-black/60">
                          {milestone.description}
                        </p>
                        {milestone.completed && (
                          <Badge variant="outline" className="text-green-600 border-green-600 mt-2">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-16 bg-gradient-to-r from-vintage-red/5 to-neon-pink/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              Beyond the Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm text-center">
                <CardHeader>
                  <Globe className="w-12 h-12 text-vintage-red mx-auto mb-4" />
                  <CardTitle className="text-xl font-headline text-tabloid-black">
                    Global Intelligence Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-tabloid-black/70">
                    Become the world's largest decentralized intelligence network, 
                    covering all major crypto markets and emerging trends.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm text-center">
                <CardHeader>
                  <Zap className="w-12 h-12 text-neon-pink mx-auto mb-4" />
                  <CardTitle className="text-xl font-headline text-tabloid-black">
                    AI-First Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-tabloid-black/70">
                    Advanced AI that doesn't just comment on tea, but predicts market movements 
                    and identifies alpha before it hits the mainstream.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm text-center">
                <CardHeader>
                  <Trophy className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                  <CardTitle className="text-xl font-headline text-tabloid-black">
                    Industry Standard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-tabloid-black/70">
                    Set the gold standard for crypto intelligence gathering, 
                    becoming the go-to source for traders, investors, and media.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline text-vintage-red mb-6">
              Join Our Journey
            </h2>
            <p className="text-lg text-tabloid-black/70 mb-8 max-w-2xl mx-auto">
              We're building this platform with and for the community. 
              Your feedback shapes our roadmap and priorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold px-8 py-3"
                onClick={() => window.location.href = '/spill'}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Contributing
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white font-bold px-8 py-3"
                onClick={() => window.open('https://discord.gg/cteanewsroom', '_blank')}
              >
                Join Discord
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Roadmap;
