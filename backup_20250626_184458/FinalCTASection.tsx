
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Zap, Crown, Sparkles } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';
import { useNavigate } from 'react-router-dom';

const FinalCTASection: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [3400, 4400], [100, -100]);
  const opacity = useTransform(scrollY, [3300, 3600, 4200, 4500], [0, 1, 1, 0]);

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Floating $TEA Tokens */}
        <motion.div
          className="absolute -top-20 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg border-4 border-yellow-400/80"
          animate={{ 
            rotateY: [0, 360],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
            y: { duration: 3, repeat: Infinity },
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity }
          }}
          style={{ filter: 'drop-shadow(0 0 25px rgba(255, 193, 7, 0.8))' }}
        >
          $TEA
        </motion.div>

        <motion.div
          className="absolute -top-16 right-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-sm border-4 border-green-400/80"
          animate={{ 
            rotateY: [360, 0],
            x: [0, 20, 0],
            rotate: [0, -180, -360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotateY: { duration: 6, repeat: Infinity, ease: 'linear' },
            x: { duration: 4, repeat: Infinity, delay: 1 },
            rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity, delay: 0.5 }
          }}
          style={{ filter: 'drop-shadow(0 0 20px rgba(76, 175, 80, 0.8))' }}
        >
          $SOAP
        </motion.div>

        <motion.div
          className="absolute -bottom-20 left-1/3 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-3 border-purple-400/80"
          animate={{ 
            rotateY: [0, 360],
            y: [0, 15, 0],
            rotate: [0, 360],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            rotateY: { duration: 5, repeat: Infinity, ease: 'linear' },
            y: { duration: 3.5, repeat: Infinity, delay: 2 },
            rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 2, repeat: Infinity }
          }}
          style={{ filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))' }}
        >
          420
        </motion.div>

        {/* Main CTA Content */}
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Animated CTea Logo */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-ctea-teal via-pink-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-8 border-white/30"
                 style={{ filter: 'drop-shadow(0 0 40px rgba(0, 216, 164, 0.6))' }}>
              <BrandedTeacupIcon size="hero" variant="spilling" animated />
            </div>
          </motion.div>

          <motion.h2 
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            style={{ 
              fontFamily: "'Anton', 'Impact', sans-serif",
              textShadow: '0 0 30px rgba(255, 75, 179, 0.5)'
            }}
            whileInView={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join the Chaos
          </motion.h2>

          <motion.p 
            className="text-2xl text-white/90 mb-4 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Beta's Insiders Only
          </motion.p>

          <motion.p 
            className="text-lg text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            Step into the ultimate Web3 gossip HQ where memes meet money, 
            chaos meets community, and your anonymous intel becomes legendary content.
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Primary CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black font-bold px-16 py-6 rounded-2xl text-2xl shadow-2xl relative overflow-hidden group border-4 border-white/30"
              style={{
                fontFamily: "'Anton', 'Impact', sans-serif",
                filter: 'drop-shadow(0 0 30px rgba(0, 216, 164, 0.5))'
              }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <Wallet className="mr-4 w-8 h-8" />
              Connect Wallet
              <Sparkles className="ml-4 w-8 h-8" />
            </Button>
          </motion.div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/spill')}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-xl text-lg border-2 border-white/20"
              style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
            >
              <BrandedTeacupIcon size="sm" className="mr-2" />
              Spill Tea Now
            </Button>
            
            <Button
              onClick={() => navigate('/feed')}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500 text-white font-bold px-8 py-4 rounded-xl text-lg border-2 border-white/20"
              style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
            >
              <Zap className="mr-2 w-5 h-5" />
              Enter Feed
            </Button>
          </div>
        </motion.div>

        {/* Beta Access Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Badge className="bg-yellow-500/20 text-yellow-300 border-2 border-yellow-500/50 px-4 py-2 text-sm">
            <Crown className="w-4 h-4 mr-2" />
            OG Access Available
          </Badge>
          <Badge className="bg-green-500/20 text-green-300 border-2 border-green-500/50 px-4 py-2 text-sm">
            🚀 Beta 1.2 Live
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-300 border-2 border-purple-500/50 px-4 py-2 text-sm">
            💎 Exclusive Community
          </Badge>
        </motion.div>

        {/* Footer Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-white/50 font-mono">
            Built for degens, by degens. Welcome to the chaos. 🫖
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinalCTASection;
