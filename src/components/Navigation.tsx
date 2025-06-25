
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Coffee, TrendingUp, Users, Coins, Settings } from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';
import BetaDisclaimer from '@/components/BetaDisclaimer';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { progression, currentLevel } = useUserProgression();

  const navItems = [
    { path: '/', label: 'Home', icon: Coffee },
    { path: '/feed', label: 'Feed', icon: TrendingUp },
    { path: '/submit', label: 'Submit Tea', icon: Coffee },
    { path: '/trends', label: 'Trends', icon: TrendingUp },
    { path: '/token', label: 'Token', icon: Coins },
    { path: '/governance', label: 'Governance', icon: Users },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-ctea-dark/90 backdrop-blur-lg border-b border-ctea-teal/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-ctea-teal to-ctea-purple rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white">CTEA NEWS</span>
              <BetaDisclaimer variant="compact" className="text-xs" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-ctea-teal/20 text-ctea-teal'
                      : 'text-gray-300 hover:text-white hover:bg-ctea-dark/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30">
                Level {currentLevel.level}
              </Badge>
              <Badge className="bg-ctea-yellow/20 text-ctea-yellow border border-ctea-yellow/30">
                {progression.tea_points} $TEA
              </Badge>
            </div>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-ctea-teal/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActivePath(item.path)
                        ? 'bg-ctea-teal/20 text-ctea-teal'
                        : 'text-gray-300 hover:text-white hover:bg-ctea-dark/50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="flex items-center justify-between pt-4 border-t border-ctea-teal/20">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30">
                    Level {currentLevel.level}
                  </Badge>
                  <Badge className="bg-ctea-yellow/20 text-ctea-yellow border border-ctea-yellow/30">
                    {progression.tea_points} $TEA
                  </Badge>
                </div>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
