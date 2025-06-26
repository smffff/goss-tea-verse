
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';
import EnhancedSpillingTeaCup from '@/components/ui/EnhancedSpillingTeaCup';

interface HeroContentProps {
  isSpilling: boolean;
  onEnterClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ isSpilling, onEnterClick }) => {
  return (
    <div className="text-center max-w-6xl mx-auto">
      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8"
      >
        <EnhancedSpillingTeaCup 
          size="hero" 
          isSpilling={isSpilling}
          interactive={true}
          className="mx-auto filter drop-shadow-2xl"
        />
      </motion.div>

      {/* Brand Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "'Luckiest Guy', cursive" }}
        >
          <motion.span 
            className="bg-gradient-to-r from-[#FF4FB3] via-[#00D8A4] to-[#FF9C39] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            CTea
          </motion.span>
          <br />
          <motion.span 
            className="bg-gradient-to-r from-[#00D8A4] via-[#FF9C39] to-[#FF4FB3] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Newsroom
          </motion.span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-8"
      >
        <p 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ 
            color: BRAND_CONFIG.colors.accent,
            fontFamily: "'Press Start 2P', monospace",
            textShadow: `0 0 20px ${BRAND_CONFIG.colors.accent}60`
          }}
        >
          <Sparkles className="inline w-8 h-8 mr-2 animate-spin" />
          {BRAND_CONFIG.tagline}
          <Sparkles className="inline w-8 h-8 ml-2 animate-spin" />
        </p>
        
        <motion.p
          className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6"
          animate={{
            textShadow: [
              `0 0 20px ${BRAND_CONFIG.colors.primary}40`,
              `0 0 30px ${BRAND_CONFIG.colors.accent}60`,
              `0 0 20px ${BRAND_CONFIG.colors.primary}40`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Web3's anonymous crypto gossip feed where{' '}
          <span className="text-[#FF4FB3] font-bold">memes meet intel</span>,{' '}
          <span className="text-[#00D8A4] font-bold">AI meets chaos</span>, and{' '}
          <span className="text-[#FF9C39] font-bold">degens meet their destiny</span>.
        </motion.p>

        {/* Retro Quote Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-black/40 backdrop-blur-lg border-2 border-[#FF4FB3]/50 rounded-xl p-6 max-w-3xl mx-auto mb-8"
          style={{ 
            boxShadow: `0 0 30px ${BRAND_CONFIG.colors.accent}30`,
            fontFamily: "'Press Start 2P', monospace"
          }}
        >
          <p className="text-lg text-[#FF4FB3] mb-2">
            "We made apps for dumber sh*t. Why not gossip?"
          </p>
          <p className="text-xs text-white/60">
            — The Builders, probably high on hopium
          </p>
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="space-y-6"
      >
        {/* Main CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onEnterClick}
            className="relative overflow-hidden bg-gradient-to-r from-[#00D8A4] to-[#FF4FB3] hover:from-[#FF4FB3] hover:to-[#FF9C39] text-white font-bold px-16 py-6 rounded-2xl text-2xl shadow-2xl group"
            style={{
              boxShadow: `0 0 40px ${BRAND_CONFIG.colors.primary}40`,
              fontFamily: "'Luckiest Guy', cursive"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <Zap className="mr-3 w-8 h-8 animate-bounce" />
            Enter the Tea Zone
            <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Button>
        </motion.div>

        {/* Beta Access Notice */}
        <motion.div
          className="bg-[#FF9C39]/20 border-2 border-[#FF9C39]/40 rounded-xl p-4 max-w-md mx-auto"
          animate={{
            borderColor: ['#FF9C39', '#FF4FB3', '#00D8A4', '#FF9C39']
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          <p className="text-[#FF9C39] font-bold text-sm mb-1">
            🌽 Beta Access Required 🌽
          </p>
          <p className="text-white/80 text-xs">
            Spill tea, bribe us, or use a code. Your choice.
          </p>
        </motion.div>

        {/* Corn Gang Easter Egg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center space-y-2"
        >
          <p className="text-xs text-white/60" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            🌽 Iowa State Fair activation coming soon 🌽
          </p>
          <p className="text-xs text-[#FF9C39] font-bold">
            Make CTea Great Again
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
