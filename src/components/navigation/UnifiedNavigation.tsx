
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, LogOut, Shield, Coffee, Home, TrendingUp, Trophy, Info, HelpCircle, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { BrandLogo } from '@/components/brand/BrandElements';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  adminOnly?: boolean;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

const UnifiedNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { hasAdminAccess, hasSuperAdminAccess } = useAdminAccess();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems: NavigationItem[] = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/feed', label: 'Tea Feed', icon: TrendingUp },
    { path: '/spill', label: 'Spill Tea', icon: Coffee, badge: 'Hot' },
    { path: '/leaderboard', label: 'Spillerboard', icon: Trophy },
    { path: '/about', label: 'About', icon: Info },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
    { path: '/profile', label: 'Profile', icon: User, mobileOnly: true },
    { path: '/admin', label: 'Admin', icon: Shield, adminOnly: true, badge: hasSuperAdminAccess ? 'Super' : 'Admin' }
  ];

  const visibleItems = navigationItems.filter(item => {
    if (item.adminOnly && !hasAdminAccess) return false;
    return true;
  });

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-tabloid-black-900/95 backdrop-blur-lg border-b border-vintage-red/20 shadow-lg' 
            : 'bg-tabloid-black-900/80 backdrop-blur-sm border-b border-vintage-red/10'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <BrandLogo size="md" className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-white text-xl font-headline">
                {BRAND_CONFIG.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {visibleItems
                .filter(item => !item.mobileOnly)
                .map((item) => {
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
                            ? 'bg-vintage-red/20 text-vintage-red'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge className="bg-vintage-red/20 text-vintage-red border-vintage-red/30 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
            </div>

            {/* User Menu & Mobile Toggle */}
            <div className="flex items-center space-x-4">
              {/* User Section */}
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {user.email?.split('@')[0] || 'Anonymous'}
                    </p>
                    <p className="text-xs text-white/60">
                      {hasSuperAdminAccess ? 'Super Admin' : hasAdminAccess ? 'Admin' : 'Tea Spiller'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="hidden md:block">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-vintage-red text-vintage-red hover:bg-vintage-red hover:text-white"
                  >
                    Join the Tea
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-white/10"
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
              className="md:hidden bg-tabloid-black-900/95 backdrop-blur-lg border-t border-vintage-red/20"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-vintage-red/20 text-vintage-red'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge className="bg-vintage-red/20 text-vintage-red border-vintage-red/30 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
                
                {/* Mobile User Section */}
                <div className="pt-4 border-t border-white/10">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2">
                        <p className="text-sm font-semibold text-white">
                          {user.email?.split('@')[0] || 'Anonymous'}
                        </p>
                        <p className="text-xs text-white/60">
                          {hasSuperAdminAccess ? 'Super Admin' : hasAdminAccess ? 'Admin' : 'Tea Spiller'}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full text-left justify-start text-white/70 hover:text-white hover:bg-white/10"
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
                      <Button className="w-full bg-gradient-to-r from-vintage-red to-vintage-red/80 text-white font-bold">
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

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-16" />
    </>
  );
};

export default UnifiedNavigation;
