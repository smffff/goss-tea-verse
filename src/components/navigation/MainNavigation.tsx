
import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useUnifiedAuth } from '@/hooks/useUnifiedAuth';
import NavigationLogo from './NavigationLogo';
import NavigationItems from './NavigationItems';
import UserSection from './UserSection';
import MobileMenu from './MobileMenu';

const MainNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useUnifiedAuth();

  const isActive = useCallback((path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [signOut, navigate]);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  }, [navigate]);

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
            <NavigationLogo />
            <NavigationItems isActive={isActive} />
            
            <div className="flex items-center space-x-4">
              <UserSection user={user} onSignOut={handleSignOut} />
              
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

        <MobileMenu
          isOpen={isMobileMenuOpen}
          user={user}
          isActive={isActive}
          onNavigation={handleNavigation}
          onSignOut={handleSignOut}
        />
      </motion.nav>

      <div className="h-16" />
    </>
  );
};

export default MainNavigation;
