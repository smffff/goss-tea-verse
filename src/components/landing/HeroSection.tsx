
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
      window.location.href = '/feed';
    }
  };

  const handleSpillTea = () => {
    if (onSpillFormOpen) {
      onSpillFormOpen();
    } else {
      window.location.href = '/submit';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-newsprint via-pale-pink to-newsprint overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-vintage-red rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-tabloid-black rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-vintage-red rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Beta Badge */}
        <div className="mb-6">
          <Badge className="bg-gradient-to-r from-vintage-red to-tabloid-black text-white font-bold px-4 py-2 text-sm shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            BREAKING: GOSSIP INCOMING
          </Badge>
        </div>

        {/* Centered Logo */}
        <div className="mb-8">
          {/* TODO: Replace with hero banner image when provided */}
          <img 
            src="/ctea-logo-icon.svg" 
            alt="CTea Newsroom" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 drop-shadow-2xl animate-float"
          />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-7xl font-display font-bold text-tabloid-black mb-6 leading-tight tabloid-headline animate-red-glow">
          CTea Newsroom
        </h1>

        {/* Subheading with retro styling */}
        <h2 className="text-xl md:text-3xl font-display text-vintage-red mb-4 font-bold uppercase tracking-wide drop-shadow-md">
          Web3's Gossip Feed
        </h2>
        
        {/* Hero Tagline */}
        <p className="text-lg md:text-2xl font-display text-tabloid-black mb-12 font-medium italic drop-shadow-sm">
          "Spill tea anonymously or say it with your chest"
        </p>

        {/* Updated CTA Buttons with new copy */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={handleSpillTea}
            className="btn-pill btn-pill-red text-white font-bold px-8 py-4 text-lg border-0 shadow-xl btn-tabloid-hover"
          >
            <Coffee className="w-5 h-5 mr-2" />
            Spill the Tea
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToFeed}
            className="btn-pill border-2 border-tabloid-black text-tabloid-black hover:bg-tabloid-black hover:text-white font-bold px-8 py-4 text-lg shadow-lg btn-tabloid-hover"
          >
            Read What's Brewing
          </Button>
        </div>

        {/* How It Works - Enhanced with emojis */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { step: '1', title: 'SPILL THE TEA', desc: 'Drop anonymous crypto intel', icon: '🕵️' },
            { step: '2', title: 'AI REACTS', desc: 'CTeaBot adds spicy commentary', icon: '🤖' },
            { step: '3', title: 'CROWD JUDGES', desc: 'Community votes: 🔥 or 🧊', icon: '👥' },
            { step: '4', title: 'EARN CLOUT', desc: 'Build credibility & unlock rewards', icon: '🏆' }
          ].map((item) => (
            <div key={item.step} className="text-center p-6 bg-white/80 rounded-lg border-2 border-vintage-red/20 hover:border-vintage-red/40 transition-colors shadow-lg card-tabloid-hover backdrop-blur-sm">
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="w-12 h-12 bg-gradient-to-r from-vintage-red to-tabloid-black rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-tabloid-black font-bold mb-2 uppercase tracking-wide font-display">{item.title}</h3>
              <p className="text-tabloid-black/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
