import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Menu, X, TrendingUp, Plus, Trophy, Sparkles, Home, Activity, Moon, Sun } from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';
import UserStats from './UserStats';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userProgression } = useUserProgression();

  // Hide navigation on landing page
  if (location.pathname === '/') {
    return null;
  }

  const navigationItems = [
    { path: '/app', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/feed', label: 'Feed', icon: <TrendingUp className="w-4 h-4" /> },
    { path: '/trends', label: 'Trends', icon: <Activity className="w-4 h-4" /> },
    { path: '/submit', label: 'Submit', icon: <Plus className="w-4 h-4" /> },
    { path: '/campaigns', label: 'Campaigns', icon: <Trophy className="w-4 h-4" /> },
    { path: '/features', label: 'Features', icon: <Sparkles className="w-4 h-4" /> }
  ];

  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ctea-dark-mode') === 'true';
    }
    return true;
  });

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
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

  // Handle dark mode
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ctea-dark-mode', darkMode.toString());
  }, [darkMode]);

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-ctea-darker/95 backdrop-blur-md border-b border-accent/30 dark:border-ctea-teal/30' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Brand */}
            <div 
              className="flex items-center gap-2 sm:gap-4 cursor-pointer" 
              onClick={handleLogoClick}
            >
              <img 
                src="/ctea-logo-icon.svg" 
                alt="CTEA Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8" 
              />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white animate-glow font-montserrat">
                  CTea Newsroom
                </h1>
                <p className="text-xs text-accent dark:text-ctea-teal font-montserrat">
                  Beta • Managed Chaos, Served Hot
                </p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-bold text-gray-900 dark:text-white animate-glow font-montserrat">
                  CTea
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 uppercase font-semibold ${
                    isActive(item.path)
                      ? 'bg-accent/20 text-accent dark:bg-ctea-teal/20 dark:text-ctea-teal border border-accent/30 dark:border-ctea-teal/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-white hover:bg-accent/10 dark:hover:bg-ctea-dark/50'
                  }`}
                >
                  {item.icon}
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop User Stats */}
            <div className="hidden lg:flex items-center gap-4">
              {userProgression && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent2 text-white font-bold">
                    {userProgression.tea_points} $TEA
                  </Badge>
                  <UserStats />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-accent data-[state=checked]:to-accent2 border-accent"
                />
                <span className="text-xs text-gray-400 hidden sm:inline flex items-center gap-1">
                  {darkMode ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                  {darkMode ? 'Dark' : 'Light'}
                </span>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-900 dark:text-white hover:bg-accent/10 dark:hover:bg-ctea-dark/50 p-2"
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
          <div className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-ctea-darker/95 backdrop-blur-md border-b border-accent/30 dark:border-ctea-teal/30 animate-slide-down">
            <div className="container mx-auto px-4 md:px-8 py-4">
              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 uppercase font-semibold ${
                      isActive(item.path)
                        ? 'bg-accent/20 text-accent dark:bg-ctea-teal/20 dark:text-ctea-teal border border-accent/30 dark:border-ctea-teal/30'
                        : 'text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-white hover:bg-accent/10 dark:hover:bg-ctea-dark/50'
                    }`}
                  >
                    {item.icon}
                    <span className="text-base">{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              {/* Mobile User Stats */}
              {userProgression && (
                <div className="mt-6 pt-4 border-t border-accent/30 dark:border-ctea-teal/30">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">$TEA Points:</span>
                    <Badge className="bg-accent2 text-white font-bold">
                      {userProgression.tea_points}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <UserStats />
                  </div>
                </div>
              )}

              {/* Mobile Quick Actions */}
              <div className="mt-6 pt-4 border-t border-accent/30 dark:border-ctea-teal/30">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className="bg-gradient-to-r from-accent to-accent2 text-white font-bold uppercase px-6 py-3 rounded-lg transition-all shadow hover:scale-105"
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
                    className="border-accent text-accent hover:bg-accent/10 uppercase font-semibold px-6 py-3 rounded-lg transition-all shadow hover:scale-105"
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
