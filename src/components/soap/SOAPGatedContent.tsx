
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Sparkles, Lock } from 'lucide-react';

interface SOAPGatedContentProps {
  content: string;
  fullContent: string;
  soapCost: number;
  userSOAPBalance: number;
  onReveal: (cost: number) => void;
}

const SOAPGatedContent: React.FC<SOAPGatedContentProps> = ({
  content,
  fullContent,
  soapCost,
  userSOAPBalance,
  onReveal
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleReveal = async () => {
    if (userSOAPBalance < soapCost) return;
    
    setIsRevealing(true);
    
    // Bubble pop animation delay
    setTimeout(() => {
      setIsRevealed(true);
      onReveal(soapCost);
      setIsRevealing(false);
    }, 1000);
  };

  if (isRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <p className="text-white leading-relaxed">{fullContent}</p>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          ✅ Content Unlocked
        </Badge>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Blurred Content */}
      <div className="relative">
        <p className="text-white blur-sm select-none leading-relaxed">
          {content}
        </p>
        
        {/* SOAP Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/30 to-blue-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-cyan-400/50"
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 211, 238, 0.4)",
              "0 0 40px rgba(34, 211, 238, 0.6)",
              "0 0 20px rgba(34, 211, 238, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-center space-y-4 p-6">
            <div className="flex items-center justify-center gap-2 text-cyan-300 text-lg font-bold">
              <Sparkles className="w-5 h-5" />
              🚿 SCRUB TO REVEAL
              <Sparkles className="w-5 h-5" />
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-cyan-500/30 text-cyan-200 border-cyan-400/50">
                Cost: {soapCost} SOAP
              </Badge>
              <Badge className={`${
                userSOAPBalance >= soapCost 
                  ? 'bg-green-500/30 text-green-200 border-green-400/50' 
                  : 'bg-red-500/30 text-red-200 border-red-400/50'
              }`}>
                Balance: {userSOAPBalance} SOAP
              </Badge>
            </div>

            <Button
              onClick={handleReveal}
              disabled={userSOAPBalance < soapCost || isRevealing}
              className={`${
                userSOAPBalance >= soapCost
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
                  : 'bg-gray-500 cursor-not-allowed'
              } text-white font-bold px-6 py-2 rounded-full transform transition-all duration-300`}
            >
              <AnimatePresence mode="wait">
                {isRevealing ? (
                  <motion.div
                    key="revealing"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Scrubbing...
                  </motion.div>
                ) : userSOAPBalance >= soapCost ? (
                  <motion.div
                    key="reveal"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Scrub Clean
                  </motion.div>
                ) : (
                  <motion.div
                    key="insufficient"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Need More SOAP
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* Bubble Animation */}
            {isRevealing && (
              <motion.div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-cyan-400/60 rounded-full"
                    initial={{
                      x: Math.random() * 300,
                      y: Math.random() * 200,
                      scale: 0,
                      opacity: 1
                    }}
                    animate={{
                      y: -50,
                      scale: [0, 1, 0],
                      opacity: [1, 0.8, 0]
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SOAPGatedContent;
