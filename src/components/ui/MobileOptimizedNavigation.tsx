
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Coffee, 
  TrendingUp, 
  User, 
  Menu,
  X,
  Crown,
  Ghost,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const MobileOptimizedNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', path: '/', badge: null },
    { icon: Coffee, label: 'Spill Tea', path: '/spill', badge: 'Hot' },
    { icon: TrendingUp, label: 'Trending', path: '/trending', badge: null },
    { icon: User, label: 'Profile', path: '/profile', badge: user?.token_balance && user.token_balance >= 69 ? 'OG' : null },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-lg border-b border-ctea-teal/30' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <motion.div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ctea-teal to-ctea-purple flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">CTea</span>
          </motion.div>

          {/* User Status */}
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs text-ctea-teal font-bold">
                    {user.token_balance?.toLocaleString() || '0'} $TEA
                  </div>
                  {user.token_balance && user.token_balance >= 69 && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs">
                      OG Sipper
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Menu Toggle */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-ctea-teal/20"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full space-y-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 text-2xl font-bold transition-colors ${
                    isActive(item.path) 
                      ? 'text-ctea-teal' 
                      : 'text-white hover:text-ctea-teal'
                  }`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-8 h-8" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </motion.button>
              ))}

              {/* Quick Actions */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={() => {
                    // Toggle ghost mode
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Ghost className="w-4 h-4 mr-2" />
                  Ghost Mode
                </Button>
                <Button
                  onClick={() => {
                    navigate('/spill');
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-teal/80 hover:to-ctea-purple/80"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Spill
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-t border-ctea-teal/30 md:hidden">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'text-ctea-teal bg-ctea-teal/20'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 scale-75 bg-gradient-to-r from-ctea-teal to-ctea-purple text-xs px-1">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16 md:hidden" />
      <div className="h-20 md:hidden" />
    </>
  );
};

export default MobileOptimizedNavigation;
