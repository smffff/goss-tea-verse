import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Coffee, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TeaCup from '@/components/TeaCup';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark retro-grid flex items-center justify-center">
      <div className="container-responsive">
        <Card className="card-responsive bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border max-w-md w-full text-center">
          {/* Logo - Mobile responsive */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <img 
              src="/ctea-logo-icon.png" 
              alt="CTEA Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20" 
            />
          </div>
          
          {/* Error Code - Mobile responsive */}
          <h1 className="text-4xl sm:text-6xl font-bold text-ctea-teal mb-3 sm:mb-4 font-montserrat animate-glow">
            404
          </h1>
          
          {/* Error Title - Mobile responsive */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 font-montserrat">
            Tea Not Found ☕
          </h2>
          
          {/* Error Message - Mobile responsive */}
          <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8">
            This page seems to have vanished like a rug pull. The tea you're looking for 
            doesn't exist in our newsroom.
          </p>
          
          {/* Action Buttons - Mobile responsive */}
          <div className="space-y-3 sm:space-y-4">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-ctea text-white font-bold btn-responsive"
            >
              <Home className="icon-responsive mr-2" />
              Back to Home
            </Button>
            
            <Button 
              onClick={() => navigate('/feed')}
              variant="outline"
              className="w-full border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 btn-responsive"
            >
              <Coffee className="icon-responsive mr-2" />
              Browse Hot Takes
            </Button>

            <Button 
              onClick={() => navigate('/submit')}
              variant="outline"
              className="w-full border-ctea-pink text-ctea-pink hover:bg-ctea-pink/10 btn-responsive"
            >
              <Plus className="icon-responsive mr-2" />
              Spill New Tea
            </Button>
          </div>
          
          {/* Footer Message - Mobile responsive */}
          <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
            Lost? Try spilling some fresh tea to get back in the game! 🚀
          </div>

          {/* Decorative Tea Cup - Mobile responsive */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <div className="animate-float">
              <TeaCup size="sm" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
