import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Menu, X, Coffee, TrendingUp, Plus, Trophy, Sparkles, Home } from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';
import UserStats from './UserStats';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userProgression } = useUserProgression();

  const navigationItems = [
    { path: '/', label: 'Home', icon: <Home className="icon-responsive" /> },
    { path: '/feed', label: 'Feed', icon: <TrendingUp className="icon-responsive" /> },
    { path: '/submit', label: 'Submit', icon: <Plus className="icon-responsive" /> },
    { path: '/campaigns', label: 'Campaigns', icon: <Trophy className="icon-responsive" /> },
    { path: '/features', label: 'Features', icon: <Sparkles className="icon-responsive" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ctea-dark-mode') === 'true';
    }
    return true;
  });

  // Handle scroll effect for mobile header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ctea-dark-mode', darkMode);
  }, [darkMode]);

  return (
    <>
      {/* Mobile Header - Always visible */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-ctea-darker/95 backdrop-blur-md border-b border-ctea-teal/30' 
          : 'bg-transparent'
      }`}>
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Brand - Mobile optimized */}
            <div 
              className="flex items-center gap-2 sm:gap-4 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <img 
                src="/ctea-logo-icon.svg" 
                alt="CTEA Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8" 
              />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-white animate-glow font-montserrat">
                  CTea Newsroom
                </h1>
                <p className="text-xs text-ctea-teal font-montserrat">
                  Beta • Managed Chaos, Served Hot
                </p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-bold text-white animate-glow font-montserrat">
                  CTea
                </h1>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30'
                      : 'text-gray-300 hover:text-white hover:bg-ctea-dark/50'
                  }`}
                >
                  {item.icon}
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop User Stats - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-4">
              {userProgression && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-ctea-yellow text-ctea-dark font-bold badge-responsive">
                    {userProgression.tea_points} $TEA
                  </Badge>
                  <UserStats />
                </div>
              )}
            </div>

            {/* Controls - Mobile optimized */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Dark Mode Toggle - Mobile optimized */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-ctea-teal data-[state=checked]:to-ctea-pink border-ctea-teal"
                />
                <span className="text-xs text-gray-400 hidden sm:inline">Dark</span>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:bg-ctea-dark/50 p-2"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-ctea-darker/95 backdrop-blur-md border-b border-ctea-teal/30 animate-slide-down">
            <div className="container-responsive py-4">
              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-ctea-teal/20 text-ctea-teal border border-ctea-teal/30'
                        : 'text-gray-300 hover:text-white hover:bg-ctea-dark/50'
                    }`}
                  >
                    {item.icon}
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              {/* Mobile User Stats */}
              {userProgression && (
                <div className="mt-6 pt-4 border-t border-ctea-teal/30">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">$TEA Points:</span>
                    <Badge className="bg-ctea-yellow text-ctea-dark font-bold badge-responsive">
                      {userProgression.tea_points}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <UserStats />
                  </div>
                </div>
              )}

              {/* Mobile Quick Actions */}
              <div className="mt-6 pt-4 border-t border-ctea-teal/30">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className="bg-gradient-ctea text-white font-bold btn-responsive"
                    onClick={() => {
                      navigate('/submit');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Spill Tea
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 btn-responsive"
                    onClick={() => {
                      navigate('/feed');
                      setIsMenuOpen(false);
                    }}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navigation;
