
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Droplets, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoapGate } from '@/hooks/useSoapGate';

interface SudsyClue {
  id: string;
  headline: string;
  hiddenContent: string;
  requiredSoap: number;
  expiresAt: Date;
}

const SudsyClueCard: React.FC = () => {
  const { canAccess, soapBalance } = useSoapGate();
  const [dailyClue, setDailyClue] = useState<SudsyClue | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Mock daily clue - replace with actual API
    const mockClue: SudsyClue = {
      id: `clue-${new Date().toDateString()}`,
      headline: "BREAKING: Major DeFi Protocol [REDACTED] Planning Secret [REDACTED]",
      hiddenContent: "BREAKING: Major DeFi Protocol Uniswap Planning Secret V4 Launch with Revolutionary [REDACTED] Technology",
      requiredSoap: 5,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    };
    setDailyClue(mockClue);
  }, []);

  useEffect(() => {
    if (!dailyClue) return;

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = dailyClue.expiresAt.getTime();
      const distance = expiry - now;

      if (distance > 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Expired');
      }
    };

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [dailyClue]);

  const handleReveal = () => {
    if (canAccess(dailyClue?.requiredSoap)) {
      setIsRevealed(!isRevealed);
    }
  };

  if (!dailyClue) return null;

  const hasAccess = canAccess(dailyClue.requiredSoap);

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border-purple-400/30 relative overflow-hidden">
      <CardContent className="p-4">
        {/* Daily badge */}
        <div className="absolute top-2 right-2">
          <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            {timeLeft}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-cyan-400" />
            <h4 className="font-bold text-white">Daily Sudsy Clue</h4>
          </div>

          <AnimatePresence mode="wait">
            {isRevealed && hasAccess ? (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <p className="text-green-400 font-medium">
                  {dailyClue.hiddenContent}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <p className="text-gray-300">
                  {dailyClue.headline}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <Badge className={`${hasAccess ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {soapBalance}/{dailyClue.requiredSoap} $SOAP
            </Badge>

            <Button
              onClick={handleReveal}
              disabled={!hasAccess}
              variant="outline"
              size="sm"
              className={`${
                hasAccess
                  ? 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10'
                  : 'border-gray-600/50 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isRevealed ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Reveal
                </>
              )}
            </Button>
          </div>

          {!hasAccess && (
            <p className="text-xs text-gray-500 text-center">
              Need {dailyClue.requiredSoap - soapBalance} more $SOAP to unlock
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SudsyClueCard;
