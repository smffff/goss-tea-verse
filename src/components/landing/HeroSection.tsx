
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Coffee } from 'lucide-react';

interface HeroSectionProps {
  onSpillFormOpen?: () => void;
  onTippingModalOpen?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onSpillFormOpen, 
  onTippingModalOpen 
}) => {
  const scrollToFeed = () => {
    const feedSection = document.getElementById('tea-feed');
    if (feedSection) {
      feedSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no feed section on page, navigate to feed page
      window.location.href = '/feed';
    }
  };

  const handleSpillTea = () => {
    if (onSpillFormOpen) {
      onSpillFormOpen();
    } else {
      // Fallback: navigate to submit page
      window.location.href = '/submit';
    }
  };

  const handleTipping = () => {
    if (onTippingModalOpen) {
      onTippingModalOpen();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-ctea-pink rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Beta Badge */}
        <div className="mb-6">
          <Badge className="bg-gradient-to-r from-ctea-pink to-purple-500 text-white font-bold px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            PUBLIC BETA LIVE
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-ctea-pink via-white to-purple-400 bg-clip-text text-transparent mb-6 font-['Playfair_Display']">
          CTea Newsroom
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-3xl text-gray-300 mb-4 font-medium">
          Where Memes, Gossip, and Crypto Collide
        </p>
        <p className="text-lg md:text-2xl text-ctea-pink mb-12 font-bold">
          Spill Tea. Get Paid.
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Anonymous crypto gossip meets AI-powered reactions. Share alpha, earn credibility, 
          and watch the community decide what's hot or cold.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={handleSpillTea}
            className="bg-gradient-to-r from-ctea-pink to-purple-500 hover:from-ctea-pink/80 hover:to-purple-500/80 text-white font-bold px-8 py-4 text-lg border-0"
          >
            <Coffee className="w-5 h-5 mr-2" />
            Spill Tea
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToFeed}
            className="border-ctea-pink text-ctea-pink hover:bg-ctea-pink hover:text-black font-bold px-8 py-4 text-lg"
          >
            View the Tea
          </Button>
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { step: '1', title: 'Submit Tea', desc: 'Share anonymous crypto gossip' },
            { step: '2', title: 'AI Reacts', desc: 'CTeaBot adds spicy commentary' },
            { step: '3', title: 'Community Reacts', desc: 'Users vote hot, cold, or spicy' },
            { step: '4', title: 'Earn Credibility', desc: 'Build reputation & future rewards' }
          ].map((item) => (
            <div key={item.step} className="text-center p-6 bg-black/50 rounded-lg border border-gray-800 hover:border-ctea-pink/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-ctea-pink to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
