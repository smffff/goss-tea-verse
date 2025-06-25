
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingNavigation = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-accent/30 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom Logo" 
              className="w-8 h-8"
            />
            <span className="font-bold text-gray-900">CTea Newsroom</span>
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('leaderboard')}
              className="text-gray-600 hover:text-accent font-medium transition-colors"
            >
              Leaderboard
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-accent font-medium transition-colors"
            >
              About
            </button>
            <Link to="/submit" className="text-gray-600 hover:text-accent font-medium transition-colors">
              Submit
            </Link>
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
