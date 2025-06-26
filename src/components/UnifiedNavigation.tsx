
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { BrandLogo } from '@/components/brand/BrandElements';
import { mainNavigationItems, secondaryNavigationItems } from '@/components/navigation/NavigationItems';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

const UnifiedNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav 
      className="bg-tabloid-black-900/95 backdrop-blur-lg border-b border-vintage-red/20 sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-vintage-red rounded-lg p-1" 
            aria-label={`${BRAND_CONFIG.name} Home`}
          >
            <BrandLogo size="md" variant="subtle" />
            <span className="text-xl font-headline font-bold text-white hidden sm:block">
              {BRAND_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Primary Navigation */}
            {mainNavigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-vintage-red ${
                  isActive(item.path)
                    ? 'bg-vintage-red text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
                title={item.description}
              >
                <item.icon className="w-4 h-4 mr-2 inline" aria-hidden="true" />
                {item.label}
              </Link>
            ))}

            {/* Secondary Navigation Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-vintage-red"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-label="More pages"
              >
                More
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-tabloid-black-800 rounded-lg shadow-xl border border-vintage-red/20 py-2 z-50">
                  {secondaryNavigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm transition-colors hover:bg-vintage-red/10 hover:text-white focus:outline-none focus:bg-vintage-red/10 ${
                        isActive(item.path) ? 'text-vintage-red bg-vintage-red/5' : 'text-gray-300'
                      }`}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                    >
                      <item.icon className="w-4 h-4 mr-3" aria-hidden="true" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-vintage-red ml-2"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </Button>

            {/* CTA Button */}
            <Link to="/spill" className="ml-4">
              <Button className="bg-vintage-red hover:bg-vintage-red-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-vintage-red">
                Spill Tea
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="lg:hidden text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-vintage-red"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 border-t border-white/10 py-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col gap-2">
            {/* Primary Navigation */}
            {mainNavigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-vintage-red ${
                  isActive(item.path)
                    ? 'bg-vintage-red text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <item.icon className="w-5 h-5 mr-3" aria-hidden="true" />
                <div>
                  <div>{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                  )}
                </div>
              </Link>
            ))}

            {/* Secondary Navigation */}
            <div className="border-t border-white/10 pt-4 mt-2">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-3">More</div>
              {secondaryNavigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-vintage-red ${
                    isActive(item.path)
                      ? 'bg-vintage-red text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <item.icon className="w-4 h-4 mr-3" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </div>
              
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="justify-start text-gray-300 hover:text-white hover:bg-white/10 px-3 focus:outline-none focus:ring-2 focus:ring-vintage-red mt-4"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 mr-3" aria-hidden="true" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 mr-3" aria-hidden="true" />
                  Dark Mode
                </>
              )}
            </Button>

            {/* Mobile CTA */}
            <Link to="/spill" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-vintage-red hover:bg-vintage-red-600 text-white font-bold mt-4 focus:outline-none focus:ring-2 focus:ring-vintage-red">
                Spill Tea
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UnifiedNavigation;
