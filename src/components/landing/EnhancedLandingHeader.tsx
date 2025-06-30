
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Moon, Sun, Menu, X } from 'lucide-react';

interface EnhancedLandingHeaderProps {
  user?: any;
  isAdmin?: boolean;
  isModerator?: boolean;
}

const EnhancedLandingHeader: React.FC<EnhancedLandingHeaderProps> = ({ 
  user = null, 
  isAdmin = false, 
  isModerator = false 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 bg-brand-background/90 backdrop-blur-xl border-b border-brand-primary/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Enhanced Logo and Brand */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img 
              src="/lovable-uploads/ctea-logo-main.png" 
              alt="CTea News" 
              className="h-10 w-auto filter drop-shadow-lg"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="hidden sm:block">
              <motion.div 
                className="text-brand-text font-anton text-xl"
                animate={{
                  textShadow: ['0 0 10px #FF2052', '0 0 20px #FF2052', '0 0 10px #FF2052']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                CTea News
              </motion.div>
              <div className="text-brand-accent-yellow text-xs font-bold tracking-wider">
                BETA BREW
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link 
                to="/features" 
                className="text-brand-text-secondary hover:text-brand-primary transition-colors duration-200 font-medium"
              >
                Features
              </Link>
              <Link 
                to="/about" 
                className="text-brand-text-secondary hover:text-brand-accent-yellow transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link 
                to="/beta" 
                className="text-brand-text-secondary hover:text-brand-accent-lavender transition-colors duration-200 font-medium"
              >
                Beta Access
              </Link>
            </nav>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-brand-neutral/50 text-brand-text hover:bg-brand-primary/20 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-brand-text text-sm hidden lg:block font-medium">
                  Welcome back, Tea Spiller!
                </span>
                {(isAdmin || isModerator) && (
                  <Link to="/admin">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-brand-accent-lavender text-brand-accent-lavender hover:bg-brand-accent-lavender hover:text-brand-background transition-all duration-200"
                    >
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link to="/feed">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="sm" 
                      className="btn-brand-primary font-bold"
                    >
                      Enter Newsroom
                    </Button>
                  </motion.div>
                </Link>
              </div>
            ) : (
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background transition-all duration-200 font-medium"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-brand-neutral/50 text-brand-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 p-4 bg-brand-neutral/20 backdrop-blur-lg rounded-lg border border-brand-primary/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/features" 
                className="text-brand-text-secondary hover:text-brand-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/about" 
                className="text-brand-text-secondary hover:text-brand-accent-yellow transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/beta" 
                className="text-brand-text-secondary hover:text-brand-accent-lavender transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Beta Access
              </Link>
              <div className="pt-4 border-t border-brand-primary/20">
                {user ? (
                  <Link to="/feed" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full btn-brand-primary">
                      Enter Newsroom
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EnhancedLandingHeader;
