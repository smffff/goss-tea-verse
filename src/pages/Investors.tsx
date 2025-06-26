import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Zap, 
  Shield, 
  Bot,
  FileText,
  Download,
  ExternalLink,
  Target,
  PieChart,
  BarChart3,
  Globe,
  Rocket
} from 'lucide-react';

const Investors = () => {
  const investmentHighlights = [
    {
      metric: '$2.5M',
      label: 'Target Raise',
      description: 'Seed round to accelerate growth',
      icon: DollarSign
    },
    {
      metric: '15%',
      label: 'Equity Offered',
      description: 'Strategic allocation for growth',
      icon: PieChart
    },
    {
      metric: '10K+',
      label: 'Active Users',
      description: 'Growing community base',
      icon: Users
    },
    {
      metric: '85%',
      label: 'User Retention',
      description: 'Strong engagement metrics',
      icon: TrendingUp
    }
  ];

  const useOfFunds = [
    {
      category: 'Product Development',
      percentage: 40,
      amount: '$1M',
      description: 'AI system enhancement, mobile app development, and platform scaling',
      items: ['Advanced AI Moderation', 'Mobile App Launch', 'API Development', 'Performance Optimization']
    },
    {
      category: 'Team Expansion',
      percentage: 30,
      amount: '$750K',
      description: 'Hiring key roles to accelerate growth and innovation',
      items: ['CTO & Technical Lead', 'Head of Community', 'Head of Marketing', 'AI/ML Engineers']
    },
    {
      category: 'Marketing & Growth',
      percentage: 20,
      amount: '$500K',
      description: 'User acquisition, brand building, and community expansion',
      items: ['Digital Marketing Campaigns', 'Influencer Partnerships', 'Community Events', 'Content Creation']
    },
    {
      category: 'Operations & Legal',
      percentage: 10,
      amount: '$250K',
      description: 'Legal compliance, infrastructure, and operational costs',
      items: ['Legal & Compliance', 'Infrastructure Scaling', 'Security Audits', 'Administrative Costs']
    }
  ];

  const marketOpportunity = [
    {
      title: 'Crypto Information Market',
      size: '$15B+',
      growth: '25% CAGR',
      description: 'Growing demand for reliable crypto information and alpha'
    },
    {
      title: 'AI Content Moderation',
      size: '$8B+',
      growth: '30% CAGR',
      description: 'Increasing need for AI-powered content safety solutions'
    },
    {
      title: 'Web3 Social Platforms',
      size: '$12B+',
      growth: '35% CAGR',
      description: 'Emerging market for decentralized social applications'
    }
  ];

  const competitiveAdvantages = [
    {
      title: 'AI-First Approach',
      description: 'Advanced AI moderation and commentary systems that scale with growth',
      icon: Bot
    },
    {
      title: 'Anonymous by Design',
      description: 'Privacy-focused platform that protects user identity while maintaining accountability',
      icon: Shield
    },
    {
      title: 'Crypto Native',
      description: 'Built for and by the crypto community, with deep understanding of the space',
      icon: Globe
    },
    {
      title: 'Token Economics',
      description: 'Innovative token incentive system that aligns user and platform interests',
      icon: Zap
    }
  ];

  const documents = [
    {
      name: 'CTea Executive Summary',
      description: 'Comprehensive overview of our vision, market opportunity, and growth strategy',
      icon: FileText,
      downloadUrl: '/documents/ctea-executive-summary.pdf'
    },
    {
      name: 'CTea Pitch Deck',
      description: 'Detailed presentation covering our business model, traction, and financial projections',
      icon: BarChart3,
      downloadUrl: '/documents/ctea-pitch-deck.pdf'
    },
    {
      name: 'CTea Tokenomics',
      description: 'Complete breakdown of $TEA token economics and utility',
      icon: PieChart,
      downloadUrl: '/documents/ctea-tokenomics.pdf'
    },
    {
      name: 'CTea Technical Whitepaper',
      description: 'In-depth technical architecture and AI system documentation',
      icon: Target,
      downloadUrl: '/documents/ctea-technical-whitepaper.pdf'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full border border-ctea-teal/30">
              <TrendingUp className="w-8 h-8 text-ctea-teal" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-glow">
            Investor Relations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join us in building the future of crypto information sharing. 
            We're raising $2.5M to accelerate our mission and scale globally.
          </p>
        </div>

        {/* Investment Highlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Investment Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-ctea-teal" />
                    </div>
                    <div className="text-2xl font-bold text-ctea-teal mb-2">{highlight.metric}</div>
                    <div className="text-white font-semibold mb-2">{highlight.label}</div>
                    <p className="text-gray-300 text-sm">{highlight.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Use of Funds */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Use of Funds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useOfFunds.map((category, index) => (
              <Card key={index} className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-white">{category.category}</CardTitle>
                      <p className="text-gray-300">{category.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-ctea-teal">{category.amount}</div>
                      <div className="text-sm text-gray-400">{category.percentage}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-ctea-teal rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Market Opportunity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketOpportunity.map((market, index) => (
              <Card key={index} className="bg-gradient-to-br from-ctea-teal/10 to-ctea-purple/10 border-ctea-teal/30">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">{market.title}</h3>
                  <div className="text-2xl font-bold text-ctea-teal mb-1">{market.size}</div>
                  <div className="text-sm text-ctea-purple mb-3">{market.growth}</div>
                  <p className="text-gray-300 text-sm">{market.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Competitive Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competitiveAdvantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-ctea-teal" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{advantage.title}</h3>
                        <p className="text-gray-300">{advantage.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Investor Documents */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Investor Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-ctea-teal" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{doc.name}</h3>
                        <p className="text-gray-300 mb-4">{doc.description}</p>
                        <Button 
                          variant="outline" 
                          className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                          onClick={() => window.open(doc.downloadUrl, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-ctea-teal/30">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-ctea-teal/20 to-ctea-purple/20 rounded-full border border-ctea-teal/30">
                <Rocket className="w-6 h-6 text-ctea-teal" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Invest?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join us in building the future of crypto information sharing. 
              We're looking for strategic investors who share our vision and can help us scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-gradient-ctea text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Schedule a Call
              </a>
              <a 
                href="mailto:investors@cteanews.com" 
                className="border border-ctea-teal text-ctea-teal px-6 py-3 rounded-lg font-bold hover:bg-ctea-teal/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Investors; 