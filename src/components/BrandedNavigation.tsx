
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TeaCup from '@/components/TeaCup';

interface BrandedNavigationProps {
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const BrandedNavigation: React.FC<BrandedNavigationProps> = ({ 
  darkMode = true, 
  onToggleDarkMode 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Feed', path: '/feed' },
    { label: 'Spill', path: '/spill' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'About', path: '/about' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#1b1b1b]/95 to-[#2a1a2a]/95 backdrop-blur-lg border-b border-[#00d1c1]/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              <TeaCup className="w-8 h-8 text-[#00d1c1]" />
            </div>
            <span 
              className="font-bold text-white text-xl bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] bg-clip-text text-transparent hover:from-[#ff61a6] hover:to-[#00d1c1] transition-all duration-300"
              style={{ fontFamily: "'Luckiest Guy', cursive" }}
            >
              CTea Newsroom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="text-white/80 hover:text-[#00d1c1] font-medium transition-all duration-300 relative group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleDarkMode}
                className="text-white/80 hover:text-[#00d1c1] p-2"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:text-[#00d1c1] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-[#00d1c1]/20"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/80 hover:text-[#00d1c1] font-medium transition-colors text-left py-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {onToggleDarkMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleDarkMode}
                    className="text-white/80 hover:text-[#00d1c1] justify-start p-2"
                  >
                    {darkMode ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default BrandedNavigation;
