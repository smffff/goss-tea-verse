
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Coffee, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SneakPeekTimerProps {
  onTimeExpired: () => void;
  onUpgrade: () => void;
}

const SneakPeekTimer: React.FC<SneakPeekTimerProps> = ({ onTimeExpired, onUpgrade }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  useEffect(() => {
    const startTime = localStorage.getItem('ctea-peek-start');
    if (startTime) {
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const remaining = Math.max(0, 300 - elapsed);
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        onTimeExpired();
        return;
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        // Show upgrade prompt at 2 minutes and 30 seconds
        if (newTime === 150 || newTime === 30) {
          setShowUpgradePrompt(true);
        }
        
        if (newTime <= 0) {
          onTimeExpired();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 30) return 'text-red-400';
    if (timeLeft <= 120) return 'text-orange-400';
    return 'text-ctea-teal';
  };

  return (
    <>
      {/* Fixed Timer Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50"
      >
        <Card className="bg-ctea-dark/95 border-ctea-teal/30 backdrop-blur-sm">
          <CardContent className="p-3 flex items-center gap-2">
            <Timer className={`w-4 h-4 ${getTimerColor()}`} />
            <span className={`font-mono font-bold ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </span>
            <Button
              onClick={onUpgrade}
              size="sm"
              className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white text-xs px-2 py-1"
            >
              <ArrowUp className="w-3 h-3 mr-1" />
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upgrade Prompts */}
      <AnimatePresence>
        {showUpgradePrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUpgradePrompt(false)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-ctea-dark border-ctea-teal/30 max-w-md">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center mx-auto">
                    <Coffee className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Loving the tea? ☕
                  </h3>
                  <p className="text-gray-300">
                    Your preview expires in {formatTime(timeLeft)}. Upgrade now for unlimited access to all the hottest crypto gossip!
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowUpgradePrompt(false)}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-400"
                    >
                      Continue Preview
                    </Button>
                    <Button
                      onClick={onUpgrade}
                      className="flex-1 bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white"
                    >
                      <ArrowUp className="w-4 h-4 mr-1" />
                      Upgrade Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SneakPeekTimer;
