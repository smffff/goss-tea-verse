
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ExternalLink } from 'lucide-react';
import { useSoapGate } from '@/hooks/useSoapGate';
import CelebrationEffects from '@/components/effects/CelebrationEffects';
import { useToast } from '@/hooks/use-toast';

interface SoapGateProps {
  children: React.ReactNode;
  requiredSoap?: number;
  fallback?: React.ReactNode;
  showEffect?: boolean;
}

const SoapGate: React.FC<SoapGateProps> = ({
  children,
  requiredSoap = 1,
  fallback,
  showEffect = true
}) => {
  const { hasSoap, soapBalance } = useSoapGate(requiredSoap);
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [hasTriggeredEffect, setHasTriggeredEffect] = React.useState(false);

  React.useEffect(() => {
    if (hasSoap && !hasTriggeredEffect && showEffect) {
      setShowCelebration(true);
      setHasTriggeredEffect(true);
      
      toast({
        title: "🧼 CLEAN! Hidden tea unlocked",
        description: "Your SOAP credibility has revealed the redacted content!",
      });
    }
  }, [hasSoap, hasTriggeredEffect, showEffect, toast]);

  const handleArenaLink = () => {
    // Deep-link to Arena app
    const arenaUrl = 'arena://stage/[redacted]';
    const fallbackUrl = 'https://arena.ctea.app/stage/redacted';
    
    try {
      window.location.href = arenaUrl;
      // Fallback to web version after short delay
      setTimeout(() => {
        window.open(fallbackUrl, '_blank');
      }, 500);
    } catch {
      window.open(fallbackUrl, '_blank');
    }
  };

  if (hasSoap) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {children}
        </motion.div>
        
        {showCelebration && (
          <CelebrationEffects 
            trigger={showCelebration}
            type="sparkles"
            onComplete={() => setShowCelebration(false)}
          />
        )}
      </>
    );
  }

  if (fallback) {
    return <div>{fallback}</div>;
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/90 border-gray-600/30">
      <CardContent className="p-6">
        {/* Soap Bubble Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-300/5 to-white/10 backdrop-blur-sm">
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 bg-gradient-to-br from-white/40 to-cyan-200/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg px-6 py-2">
              🚿 SCRUB TO REVEAL
            </Badge>
          </motion.div>

          <h3 className="text-xl font-bold text-white">
            [REDACTED] Content Locked
          </h3>
          
          <p className="text-gray-300 mb-6">
            Need {requiredSoap} $SOAP to unlock this credibility-gated content.
            <br />
            <span className="text-sm text-gray-400">
              Current balance: {soapBalance} $SOAP
            </span>
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleArenaLink}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold w-full"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Earn SOAP in [redacted] Arena Stage
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            <p className="text-xs text-gray-500">
              Complete challenges with @agentboff to earn $SOAP credibility tokens
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoapGate;
