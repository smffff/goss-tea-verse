
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Trophy, 
  Zap, 
  Users, 
  TrendingUp, 
  Coffee,
  Star,
  Target,
  Clock,
  Gift
} from 'lucide-react';
import { BrandHeader } from '@/components/brand/BrandElements';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const MemeOps = () => {
  const weeklySchedule = [
    {
      day: 'Monday',
      theme: 'Meme Monday',
      description: 'Drop your spiciest crypto memes and hot takes',
      emoji: '🔥',
      rewards: '100 TEA tokens for top meme',
      color: 'bg-red-500/20 text-red-400 border-red-500/30'
    },
    {
      day: 'Tuesday',
      theme: 'Tea Tuesday',
      description: 'Spill the week\'s hottest gossip and insider intel',
      emoji: '☕',
      rewards: '150 TEA tokens for verified tea',
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      day: 'Wednesday',
      theme: 'Wild Wednesday',
      description: 'Share the most outrageous crypto predictions',
      emoji: '🚀',
      rewards: '120 TEA tokens for bold predictions',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      day: 'Thursday',
      theme: 'Throwback Thursday',
      description: 'Roast old crypto projects and forgotten tokens',
      emoji: '💀',
      rewards: '80 TEA tokens for savage roasts',
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    },
    {
      day: 'Friday',
      theme: 'Flex Friday',
      description: 'Show off your gains (or losses) and portfolio',
      emoji: '💎',
      rewards: '200 TEA tokens for portfolio reveals',
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    {
      day: 'Weekend',
      theme: 'Chaos Mode',
      description: 'Anything goes - pure degeneracy encouraged',
      emoji: '🎭',
      rewards: '300 TEA tokens for weekend chaos',
      color: 'bg-neon-pink/20 text-neon-pink border-neon-pink/30'
    }
  ];

  const campaignMetrics = [
    { label: 'Weekly Participants', value: '2,500+', icon: Users },
    { label: 'Total TEA Rewards', value: '50,000', icon: Gift },
    { label: 'Viral Submissions', value: '150+', icon: TrendingUp },
    { label: 'Community Engagement', value: '95%', icon: Star }
  ];

  const engagementRules = [
    {
      title: 'Quality Over Quantity',
      description: 'One high-quality submission beats ten low-effort posts',
      icon: Target
    },
    {
      title: 'Community Validation',
      description: 'Submissions are voted on by the community using 🔥 and 🧊 reactions',
      icon: Users
    },
    {
      title: 'Authenticity Matters',
      description: 'Original content and genuine insights get higher rewards',
      icon: Star
    },
    {
      title: 'Timing is Everything',
      description: 'Submit during peak hours for maximum visibility and engagement',
      icon: Clock
    }
  ];

  return (
    <Layout 
      pageTitle="MemeOps Campaign" 
      pageDescription="Join CTea's weekly MemeOps campaign - earn TEA tokens for your crypto memes, gossip, and hot takes"
    >
      <div className="min-h-screen bg-gradient-to-br from-newsprint via-pale-pink to-vintage-red-50">
        {/* Hero Section */}
        <section className="py-20" role="banner">
          <div className="container mx-auto px-4 text-center">
            <BrandHeader showLogo={true} showTagline={false} logoSize="lg" />
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-vintage-red uppercase tracking-wider mb-4">
              MemeOps Campaign
            </h1>
            <p className="text-lg md:text-xl text-tabloid-black/70 mt-6 max-w-3xl mx-auto leading-relaxed">
              Join the weekly chaos where memes meet rewards. Earn TEA tokens for your crypto content, 
              hot takes, and community engagement. Every day brings new themes and bigger rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button 
                size="lg" 
                className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold px-8 py-3"
                onClick={() => window.location.href = '/spill'}
                aria-label="Start participating in MemeOps campaign"
              >
                <Coffee className="w-5 h-5 mr-2" aria-hidden="true" />
                Join Campaign
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white font-bold px-8 py-3"
                onClick={() => window.location.href = '/feed'}
                aria-label="View current campaign submissions"
              >
                View Submissions
              </Button>
            </div>
          </div>
        </section>

        {/* Campaign Metrics */}
        <section className="py-16" aria-labelledby="campaign-metrics">
          <div className="container mx-auto px-4">
            <h2 id="campaign-metrics" className="text-3xl font-headline text-vintage-red text-center mb-12">
              Campaign Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {campaignMetrics.map((metric, index) => (
                <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <metric.icon className="w-8 h-8 text-vintage-red mx-auto mb-4" aria-hidden="true" />
                    <div className="text-2xl font-bold text-tabloid-black mb-2">{metric.value}</div>
                    <div className="text-sm text-tabloid-black/70">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="py-16 bg-gradient-to-r from-vintage-red/5 to-neon-pink/5" aria-labelledby="weekly-schedule">
          <div className="container mx-auto px-4">
            <h2 id="weekly-schedule" className="text-3xl font-headline text-vintage-red text-center mb-12">
              Weekly Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weeklySchedule.map((day, index) => (
                <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-headline text-tabloid-black">
                        {day.day}
                      </CardTitle>
                      <div className="text-3xl" role="img" aria-label={`${day.theme} emoji`}>
                        {day.emoji}
                      </div>
                    </div>
                    <Badge className={`${day.color} font-bold`}>
                      {day.theme}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-tabloid-black/70 mb-4 leading-relaxed">
                      {day.description}
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center text-sm font-medium text-yellow-800">
                        <Trophy className="w-4 h-4 mr-2" aria-hidden="true" />
                        Reward
                      </div>
                      <div className="text-sm text-yellow-700 mt-1">
                        {day.rewards}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Rules */}
        <section className="py-16" aria-labelledby="engagement-rules">
          <div className="container mx-auto px-4">
            <h2 id="engagement-rules" className="text-3xl font-headline text-vintage-red text-center mb-12">
              How to Win
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {engagementRules.map((rule, index) => (
                <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <rule.icon className="w-8 h-8 text-vintage-red" aria-hidden="true" />
                      <CardTitle className="text-lg font-headline text-tabloid-black">
                        {rule.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-tabloid-black/70 leading-relaxed">
                      {rule.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-teal-400/5 to-purple-400/5" role="complementary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline text-vintage-red mb-6">
              Ready to Dominate MemeOps?
            </h2>
            <p className="text-lg text-tabloid-black/70 mb-8 max-w-2xl mx-auto">
              Join thousands of degenerates earning TEA tokens for their crypto content. 
              The spicier the take, the bigger the reward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold px-8 py-3"
                onClick={() => window.location.href = '/spill'}
                aria-label="Start earning TEA tokens today"
              >
                <Zap className="w-5 h-5 mr-2" aria-hidden="true" />
                Start Earning
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white font-bold px-8 py-3"
                onClick={() => window.open(BRAND_CONFIG.social.discord, '_blank')}
                aria-label="Join Discord community"
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

export default MemeOps;
