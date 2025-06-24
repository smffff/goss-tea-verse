import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Coffee, TrendingUp, Plus, Trophy, Sparkles } from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';
import UserStats from './UserStats';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { userProgression } = useUserProgression();

  const navigationItems = [
    { path: '/', label: 'Home', icon: <Coffee className="w-4 h-4" /> },
    { path: '/feed', label: 'Feed', icon: <TrendingUp className="w-4 h-4" /> },
    { path: '/submit', label: 'Submit', icon: <Plus className="w-4 h-4" /> },
    { path: '/campaigns', label: 'Campaigns', icon: <Trophy className="w-4 h-4" /> },
    { path: '/features', label: 'Features', icon: <Sparkles className="w-4 h-4" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ctea-dark-mode') === 'true';
    }
    return true;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ctea-dark-mode', darkMode);
  }, [darkMode]);

  return (
    <header className="border-b border-ctea-teal/30 bg-ctea-darker/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/ctea-logo-icon.svg" alt="CTEA Logo" className="h-8 w-8" style={{ height: 32, width: 32 }} />
            <div>
              <h1 className="text-xl font-bold text-white animate-glow font-montserrat">CTea Newsroom</h1>
              <p className="text-xs text-ctea-teal font-montserrat">Beta • Managed Chaos, Served Hot</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30'
                    : 'text-gray-300 hover:text-white hover:bg-ctea-dark/50'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Stats */}
          <div className="hidden md:flex items-center gap-4">
            {userProgression && (
              <div className="flex items-center gap-2">
                <Badge className="bg-ctea-yellow text-ctea-dark font-bold">
                  {userProgression.tea_points} $TEA
                </Badge>
                <UserStats />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:bg-ctea-dark/50"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-ctea-teal data-[state=checked]:to-ctea-pink border-ctea-teal"
              />
              <span className="text-xs text-gray-400">Dark</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-ctea-teal/30">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30'
                      : 'text-gray-300 hover:text-white hover:bg-ctea-dark/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              
              {userProgression && (
                <div className="px-4 py-3 border-t border-ctea-teal/30">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">$TEA Points:</span>
                    <Badge className="bg-ctea-yellow text-ctea-dark font-bold">
                      {userProgression.tea_points}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
