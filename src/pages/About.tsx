
import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coffee, Users, Shield, Zap, Heart, Sparkles, ExternalLink, Calendar, Target } from 'lucide-react';

const About = () => {
  // Set document title for SEO
  React.useEffect(() => {
    document.title = 'About CTea Newsroom - Built by ladyinvsible';
  }, []);

  const timeline = [
    {
      date: "Early 2024",
      title: "The Idea",
      description: "ladyinvsible recognized the need for anonymous gossip in crypto Twitter"
    },
    {
      date: "Mid 2024",
      title: "Development Begins",
      description: "Started building with modern web technologies and privacy-first design"
    },
    {
      date: "Late 2024",
      title: "Beta Launch",
      description: "Released to select crypto community members for testing"
    },
    {
      date: "2025",
      title: "Public Launch",
      description: "Opening the tea house to the entire crypto community"
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            The anonymous dropbox for crypto gossip, alpha leaks, and meme-fueled market takes.
          </p>
          <Badge className="bg-gradient-to-r from-ctea-pink to-ctea-purple text-white px-4 py-2">
            Built by ladyinvsible
          </Badge>
        </div>

        {/* Origin Story */}
        <Card className="bg-ctea-dark/30 border border-ctea-teal/20 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              The Origin Story
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              CTea Newsroom was born from the brilliant mind of <span className="text-ctea-teal font-semibold">ladyinvsible</span>, 
              a crypto enthusiast who spent years navigating the chaotic waters of crypto Twitter. 
              After witnessing countless alpha leaks, market manipulations, and behind-the-scenes drama, 
              she realized something was missing: a place where people could share the real tea anonymously.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-ctea-teal flex items-center gap-2">
                <Target className="w-5 h-5" />
                The Problem
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Crypto Twitter was full of posturing, fake alpha, and fear of speaking truth to power. 
                People had hot takes and insider knowledge but nowhere safe to share it. The community 
                needed a gossip column, not another technical whitepaper.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-ctea-purple flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                The Solution
              </h3>
              <p className="text-gray-300 leading-relaxed">
                ladyinvsible envisioned a platform where anonymity meets accountability, where 
                community curation ensures quality, and where every voice—from whale to pleb—
                could contribute to the collective knowledge of crypto.
              </p>
            </div>
          </div>
        </Card>

        {/* Development Timeline */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Development Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <Card key={index} className="bg-ctea-dark/30 border border-ctea-teal/20 p-6 text-center hover:border-ctea-teal/40 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-ctea-teal/20 rounded-full flex items-center justify-center text-ctea-teal">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>
                <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30 mb-2">
                  {item.date}
                </Badge>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

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

        {/* Meet ladyinvsible */}
        <Card className="bg-gradient-to-br from-ctea-teal/10 to-ctea-purple/10 border border-ctea-teal/30 p-8 mb-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Meet ladyinvsible</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
              The visionary behind CTea Newsroom. A crypto native who understands both the power 
              and the problems of decentralized communities. She built this platform not just as 
              a developer, but as someone who lives and breathes crypto culture.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => window.open('https://arena.social/?ref=LadyInvsible', '_blank')}
                className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-black"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect on Arena
              </Button>
            </div>
          </div>
        </Card>

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
