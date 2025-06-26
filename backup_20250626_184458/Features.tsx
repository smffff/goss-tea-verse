
import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, TrendingUp, Users, Zap, Award, Shield, Coins, Vote } from 'lucide-react';
import EnhancedMemeGenerator from '@/components/EnhancedMemeGenerator';
import DAOGovernance from '@/components/DAOGovernance';
import SOAPCredibilitySystem from '@/components/SOAPCredibilitySystem';
import TokenIntegration from '@/components/TokenIntegration';
import WeeklyCampaignManager from '@/components/WeeklyCampaignManager';
import ModQueue from '@/components/ModQueue';

const Features = () => {
  const features = [
    {
      icon: Coffee,
      title: 'Tea Submissions',
      description: 'Share the hottest crypto gossip and alpha with the community',
      status: 'live',
      color: 'ctea-teal'
    },
    {
      icon: TrendingUp,
      title: 'Viral Tracking',
      description: 'Real-time tracking of trending topics and viral content',
      status: 'live',
      color: 'ctea-purple'
    },
    {
      icon: Users,
      title: 'Community Voting',
      description: 'Democratic content curation through community reactions',
      status: 'live',
      color: 'ctea-pink'
    },
    {
      icon: Zap,
      title: 'AI Commentary',
      description: 'Smart AI analysis and commentary on submissions',
      status: 'beta',
      color: 'ctea-yellow'
    },
    {
      icon: Award,
      title: 'Reputation System',
      description: 'Build credibility through quality contributions',
      status: 'live',
      color: 'green-500'
    },
    {
      icon: Shield,
      title: 'SOAP Verification',
      description: 'Advanced credibility scoring and verification system',
      status: 'live',
      color: 'blue-500'
    },
    {
      icon: Coins,
      title: '$TEA Tokens',
      description: 'Earn and spend native tokens for platform features',
      status: 'live',
      color: 'ctea-orange'
    },
    {
      icon: Vote,
      title: 'DAO Governance',
      description: 'Participate in platform governance and decision making',
      status: 'beta',
      color: 'ctea-teal'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Platform Features
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore all the powerful features that make CTEA NEWS the ultimate crypto gossip platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 hover:border-ctea-teal/50 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Icon className={`w-8 h-8 text-${feature.color}`} />
                    <Badge 
                      className={`${
                        feature.status === 'live' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}
                    >
                      {feature.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Feature Demos */}
        <div className="space-y-12">
          {/* Meme Generator */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">🎨 Enhanced Meme Generator</h2>
            <EnhancedMemeGenerator 
              submissionId="demo"
              content="Demo meme content for features page"
              category="general"
            />
          </section>

          {/* Token Integration */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">💰 $TEA Token Integration</h2>
            <TokenIntegration />
          </section>

          {/* DAO Governance */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">🗳️ DAO Governance</h2>
            <DAOGovernance />
          </section>

          {/* SOAP Credibility System */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">🛡️ SOAP Credibility System</h2>
            <SOAPCredibilitySystem />
          </section>

          {/* Weekly Campaign Manager */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">📅 Weekly Campaigns</h2>
            <WeeklyCampaignManager />
          </section>

          {/* Moderation Queue */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">🛡️ Moderation System</h2>
            <ModQueue />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Features;
