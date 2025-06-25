
import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coffee, Users, Shield, Zap, Heart, Sparkles, ExternalLink, Calendar, Target } from 'lucide-react';

const About = () => {
  // Set document title for SEO
  React.useEffect(() => {
    document.title = 'About CTea Newsroom - Where Memes, Gossip, and Crypto Collide';
  }, []);

  const timeline = [
    {
      date: "Early 2024",
      title: "The Vision",
      description: "Stephanie recognized the need for emotional intelligence in crypto discourse"
    },
    {
      date: "Mid 2024",
      title: "Development Begins",
      description: "Started building with AI-powered reactions and community-driven validation"
    },
    {
      date: "Late 2024",
      title: "Beta Launch",
      description: "Released to select crypto community members for testing and feedback"
    },
    {
      date: "2025",
      title: "Public Launch",
      description: "Opening CTea Newsroom to the entire crypto community with full features"
    }
  ];

  const values = [
    {
      title: "Emotionally Intelligent",
      description: "AI-powered reactions that understand the temperature of your tea",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Community Driven",
      description: "Your reactions and engagement determine what rises to the top",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Anonymous & Safe",
      description: "Spill tea without fear while building credible reputation",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Coffee className="w-16 h-16 text-[#FF4C7B] animate-float" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-5 h-5 text-ctea-teal animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About CTea Newsroom
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Where memes, gossip, and crypto collide. The platform where emotional intelligence 
            meets memecoin culture, and Crypto Twitter gets the AI-powered discourse it deserves.
          </p>
          <Badge className="bg-gradient-to-r from-[#FF4C7B] to-ctea-purple text-white px-4 py-2">
            Built by Stephanie (Lady Invisible)
          </Badge>
        </div>

        {/* Mission Statement */}
        <Card className="bg-ctea-dark/30 border border-[#FF4C7B]/20 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Our Mission: Emotional Intelligence Meets Memecoin Culture
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              CTea Newsroom was born from a simple realization: Crypto Twitter needed more than just 
              another social platform. It needed a way to process the emotional chaos of Web3 with 
              intelligence, reward quality discourse, and build meaningful anonymous reputations. 
              Created by <span className="text-[#FF4C7B] font-semibold">Stephanie (Lady Invisible)</span>, 
              who saw the potential for AI to transform how we handle crypto gossip, memes, and community truth.
            </p>
          </div>
        </Card>

        {/* Development Timeline */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">The Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <Card key={index} className="bg-ctea-dark/30 border border-[#FF4C7B]/20 p-6 text-center hover:border-[#FF4C7B]/40 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#FF4C7B]/20 rounded-full flex items-center justify-center text-[#FF4C7B]">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>
                <Badge className="bg-[#FF4C7B]/20 text-[#FF4C7B] border border-[#FF4C7B]/30 mb-2">
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
          <h2 className="text-3xl font-bold text-white text-center mb-8">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-ctea-dark/30 border border-[#FF4C7B]/20 p-6 text-center hover:border-[#FF4C7B]/40 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[#FF4C7B]/20 rounded-full flex items-center justify-center text-[#FF4C7B]">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Meet Stephanie */}
        <Card className="bg-gradient-to-br from-[#FF4C7B]/10 to-ctea-purple/10 border border-[#FF4C7B]/30 p-8 mb-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF4C7B] to-ctea-purple rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Meet Stephanie (Lady Invisible)</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
              The visionary behind CTea Newsroom. A crypto native who understands that the future 
              of Web3 discourse isn't just about technology—it's about emotional intelligence, 
              community building, and rewarding quality contributions. Stephanie saw the chaos 
              of Crypto Twitter and built the tools to process it smarter.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => window.open('https://arena.social/?ref=LadyInvsible', '_blank')}
                className="border-[#FF4C7B] text-[#FF4C7B] hover:bg-[#FF4C7B] hover:text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect on Arena
              </Button>
            </div>
          </div>
        </Card>

        {/* Live Stats */}
        <Card className="bg-ctea-dark/30 border border-[#FF4C7B]/20 p-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">CTea by the Numbers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF4C7B] mb-2">2,420</div>
                <div className="text-sm text-gray-400">Beta Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-ctea-teal mb-2">15.7K</div>
                <div className="text-sm text-gray-400">Tea Submissions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-ctea-yellow mb-2">420K</div>
                <div className="text-sm text-gray-400">AI Reactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-ctea-purple mb-2">69</div>
                <div className="text-sm text-gray-400">Viral Threads</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
