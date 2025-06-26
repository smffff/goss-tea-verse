
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const SpillZoneSection: React.FC = () => {
  const navigate = useNavigate();
  const [isSpilling, setIsSpilling] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const spillInterval = setInterval(() => {
      setIsSpilling(true);
      setTimeout(() => setIsSpilling(false), 3000);
    }, 8000);

    return () => clearInterval(spillInterval);
  }, []);

  const handleSpillTea = () => {
    navigate('/spill');
  };

  const handleBribeGatekeepers = () => {
    navigate('/bribe');
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ opacity, scale }}
    >
      <div className="text-center max-w-6xl mx-auto relative z-10">
        {/* Animated Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <BrandedTeacupIcon 
            size="hero" 
            variant={isSpilling ? "spilling" : "steaming"} 
            animated 
            className="mx-auto filter drop-shadow-2xl"
          />
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight" 
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            <motion.span 
              className="bg-gradient-to-r from-[#FF6B9D] via-[#00D4AA] to-[#FF9500] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              CTea Newsroom
            </motion.span>
          </h1>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <div className="text-4xl md:text-5xl text-[#FF6B9D] font-bold mb-4">
              Beta 1.2 is LIVE
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Where Web3 meets TMZ. Spill the hottest crypto tea, earn $TEA tokens, 
              and become the ultimate <span className="text-[#00D4AA] font-bold">memefluencer</span>
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            onClick={handleSpillTea}
            className="bg-gradient-to-r from-[#FF6B9D] to-[#FF9500] hover:from-[#FF9500] hover:to-[#00D4AA] text-white text-xl md:text-2xl px-12 py-6 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl"
          >
            <Coffee className="mr-3 w-8 h-8" />
            Spill Tea
            <ArrowRight className="ml-3 w-8 h-8" />
          </Button>
          
          <Button
            onClick={handleBribeGatekeepers}
            variant="outline"
            className="border-2 border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA] hover:text-black text-xl md:text-2xl px-12 py-6 rounded-full font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl bg-transparent"
          >
            💰 Bribe Gatekeepers
          </Button>
        </motion.div>

        {/* Beta Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <p className="text-sm text-white/60 animate-pulse">
            🔥 Limited Beta Access • Invite Only • No Boring People
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SpillZoneSection;
