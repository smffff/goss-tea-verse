
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { BrandLogo } from '@/components/brand/BrandElements';
import { mainNavigationItems, secondaryNavigationItems, userNavigationItems } from '@/components/navigation/NavigationItems';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const UnifiedNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const allNavItems = [...mainNavigationItems, ...secondaryNavigationItems];

  return (
    <nav className="bg-tabloid-black-900/95 backdrop-blur-lg border-b border-vintage-red/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label={`${BRAND_CONFIG.name} Home`}>
            <BrandLogo size="md" variant="subtle" />
            <span className="text-xl font-headline font-bold text-white hidden sm:block">
              {BRAND_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {allNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                  isActive(item.path)
                    ? 'bg-vintage-red text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
                title={item.description}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-gray-400 hover:text-white"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* User Actions */}
            <Link to="/auth">
              <Button className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-2">
              {allNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                    isActive(item.path)
                      ? 'bg-vintage-red text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <item.icon className="w-4 h-4 mr-2 inline" />
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="justify-start text-gray-300 hover:text-white hover:bg-white/10 px-3"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>

              {/* Mobile Auth */}
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-vintage-red hover:bg-vintage-red-600 text-white font-bold mt-4">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UnifiedNavigation;
