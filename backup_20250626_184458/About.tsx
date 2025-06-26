
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coffee, Users, Zap, Trophy, Shield, Sparkles } from 'lucide-react';
import { BrandHeader } from '@/components/brand/BrandElements';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const About = () => {
  const features = [
    {
      icon: Coffee,
      title: 'Anonymous Gossip',
      description: 'Spill the hottest crypto tea without revealing your identity. Our platform protects whistleblowers and alpha leakers.',
      color: 'text-vintage-red'
    },
    {
      icon: Zap,
      title: 'AI-Powered Commentary',
      description: 'CTeaBot adds witty, intelligent commentary to every submission, making even the driest intel entertaining.',
      color: 'text-neon-pink'
    },
    {
      icon: Users,
      title: 'Community Curation',
      description: 'The community votes on submissions with 🔥 (hot) or 🧊 (cold) reactions, surfacing the most credible intel.',
      color: 'text-teal-400'
    },
    {
      icon: Trophy,
      title: 'Credibility System',
      description: 'Build your reputation as a reliable source and earn TEA tokens for quality submissions.',
      color: 'text-yellow-400'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Advanced security measures protect user identities while maintaining content authenticity.',
      color: 'text-purple-400'
    },
    {
      icon: Sparkles,
      title: 'Memecoin Culture',
      description: 'Where emotional intelligence meets memecoin degeneracy — serious alpha with unserious delivery.',
      color: 'text-blue-400'
    }
  ];

  return (
    <Layout pageTitle="About" pageDescription="Learn about CTea Newsroom - Web3's anonymous crypto gossip platform">
      <div className="min-h-screen bg-gradient-to-br from-newsprint via-pale-pink to-vintage-red-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <BrandHeader showLogo={true} showTagline={true} logoSize="xl" />
            <p className="text-lg md:text-xl text-tabloid-black/70 mt-6 max-w-3xl mx-auto leading-relaxed">
              The underground newsroom where crypto's most scandalous stories surface first. 
              Built by degens, for degens who know that the best intel comes from the shadows.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="border-vintage-red/20 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline text-vintage-red mb-4">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center max-w-4xl mx-auto">
                <p className="text-lg text-tabloid-black/80 leading-relaxed mb-6">
                  In a world where crypto Twitter is full of paid shills and fake alpha, 
                  we're building the platform where real intel surfaces. Anonymous. Unfiltered. 
                  Community-verified. Where insiders can safely spill tea without career suicide.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🕵️</div>
                    <h3 className="font-bold text-vintage-red mb-1">Anonymous Intel</h3>
                    <p className="text-sm text-tabloid-black/60">Protect sources, surface truth</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤖</div>
                    <h3 className="font-bold text-vintage-red mb-1">AI Enhancement</h3>
                    <p className="text-sm text-tabloid-black/60">Every story gets better with CTeaBot</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">👥</div>
                    <h3 className="font-bold text-vintage-red mb-1">Community Truth</h3>
                    <p className="text-sm text-tabloid-black/60">Crowd-sourced credibility scoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              How We're Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-vintage-red/20 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                    <CardTitle className="text-xl font-headline text-tabloid-black">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-tabloid-black/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-r from-vintage-red/5 to-neon-pink/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline text-vintage-red text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-vintage-red mb-4">Privacy Above All</h3>
                <p className="text-tabloid-black/70">
                  Your identity is sacred. We use advanced cryptographic techniques to ensure 
                  even we can't trace submissions back to you.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-vintage-red mb-4">Speed to Market</h3>
                <p className="text-tabloid-black/70">
                  When alpha drops, seconds matter. Our platform is built for real-time 
                  intel distribution at light speed.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-vintage-red mb-4">Quality Over Quantity</h3>
                <p className="text-tabloid-black/70">
                  We're not trying to be crypto Twitter. We're the place for high-signal, 
                  low-noise intel that actually moves markets.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-vintage-red mb-4">Community Owned</h3>
                <p className="text-tabloid-black/70">
                  Built by the community, for the community. TEA token holders govern 
                  the platform and share in its success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline text-vintage-red mb-6">
              Ready to Spill Some Tea?
            </h2>
            <p className="text-lg text-tabloid-black/70 mb-8 max-w-2xl mx-auto">
              Join the underground newsroom where crypto's biggest stories break first. 
              Anonymous. Unfiltered. Unmissable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold px-8 py-3"
                onClick={() => window.location.href = '/spill'}
              >
                <Coffee className="w-5 h-5 mr-2" />
                Start Spilling Tea
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white font-bold px-8 py-3"
                onClick={() => window.location.href = '/feed'}
              >
                Browse the Feed
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
