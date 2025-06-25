import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Users, Shield, Zap, Heart, Sparkles } from 'lucide-react';

const About = () => {
  // Set document title for SEO
  React.useEffect(() => {
    document.title = 'About CTea Newsroom - Anonymous Crypto Gossip Platform';
  }, []);

  const teamMembers = [
    {
      name: "Anonymous Team",
      role: "Core Contributors",
      description: "A collective of crypto enthusiasts, meme lords, and chaos agents",
      icon: <Users className="w-6 h-6" />
    },
    {
      name: "Community",
      role: "Tea Spillers",
      description: "The real heroes who keep the gossip flowing",
      icon: <Coffee className="w-6 h-6" />
    }
  ];

  const values = [
    {
      title: "Anonymous",
      description: "Spill tea without fear of doxxing",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Transparent",
      description: "Open source, community-driven",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Fun",
      description: "Because crypto should be entertaining",
      icon: <Heart className="w-6 h-6" />
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Coffee className="w-16 h-16 text-ctea-teal animate-float" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-5 h-5 text-ctea-pink animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About CTea Newsroom
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The anonymous dropbox for crypto gossip, alpha leaks, and meme-fueled market takes.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              CTea Newsroom exists because Web3 doesn't need another whitepaper—it needs a gossip column. 
              We're building the platform where crypto Twitter comes to spill, where alpha gets shared anonymously, 
              and where the community decides what's hot and what's not.
            </p>
          </div>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-ctea-dark/30 border border-ctea-teal/20 p-6 text-center hover:border-ctea-teal/40 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-ctea-teal/20 rounded-full flex items-center justify-center text-ctea-teal">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-ctea-dark/30 border border-ctea-teal/20 p-6 hover:border-ctea-teal/40 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-ctea-teal/20 rounded-full flex items-center justify-center text-ctea-teal">
                    {member.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30">
                      {member.role}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-300">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">CTea by the Numbers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-ctea-teal mb-2">2,420</div>
                <div className="text-sm text-gray-400">Beta Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-ctea-pink mb-2">15.7K</div>
                <div className="text-sm text-gray-400">Hot Takes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-ctea-yellow mb-2">420K</div>
                <div className="text-sm text-gray-400">$TEA Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-ctea-cyan mb-2">69</div>
                <div className="text-sm text-gray-400">Viral Memes</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default About; 