
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShareButtons from '@/components/ShareButtons';
import BetaDisclaimer from '@/components/BetaDisclaimer';
import LiveStats from './LiveStats';

interface HeroSectionProps {
  onSpillFormOpen?: () => void;
  onTippingModalOpen?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onSpillFormOpen,
  onTippingModalOpen
}) => {
  const navigate = useNavigate();

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
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight animate-glow">
            Spill the{' '}
            <span className="bg-gradient-to-r from-ctea-teal via-ctea-purple to-ctea-pink bg-clip-text text-transparent">
              TEA
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            The hottest takes, verified rumors, and community-driven truth in crypto. 
            <span className="text-ctea-teal font-semibold"> Earn rewards</span> for spilling the tea.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg hover:scale-105 transition-transform duration-200 shadow-lg"
            onClick={() => navigate('/feed')}
          >
            Start Spilling Tea ☕
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal hover:text-white py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg hover:scale-105 transition-transform duration-200"
            onClick={() => navigate('/submit')}
          >
            Share Your Alpha 🚀
          </Button>
        </div>

        {/* Social Sharing */}
        <div className="mb-12 px-4">
          <p className="text-gray-400 mb-4 text-sm sm:text-base">Share the revolution:</p>
          <ShareButtons
            url={window.location.origin}
            title="CTEA NEWS - The Ultimate Crypto Gossip Platform"
            variant="expanded"
            className="justify-center"
          />
        </div>

        {/* Live Stats */}
        <LiveStats />
      </div>
    </section>
  );
};

export default HeroSection;
