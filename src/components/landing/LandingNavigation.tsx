
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const LandingNavigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Leaderboard', action: () => scrollToSection('leaderboard') },
    { label: 'About', action: () => scrollToSection('about') },
    { label: 'Submit', action: () => navigate('/submit') }
  ];

  return (
    <nav className="bg-ctea-dark/80 backdrop-blur-sm border-b border-ctea-teal/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom Logo" 
              className="w-8 h-8"
            />
            <span className="font-bold text-white text-lg">CTea Newsroom</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={item.action}
                className="text-gray-300 hover:text-ctea-teal font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => navigate('/feed')}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold px-4 py-2 text-sm"
            >
              Enter App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-ctea-teal transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-ctea-teal/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button 
                  key={item.label}
                  onClick={item.action}
                  className="text-gray-300 hover:text-ctea-teal font-medium transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => {
                  navigate('/feed');
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold w-full"
              >
                Enter App
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavigation;
