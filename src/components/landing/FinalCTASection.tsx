
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coins, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParallaxElement from '@/components/ui/ParallaxElement';

const FinalCTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      {/* Spinning Tea Coin */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
          <Coins className="w-10 h-10 md:w-12 md:h-12 text-black" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center">
        <ParallaxElement speed={0.3} direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8" style={{ fontFamily: "'Anton', sans-serif" }}>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Join the Chaos
            </span>
          </h2>
        </ParallaxElement>

        <ParallaxElement speed={0.2} direction="up" delay={0.4}>
          <p className="text-2xl md:text-3xl font-bold text-white mb-8">
            Beta's Insiders Only
          </p>
        </ParallaxElement>

        <ParallaxElement speed={0.1} direction="up" delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={() => navigate('/feed')}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              <Zap className="w-6 h-6 mr-2" />
              Connect Wallet
            </Button>
            
            <Button
              onClick={() => navigate('/feed')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              Enter Beta
            </Button>
          </div>
        </ParallaxElement>

        <ParallaxElement speed={0.2} direction="up" delay={0.8}>
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Spill?</h3>
            <p className="text-white/80 mb-6">
              Anonymous leaks, meme warfare, and AI-powered chaos await. 
              <br />
              Where rumors get receipts and tea gets served hot.
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-white/60">
              <span>🫖 Gasless Access</span>
              <span>•</span>
              <span>🤖 AI-Powered</span>
              <span>•</span>
              <span>🎭 Anonymous</span>
            </div>
          </div>
        </ParallaxElement>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-20 right-20 text-4xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          delay: 1
        }}
      >
        🚀
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-20 text-3xl"
        animate={{ 
          x: [0, 20, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          delay: 2
        }}
      >
        💎
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
