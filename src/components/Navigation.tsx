
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Users, Moon, Sun } from 'lucide-react';
import { navigationItems } from '@/data/navigationItems';
import TipButton from '@/components/TipButton';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-newsprint border-b-2 border-vintage-red/20 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 nav-link-hover">
            <img 
              src="/ctea-logo-icon.svg" 
              alt="CTea Newsroom" 
              className="w-8 h-8 transition-transform hover:scale-110"
            />
            <span className="text-xl font-display font-bold text-tabloid-black hidden sm:block">CTea</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors nav-link-hover ${
                    isActive(item.path)
                      ? 'bg-vintage-red text-white'
                      : 'text-tabloid-black hover:text-vintage-red'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="border-l border-vintage-red/20 pl-4 flex items-center gap-2">
              <TipButton variant="minimal" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://arena.social/?ref=LadyInvsible', '_blank')}
                className="text-tabloid-black hover:text-vintage-red transition-colors"
                title="Connect on Arena"
              >
                <Users className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="ml-2 text-tabloid-black hover:text-vintage-red transition-colors"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden text-tabloid-black"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-vintage-red/20 py-4 bg-newsprint">
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
                        ? 'bg-vintage-red text-white'
                        : 'text-tabloid-black hover:text-vintage-red hover:bg-pale-pink'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="border-t border-vintage-red/20 pt-4 mt-2">
                <div className="px-3 flex items-center gap-2">
                  <TipButton variant="connect" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="ml-2 text-tabloid-black hover:text-vintage-red transition-colors"
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>
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
