
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { trackCTAClick } from '@/lib/analytics';
import ShareButtons from '@/components/ShareButtons';
import { 
  TrendingUp, 
  Coffee, 
  Gift, 
  Zap, 
  Sparkles, 
  Plus, 
  Trophy 
} from 'lucide-react';

interface HeroSectionProps {
  onSpillFormOpen: () => void;
  onTippingModalOpen: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSpillFormOpen, onTippingModalOpen }) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent2/20 to-accent/20"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src="/ctea-logo-full.png" 
                alt="CTea Newsroom Logo - Anonymous Crypto Gossip Platform" 
                className="w-32 h-16 sm:w-40 sm:h-20 animate-float"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'block';
                }}
              />
              <img 
                src="/ctea-logo-icon.svg" 
                alt="CTea Newsroom Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 text-accent animate-float hidden" 
              />
              <div className="absolute -top-2 -right-2">
                <Zap className="w-6 h-6 text-accent2 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Where Crypto Twitter
            <br />
            <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
              Comes to Spill.
            </span>
          </h1>
          
          {/* Enhanced Value Proposition */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 font-medium">
              Beta access now open. Managed chaos, served hot.
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              Submit your story or tip the gatekeepers to join the beta.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              className="bg-gradient-to-r from-accent to-accent2 hover:from-accent2 hover:to-accent text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              onClick={() => navigate('/feed')}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Enter App
            </Button>
            <Button 
              className="bg-gradient-to-r from-accent to-accent2 hover:from-accent2 hover:to-accent text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              onClick={() => {
                onSpillFormOpen();
                trackCTAClick('spill_tea_beta');
              }}
            >
              <Coffee className="w-5 h-5 mr-2" />
              Spill Tea for Beta Access
            </Button>
            <Button 
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 px-8 py-4 text-lg w-full sm:w-auto font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={() => {
                onTippingModalOpen();
                trackCTAClick('tip_gatekeepers');
              }}
            >
              <Gift className="w-5 h-5 mr-2" />
              Tip the Gatekeepers
            </Button>
          </div>
          <ShareButtons className="mb-8 justify-center" variant="expanded" />

          {/* Quick Navigation to App Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 p-4 h-auto hover:bg-accent/10 border-accent/30"
              onClick={() => navigate('/feed')}
            >
              <TrendingUp className="w-6 h-6 text-accent" />
              <span className="text-sm font-medium">Feed</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 p-4 h-auto hover:bg-accent/10 border-accent/30"
              onClick={() => navigate('/enhanced-feed')}
            >
              <Zap className="w-6 h-6 text-accent2" />
              <span className="text-sm font-medium">Enhanced Feed</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 p-4 h-auto hover:bg-accent/10 border-accent/30"
              onClick={() => navigate('/submit')}
            >
              <Plus className="w-6 h-6 text-accent" />
              <span className="text-sm font-medium">Submit</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 p-4 h-auto hover:bg-accent/10 border-accent/30"
              onClick={() => navigate('/campaigns')}
            >
              <Trophy className="w-6 h-6 text-accent2" />
              <span className="text-sm font-medium">Leaderboard</span>
            </Button>
          </div>

          {/* Beta Badge */}
          <div className="flex justify-center mb-8">
            <Badge className="bg-accent2 text-white font-bold px-4 py-2 text-sm animate-pulse">
              🚀 BETA ACCESS OPEN
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
