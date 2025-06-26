
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';
import EnhancedSpillingTeaCup from '@/components/ui/EnhancedSpillingTeaCup';
import LiveStats from '@/components/landing/LiveStats';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';

interface EnhancedHeroSectionProps {
  onEnterClick: () => void;
}

const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({ onEnterClick }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating tea particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0 
            }}
            animate={{
              y: [null, -100, null],
              rotate: [0, 360, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            🫖
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Logo and Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <EnhancedSpillingTeaCup 
            size="hero" 
            isSpilling={true}
            interactive={true}
            className="mx-auto mb-8"
          />
          
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            style={{ 
              fontFamily: 'Luckiest Guy, cursive',
              color: BRAND_CONFIG.colors.primary,
              textShadow: `0 0 30px ${BRAND_CONFIG.colors.primary}40`
            }}
          >
            CTea Newsroom
          </h1>
          
          <motion.p
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: BRAND_CONFIG.colors.accent }}
            animate={{
              textShadow: [
                `0 0 20px ${BRAND_CONFIG.colors.accent}60`,
                `0 0 30px ${BRAND_CONFIG.colors.accent}80`,
                `0 0 20px ${BRAND_CONFIG.colors.accent}60`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {BRAND_CONFIG.tagline}
          </motion.p>
        </motion.div>

        {/* Hero Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 space-y-6"
        >
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Web3's anonymous crypto gossip feed where <span className="text-[#FF4FB3] font-bold">memes meet intel</span>,{' '}
            <span className="text-[#00D8A4] font-bold">AI meets chaos</span>, and{' '}
            <span className="text-[#FF9C39] font-bold">degens meet their destiny</span>.
          </p>
          
          <motion.p
            className="text-lg text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Finally, utility for your meme portfolio. Built for gossip. Powered by degeneracy.
          </motion.p>

          {/* Meme Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-black/30 backdrop-blur-lg border border-[#FF4FB3]/30 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <p className="text-2xl font-bold text-[#FF4FB3] mb-2">
              "We made apps for dumber sh*t. Why not gossip?"
            </p>
            <p className="text-sm text-white/60 font-mono">
              — The Builders, probably high on hopium
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-8"
        >
          {/* Main CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onEnterClick}
              className="bg-gradient-to-r from-[#00D8A4] to-[#FF4FB3] hover:from-[#FF4FB3] hover:to-[#FF9C39] text-white font-bold px-12 py-6 rounded-2xl text-2xl shadow-2xl"
              style={{
                boxShadow: `0 0 40px ${BRAND_CONFIG.colors.primary}40`,
                fontFamily: 'Luckiest Guy, cursive'
              }}
            >
              <Zap className="mr-3 w-8 h-8" />
              Enter the Tea Zone
              <Sparkles className="ml-3 w-8 h-8" />
            </Button>
          </motion.div>

          {/* Beta Notice */}
          <motion.div
            className="bg-[#FF9C39]/20 border border-[#FF9C39]/40 rounded-xl p-4 max-w-md mx-auto"
            animate={{
              borderColor: ['#FF9C39', '#FF4FB3', '#00D8A4', '#FF9C39']
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="text-[#FF9C39] font-bold text-lg">
              🌽 Beta Access Required 🌽
            </p>
            <p className="text-white/80 text-sm mt-1">
              Spill tea, bribe us, or use a code. Your choice.
            </p>
          </motion.div>

          {/* Corn Gang Teaser */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center space-y-2"
          >
            <p className="text-sm text-white/60 font-mono">
              🌽 Iowa State Fair activation coming soon 🌽
            </p>
            <p className="text-xs text-[#FF9C39] font-bold">
              Make CTea Great Again
            </p>
          </motion.div>
        </motion.div>

        {/* Live Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <LiveStats />
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
