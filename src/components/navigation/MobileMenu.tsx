
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Home, TrendingUp } from 'lucide-react';
import { IMAGES, ALT_TEXT } from '@/config/images';

interface User {
  username?: string;
  email?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  user: User | null;
  isActive: (path: string) => boolean;
  onNavigation: (path: string) => void;
  onSignOut: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  user,
  isActive,
  onNavigation,
  onSignOut
}) => {
  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/home', label: 'Dashboard', icon: TrendingUp },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
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
                  onClick={() => onNavigation(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-brand-primary/20 text-brand-primary'
                      : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-neutral/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </button>
              );
            })}
            
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
                    onClick={onSignOut}
                    className="w-full text-left justify-start text-brand-text-secondary hover:text-brand-text hover:bg-brand-neutral/50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => onNavigation('/auth')}
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
  );
};

export default MobileMenu;
