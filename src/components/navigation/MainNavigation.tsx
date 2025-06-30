
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, LogOut, Home, TrendingUp, User, Coffee } from 'lucide-react';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const MainNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useUnifiedAuth();

  const navigationItems: NavigationItem[] = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/home', label: 'Dashboard', icon: TrendingUp },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-brand-background/95 backdrop-blur-lg border-b border-brand-primary/20 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src="/lovable-uploads/788113f9-894c-4f0e-bb24-90b5f436f86f.png" 
                alt="CTea News Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-brand-text text-xl font-anton">
                CTea News
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group relative"
                  >
                    <motion.div
                      className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                        isActive(item.path)
                          ? 'bg-brand-primary/20 text-brand-primary'
                          : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-neutral/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* User Section & Mobile Toggle */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-brand-text">
                      {user.username || user.email?.split('@')[0] || 'Anonymous'}
                    </p>
                    <p className="text-xs text-brand-text-secondary">Tea Spiller</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-brand-text-secondary hover:text-brand-text hover:bg-brand-neutral/50"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="hidden md:block">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background"
                  >
                    Join the Tea
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-brand-text hover:bg-brand-neutral/50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-background/95 backdrop-blur-lg border-t border-brand-primary/20"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-brand-primary/20 text-brand-primary'
                          : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-neutral/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
                
                {/* Mobile User Section */}
                <div className="pt-4 border-t border-brand-primary/20">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2">
                        <p className="text-sm font-semibold text-brand-text">
                          {user.username || user.email?.split('@')[0] || 'Anonymous'}
                        </p>
                        <p className="text-xs text-brand-text-secondary">Tea Spiller</p>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full text-left justify-start text-brand-text-secondary hover:text-brand-text hover:bg-brand-neutral/50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigation('/auth')}
                      className="w-full"
                    >
                      <Button className="w-full bg-brand-primary hover:bg-brand-primary/80 text-brand-background font-bold">
                        Join the Tea Party
                      </Button>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-16" />
    </>
  );
};

export default MainNavigation;
