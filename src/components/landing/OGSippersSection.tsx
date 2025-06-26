
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Crown, Coins, Zap } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const OGSippersSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      {/* Floating Rotating Tea Coin */}
      <motion.div
        className="absolute top-20 right-8 md:right-16 z-10"
        animate={{ 
          rotate: [0, 360],
          y: [0, -10, 0]
        }}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
          <Coins className="w-8 h-8 md:w-10 md:h-10 text-black" />
        </div>
      </motion.div>

      {/* OG Badge Display */}
      <motion.div
        className="absolute top-32 left-8 md:left-16 z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          delay: 0.5
        }}
      >
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 text-lg font-bold shadow-2xl">
          <Crown className="w-6 h-6 mr-2" />
          OG ACCESS
        </Badge>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center">
        <ParallaxElement speed={0.3} direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8" style={{ fontFamily: "'Anton', sans-serif" }}>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              OG Sippers Club
            </span>
          </h2>
        </ParallaxElement>

        <ParallaxElement speed={0.2} direction="up" delay={0.4}>
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-yellow-500/30 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-12 h-12 text-yellow-400 mr-4" />
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Holding 69+ $TEA?
              </h3>
            </div>
            
            <p className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
              You're Early AF.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <motion.div
                className="bg-black/30 rounded-xl p-6 border border-yellow-500/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-2">Exclusive Access</h4>
                <p className="text-white/80 text-sm">Premium avatars & features</p>
              </motion.div>
              
              <motion.div
                className="bg-black/30 rounded-xl p-6 border border-orange-500/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-2">Early Rewards</h4>
                <p className="text-white/80 text-sm">Higher $TEA multipliers</p>
              </motion.div>
              
              <motion.div
                className="bg-black/30 rounded-xl p-6 border border-yellow-500/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-2">Governance Power</h4>
                <p className="text-white/80 text-sm">Shape the platform's future</p>
              </motion.div>
            </div>
          </div>
        </ParallaxElement>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-20 right-20 text-3xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity
          }}
        >
          👑
        </motion.div>
      </div>
    </section>
  );
};

export default OGSippersSection;
