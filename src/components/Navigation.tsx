
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coffee, Menu, X, Plus, Sparkles, TrendingUp, Heart } from 'lucide-react';
import TipButton from './TipButton';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigationItems = [
    { path: '/feed', label: 'Feed', icon: Coffee },
    { path: '/enhanced-feed', label: 'Enhanced', icon: Sparkles },
    { path: '/trends', label: 'Trends', icon: TrendingUp },
    { path: '/submit', label: 'Submit', icon: Plus },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-ctea-darker border-b border-ctea-teal/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">CTea</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-ctea-teal text-white'
                      : 'text-gray-300 hover:text-white hover:bg-ctea-teal/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="border-l border-ctea-teal/20 pl-4">
              <TipButton variant="minimal" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-ctea-teal/20 py-4">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-ctea-teal text-white'
                        : 'text-gray-300 hover:text-white hover:bg-ctea-teal/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="border-t border-ctea-teal/20 pt-4 mt-2">
                <div className="px-3">
                  <TipButton variant="inline" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
