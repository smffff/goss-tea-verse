import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, Users, Zap, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Coffee,
      title: 'Spill Anonymous Tea',
      description: 'Share crypto gossip, rumors, and alpha without revealing your identity.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Reactions',
      description: 'Our AI bot CTeaBot adds spicy commentary and rates content for credibility.'
    },
    {
      icon: Users,
      title: 'Community Voting',
      description: 'Users vote content as hot, cold, or spicy to surface the best submissions.'
    },
    {
      icon: Shield,
      title: 'Earn Credibility',
      description: 'Build reputation through quality submissions and community engagement.'
    }
  ];

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <img 
            src="/ctea-logo-full.png" 
            alt="CTea Newsroom Full Logo" 
            className="w-64 mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-[\'Anton\'] font-bold text-white mb-6 animate-glow">
            About CTea Newsroom
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform where crypto gossip meets AI-powered insights. 
            We're building the future of anonymous information sharing in the digital asset space.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-gradient-to-br from-ctea-dark/50 to-ctea-darker/50 border-white/10 mb-16">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              To democratize information flow in the crypto space by providing a secure, 
              anonymous platform where community members can share insights, rumors, and alpha 
              while maintaining accountability through AI moderation and community governance.
            </p>
          </CardContent>
        </Card>

        {/* Arena Stream & Tip Jar */}
        <Card className="bg-gradient-to-br from-ctea-teal/10 to-ctea-pink/10 border-ctea-teal/20 mb-16">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Live Arena Stream</h2>
            <div className="w-full max-w-3xl mx-auto mb-6">
              <iframe
                src="https://arena.app/ladyinvisible/live"
                width="100%"
                height="500"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                title="Arena Live Stream"
                className="rounded-lg shadow-lg border border-ctea-teal/30"
              ></iframe>
            </div>
            <a
              href="https://arena.app/ladyinvisible/support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-lg bg-ctea-pink text-white font-semibold shadow btn-hover-glow hover:bg-ctea-teal transition-colors"
            >
              Tip the Source
            </a>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-ctea-dark/50 border-white/10 card-hover">
                <CardContent className="p-6">
                  <Icon className="w-12 h-12 text-[#00d1c1] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Submit Tea', desc: 'Share anonymous crypto gossip or insights' },
              { step: '2', title: 'AI Analysis', desc: 'CTeaBot analyzes and rates your submission' },
              { step: '3', title: 'Community Votes', desc: 'Users vote on credibility and relevance' },
              { step: '4', title: 'Earn Reputation', desc: 'Build credibility through quality content' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-ctea rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <Card className="bg-gradient-to-br from-[#ff61a6]/20 to-[#00d1c1]/20 border-[#00d1c1]/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Transparency</h3>
                <p className="text-gray-300">Open-source development and clear community guidelines</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Privacy</h3>
                <p className="text-gray-300">Anonymous submissions with secure identity protection</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Community</h3>
                <p className="text-gray-300">Powered by and for the crypto community</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
