
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Zap, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface SneakPeekTimerProps {
  onTimeExpired: () => void;
  onUpgrade: () => void;
}

const SneakPeekTimer: React.FC<SneakPeekTimerProps> = ({
  onTimeExpired,
  onUpgrade
}) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const startTime = localStorage.getItem('ctea-peek-start');
    if (!startTime) {
      localStorage.setItem('ctea-peek-start', Date.now().toString());
      setTimeLeft(300);
      return;
    }

    const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
    const remaining = Math.max(0, 300 - elapsed);
    
    if (remaining <= 0) {
      onTimeExpired();
      return;
    }

    setTimeLeft(remaining);

    const timer = setInterval(() => {
      const newElapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const newRemaining = Math.max(0, 300 - newElapsed);
      
      setTimeLeft(newRemaining);
      
      if (newRemaining <= 0) {
        clearInterval(timer);
        onTimeExpired();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return 'text-red-400 animate-pulse';
    if (timeLeft <= 120) return 'text-orange-400';
    return 'text-ctea-teal';
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <Card className="bg-gradient-to-r from-ctea-dark to-ctea-darker border-ctea-teal/50 shadow-lg backdrop-blur-sm">
        <CardContent className="px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${getTimerColor()}`} />
            <span className={`font-mono text-lg font-bold ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <div className="text-white/80 text-sm">
            Preview Mode
          </div>

          <Button
            onClick={onUpgrade}
            size="sm"
            className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-pink-400 hover:to-ctea-teal text-white font-bold"
          >
            <Crown className="w-4 h-4 mr-1" />
            Upgrade
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SneakPeekTimer;
