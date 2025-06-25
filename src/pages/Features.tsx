import React from 'react';
import Layout from '@/components/Layout';
import ModQueue from '@/components/ModQueue';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Shield, 
  Users, 
  TrendingUp, 
  Award, 
  MessageCircle, 
  Share2, 
  Bot, 
  Coins, 
  Star,
  CheckCircle,
  Lock,
  Globe,
  Smartphone
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-time Tea Spilling",
      description: "Share crypto gossip, rumors, and hot takes instantly with our lightning-fast platform.",
      color: "text-ctea-yellow",
      bgColor: "bg-ctea-yellow/10",
      borderColor: "border-ctea-yellow/30"
    },
    {
      icon: Shield,
      title: "SOAP Credibility System",
      description: "Our advanced verification system ensures quality content and builds community trust.",
      color: "text-ctea-teal",
      bgColor: "bg-ctea-teal/10",
      borderColor: "border-ctea-teal/30"
    },
    {
      icon: Bot,
      title: "AI Commentary",
      description: "Get spicy, smart, memy, or savage AI takes on every submission to enhance discussions.",
      color: "text-ctea-purple",
      bgColor: "bg-ctea-purple/10",
      borderColor: "border-ctea-purple/30"
    },
    {
      icon: Coins,
      title: "$TEA Token Rewards",
      description: "Earn tokens for quality submissions, accurate verifications, and community engagement.",
      color: "text-ctea-pink",
      bgColor: "bg-ctea-pink/10",
      borderColor: "border-ctea-pink/30"
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "Vote on platform decisions, moderate content, and shape the future of CTea.",
      color: "text-ctea-orange",
      bgColor: "bg-ctea-orange/10",
      borderColor: "border-ctea-orange/30"
    },
    {
      icon: TrendingUp,
      title: "Viral Content Tracking",
      description: "Advanced algorithms identify trending topics and viral potential in real-time.",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30"
    }
  ];

  const premiumFeatures = [
    {
      icon: Award,
      title: "Premium Verification",
      description: "Enhanced credibility badges and priority content review for verified users.",
      tier: "Premium"
    },
    {
      icon: MessageCircle,
      title: "Advanced Analytics",
      description: "Detailed insights into your content performance and audience engagement.",
      tier: "Pro"
    },
    {
      icon: Share2,
      title: "Cross-Platform Sharing",
      description: "Seamlessly share content across all major social media platforms.",
      tier: "Premium"
    },
    {
      icon: Lock,
      title: "Private Tea Rooms",
      description: "Create exclusive discussion spaces for your closest crypto community.",
      tier: "Elite"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Platform Features
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the powerful tools and features that make CTea the ultimate platform 
            for crypto gossip, community engagement, and decentralized truth-seeking.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`p-6 bg-ctea-dark/30 border ${feature.borderColor} hover:border-opacity-60 transition-all duration-300 hover:scale-105`}
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Premium Features Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Premium Features</h2>
            <p className="text-lg text-gray-300">
              Unlock advanced capabilities with our premium tiers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/80 border border-ctea-teal/20 hover:border-ctea-teal/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-ctea-teal/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-ctea-teal" />
                  </div>
                  <Badge className="bg-ctea-purple/20 text-ctea-purple border border-ctea-purple/30">
                    {feature.tier}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-ctea-teal/10 to-ctea-purple/10 border border-ctea-teal/30">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-ctea-teal mb-2">15.7K+</div>
                <div className="text-sm text-gray-400">Tea Submissions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ctea-purple mb-2">2.4K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ctea-pink mb-2">420K</div>
                <div className="text-sm text-gray-400">$TEA Distributed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ctea-yellow mb-2">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Technical Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-ctea-dark/30 border border-ctea-teal/20">
              <Globe className="w-8 h-8 text-ctea-teal mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Decentralized</h3>
              <p className="text-gray-300 text-sm">
                Built on blockchain technology for transparency and censorship resistance.
              </p>
            </Card>
            
            <Card className="p-6 bg-ctea-dark/30 border border-ctea-purple/20">
              <Smartphone className="w-8 h-8 text-ctea-purple mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Mobile First</h3>
              <p className="text-gray-300 text-sm">
                Optimized for mobile devices with progressive web app capabilities.
              </p>
            </Card>
            
            <Card className="p-6 bg-ctea-dark/30 border border-ctea-pink/20">
              <CheckCircle className="w-8 h-8 text-ctea-pink mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Real-time</h3>
              <p className="text-gray-300 text-sm">
                Instant updates and notifications keep you connected to the latest tea.
              </p>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <Card className="p-8 bg-gradient-to-br from-ctea-purple/20 to-ctea-pink/20 border border-ctea-purple/30">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Spilling Tea?</h2>
            <p className="text-gray-300 mb-6">
              Join thousands of crypto enthusiasts sharing the hottest takes and earning rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold">
                Start Spilling Tea ☕
              </Button>
              <Button variant="outline" className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10">
                Learn More
              </Button>
            </div>
          </Card>
        </div>

        {/* Moderation Queue - only show for actual moderators */}
        <ModQueue />
      </div>
    </Layout>
  );
};

export default Features;
