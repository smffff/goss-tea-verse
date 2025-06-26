
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Sparkles } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface CTeaBotGreetingProps {
  trigger: 'wallet_connect' | 'og_unlock' | 'demo_mode' | 'admin_mode';
  userStatus?: {
    walletType?: string;
    teaBalance?: number;
    ogTier?: string;
  };
  onDismiss: () => void;
  autoHide?: boolean;
  hideDelay?: number;
}

const CTeaBotGreeting: React.FC<CTeaBotGreetingProps> = ({
  trigger,
  userStatus,
  onDismiss,
  autoHide = true,
  hideDelay = 8000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, hideDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoHide, hideDelay, onDismiss]);

  const getGreetingMessage = () => {
    switch (trigger) {
      case 'wallet_connect':
        if (userStatus?.teaBalance && userStatus.teaBalance >= 1337) {
          return {
            message: `🫖 LEGEND spotted! ${userStatus.teaBalance} $TEA? You're basically crypto royalty. Ready to rule the newsroom?`,
            type: 'legend' as const
          };
        } else if (userStatus?.teaBalance && userStatus.teaBalance >= 420) {
          return {
            message: `☕ Connoisseur detected! ${userStatus.teaBalance} $TEA means you know good tea when you taste it. Let's brew some chaos!`,
            type: 'connoisseur' as const
          };
        } else if (userStatus?.teaBalance && userStatus.teaBalance >= 69) {
          return {
            message: `🍵 Welcome back, Sipper! Your ${userStatus.teaBalance} $TEA is *chef's kiss*. Ready to stir some trouble?`,
            type: 'sipper' as const
          };
        } else {
          return {
            message: `👋 Fresh wallet detected! No $TEA yet? No problem—your gossip game can still be legendary. Let's see what you've got!`,
            type: 'newbie' as const
          };
        }
      
      case 'og_unlock':
        return {
          message: `🎉 OG STATUS UNLOCKED! You're now part of the inner circle. Your tea-spilling privileges have been activated. Use them wisely... or don't 😈`,
          type: 'celebration' as const
        };
      
      case 'demo_mode':
        return {
          message: `🎭 Sipping sample tea? Cute. This is just a taste—connect your wallet for the REAL drama. Trust me, it gets spicier 💅`,
          type: 'demo' as const
        };
      
      case 'admin_mode':
        return {
          message: `⚡ Admin powers activated! Time to break some rules and see behind the curtain. With great power comes... absolutely no responsibility 😈`,
          type: 'admin' as const
        };
      
      default:
        return {
          message: `🫖 Welcome to CTea Newsroom! Where crypto meets chaos and your hottest takes become legendary. Ready to spill?`,
          type: 'default' as const
        };
    }
  };

  const { message, type } = getGreetingMessage();

  const getCardStyles = () => {
    switch (type) {
      case 'legend':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/50';
      case 'connoisseur':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50';
      case 'sipper':
        return 'bg-gradient-to-r from-ctea-teal/20 to-green-500/20 border-ctea-teal/50';
      case 'celebration':
        return 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400/50';
      case 'admin':
        return 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/50';
      default:
        return 'bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20 border-ctea-teal/30';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <Card className={`${getCardStyles()} shadow-2xl backdrop-blur-lg`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  <BrandedTeacupIcon 
                    size="lg" 
                    variant="glowing"
                    animated={true}
                  />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-sm flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-ctea-teal" />
                      CTeaBot
                    </h4>
                    <Button
                      onClick={() => setIsVisible(false)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-white/60 hover:text-white/80"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CTeaBotGreeting;
