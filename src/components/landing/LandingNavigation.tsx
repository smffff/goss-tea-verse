
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
    <nav className="bg-ctea-dark/80 backdrop-blur-sm border-b border-ctea-teal/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom Logo" 
              className="w-8 h-8"
            />
            <span className="font-bold text-white">CTea Newsroom</span>
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('leaderboard')}
              className="text-gray-300 hover:text-ctea-teal font-medium transition-colors"
            >
              Leaderboard
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-ctea-teal font-medium transition-colors"
            >
              About
            </button>
            <Link to="/submit" className="text-gray-300 hover:text-ctea-teal font-medium transition-colors">
              Submit
            </Link>
            <Button 
              onClick={() => navigate('/feed')}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold px-4 py-2 text-sm"
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
