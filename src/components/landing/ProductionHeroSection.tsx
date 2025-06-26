
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coffee, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const ProductionHeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Floating CTea Logo */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-ctea-teal to-ctea-purple rounded-full flex items-center justify-center shadow-2xl">
          <BrandedTeacupIcon size="hero" variant="steaming" animated />
        </div>
      </motion.div>

      {/* Floating OG Badge */}
      <motion.div
        className="absolute top-32 right-8 md:right-16 z-20"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          delay: 1
        }}
      >
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 text-sm font-bold shadow-lg">
          <Crown className="w-4 h-4 mr-1" />
          OG ACCESS
        </Badge>
      </motion.div>

      {/* Dripping Teacup Graphic */}
      <motion.div
        className="absolute bottom-20 left-8 md:left-16 z-10"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity
        }}
      >
        <div className="text-6xl filter drop-shadow-lg">
          <BrandedTeacupIcon size="xl" variant="spilling" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto z-20">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            CTea Newsroom
          </span>
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl text-ctea-teal font-bold">
            Beta 1.2 is LIVE
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-8 font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We Don't Report the News. We Stir It. 🫖
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            onClick={() => navigate('/spill')}
            className="bg-gradient-to-r from-ctea-teal to-green-400 hover:from-green-400 hover:to-ctea-teal text-black font-bold text-xl px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Coffee className="w-6 h-6 mr-2" />
            Spill Tea
          </Button>
          
          <Button
            onClick={() => navigate('/bribe')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold text-xl px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Zap className="w-6 h-6 mr-2" />
            Bribe Gatekeepers
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-white/70 mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          On-chain gossip meets meme warfare. CTea News is where rumors get receipts.
        </motion.p>
      </div>
    </section>
  );
};

export default ProductionHeroSection;
