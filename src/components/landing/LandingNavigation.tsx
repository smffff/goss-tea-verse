
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-accent/30 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom Logo" 
              className="w-8 h-8"
            />
            <span className="font-bold text-gray-900">CTea Newsroom</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#leaderboard" className="text-gray-600 hover:text-accent font-medium transition-colors">Leaderboard</a>
            <a href="#about" className="text-gray-600 hover:text-accent font-medium transition-colors">About</a>
            <a href="#submit" className="text-gray-600 hover:text-accent font-medium transition-colors">Submit</a>
            <Button 
              onClick={() => navigate('/feed')}
              className="bg-gradient-to-r from-accent to-accent2 hover:from-accent2 hover:to-accent text-white font-bold px-4 py-2 text-sm"
            >
              Enter App
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
