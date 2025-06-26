
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wallet, Coins, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const FinalCTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Drip Effect */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-ctea-teal to-transparent"
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-1 h-24 bg-gradient-to-b from-pink-400 to-transparent"
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-1 h-40 bg-gradient-to-b from-purple-400 to-transparent"
          animate={{ height: ["0%", "100%", "0%"] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Spinning Tea Coin */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
          <Coins className="w-10 h-10 md:w-12 md:h-12 text-black" />
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-20 left-8 text-4xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity
        }}
      >
        <BrandedTeacupIcon size="lg" variant="spilling" />
      </motion.div>

      <motion.div
        className="absolute top-32 right-8 text-3xl"
        animate={{ 
          y: [0, 15, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          delay: 1
        }}
      >
        👑
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center z-20">
        <motion.h2
          className="text-5xl md:text-7xl font-black text-white mb-8"
          style={{ fontFamily: "'Anton', sans-serif" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-ctea-teal via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Join the Chaos
          </span>
        </motion.h2>

        <motion.p
          className="text-2xl md:text-3xl text-white/90 mb-4 font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Beta's Insiders Only
        </motion.p>

        <motion.p
          className="text-lg text-white/70 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Connect your wallet and become part of Web3's most exclusive gossip network.
          Where rumors get receipts and memes make money.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={() => navigate('/connect')}
            className="bg-gradient-to-r from-ctea-teal to-cyan-400 hover:from-cyan-400 hover:to-ctea-teal text-black font-bold text-xl px-10 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Wallet className="w-6 h-6 mr-3" />
            Connect Wallet
          </Button>
          
          <div className="flex items-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-bold">OG Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold">Viral Rewards</span>
            </div>
          </div>
        </motion.div>

        {/* Beta Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-ctea-teal mb-2">420</div>
            <div className="text-sm text-white/70">Beta OGs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">1.3K</div>
            <div className="text-sm text-white/70">Tea Spills</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">69</div>
            <div className="text-sm text-white/70">Hot Topics</div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-white/50">
          © CTeaDAO 2025 • Where chaos meets community
        </p>
      </motion.footer>
    </section>
  );
};

export default FinalCTASection;
