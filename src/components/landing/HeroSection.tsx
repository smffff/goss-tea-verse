
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShareButtons from '@/components/ShareButtons';
import BetaDisclaimer from '@/components/BetaDisclaimer';

interface HeroSectionProps {
  onSpillFormOpen?: () => void;
  onTippingModalOpen?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onSpillFormOpen,
  onTippingModalOpen
}) => {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({
    posts: 0,
    users: 0,
    points: 0
  });

  useEffect(() => {
    // Animate numbers on component mount
    const targets = { posts: 15742, users: 2420, points: 420000 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedStats({
        posts: Math.floor(targets.posts * progress),
        users: Math.floor(targets.users * progress),
        points: Math.floor(targets.points * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, stepTime);

    // Apply glow effect to elements
    const elements = document.querySelectorAll('.animate-glow');
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      if (htmlElement) {
        htmlElement.style.textShadow = '0 0 20px rgba(0, 209, 193, 0.5)';
      }
    });

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-ctea-dark via-ctea-darker to-black"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-ctea-teal rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-ctea-purple rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-ctea-pink rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Beta Disclaimer */}
        <div className="mb-6">
          <BetaDisclaimer variant="banner" />
        </div>

        {/* Main Heading */}
        <div className="mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-ctea-teal to-ctea-purple text-white px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            The Ultimate Crypto Gossip Platform
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-glow">
            Spill the{' '}
            <span className="bg-gradient-to-r from-ctea-teal via-ctea-purple to-ctea-pink bg-clip-text text-transparent">
              TEA
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The hottest takes, verified rumors, and community-driven truth in crypto. 
            <span className="text-ctea-teal font-semibold"> Earn rewards</span> for spilling the tea.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold py-4 px-8 text-lg hover:scale-105 transition-transform duration-200 shadow-lg"
            onClick={() => navigate('/feed')}
          >
            Start Spilling Tea ☕
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-white py-4 px-8 text-lg hover:scale-105 transition-transform duration-200"
            onClick={() => navigate('/submit')}
          >
            Share Your Alpha 🚀
          </Button>
        </div>

        {/* Social Sharing */}
        <div className="mb-12">
          <p className="text-gray-400 mb-4">Share the revolution:</p>
          <ShareButtons
            url={window.location.origin}
            title="CTEA NEWS - The Ultimate Crypto Gossip Platform"
            variant="expanded"
            className="justify-center"
          />
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-ctea-dark/30 backdrop-blur-lg border border-ctea-teal/20 rounded-xl p-6 hover:border-ctea-teal/40 transition-colors duration-300">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-ctea-teal mr-2" />
              <span className="text-2xl font-bold text-white">{animatedStats.posts.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Hot Takes Shared</p>
          </div>
          
          <div className="bg-ctea-dark/30 backdrop-blur-lg border border-ctea-purple/20 rounded-xl p-6 hover:border-ctea-purple/40 transition-colors duration-300">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-ctea-purple mr-2" />
              <span className="text-2xl font-bold text-white">{animatedStats.users.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Active Tea Sippers</p>
          </div>
          
          <div className="bg-ctea-dark/30 backdrop-blur-lg border border-ctea-pink/20 rounded-xl p-6 hover:border-ctea-pink/40 transition-colors duration-300">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-ctea-pink mr-2" />
              <span className="text-2xl font-bold text-white">{animatedStats.points.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">$TEA Points Earned</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
