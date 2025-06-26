
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Zap, Coffee, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const JoinChaosSection: React.FC = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [3400, 4400], [100, -100]);
  const opacity = useTransform(scrollY, [3300, 3600, 4200, 4500], [0, 1, 1, 0]);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      // Navigate to main app or show success
    }, 2000);
  };

  const handleSpillTea = () => {
    navigate('/spill');
  };

  const handleBribeGatekeepers = () => {
    navigate('/bribe');
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
      style={{ y, opacity }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 flex items-center justify-center gap-4"
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            <Zap className="w-20 h-20 text-yellow-400" />
            Join the Chaos
          </h2>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto">
            Ready to become a legend? Connect your wallet and start spilling the hottest tea in crypto.
          </p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-2 border-[#FF6B9D]/50 p-8 relative overflow-hidden">
            <CardContent className="relative z-10">
              {/* Floating celebration particles */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>

              <div className="mb-8">
                <BrandedTeacupIcon size="hero" variant="glowing" animated className="mx-auto mb-6" />
                <h3 className="text-4xl font-bold text-white mb-4">
                  Your Chaos Journey Starts Here
                </h3>
                <p className="text-xl text-white/80">
                  Connect your wallet to unlock the full CTea experience and start earning $TEA tokens
                </p>
              </div>

              {/* Wallet Connect Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-8"
              >
                <Button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-[#FF6B9D] to-[#00D4AA] hover:from-[#00D4AA] hover:to-[#FF9500] text-white text-2xl px-16 py-6 rounded-full font-bold shadow-2xl relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <Wallet className="mr-4 w-8 h-8" />
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  <Sparkles className="ml-4 w-8 h-8 group-hover:animate-spin" />
                </Button>
              </motion.div>

              {/* Alternative Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleSpillTea}
                  variant="outline"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black text-lg px-8 py-4 rounded-full font-bold bg-transparent"
                >
                  <Coffee className="mr-3 w-6 h-6" />
                  Spill Tea First
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                
                <Button
                  onClick={handleBribeGatekeepers}
                  variant="outline"
                  className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black text-lg px-8 py-4 rounded-full font-bold bg-transparent"
                >
                  💰 Bribe Gatekeepers
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Preview */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Earn $TEA Tokens</h4>
            <p className="text-white/60 text-sm">Get rewarded for quality spills and engagement</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">AI-Powered Features</h4>
            <p className="text-white/60 text-sm">Let our bots amplify your chaos and create memes</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Exclusive Access</h4>
            <p className="text-white/60 text-sm">Join the inner circle of crypto's elite gossips</p>
          </div>
        </motion.div>

        {/* Final Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="bg-cyan-400/20 text-cyan-400 text-lg px-4 py-2">
              #CTeaApp
            </Badge>
            <Badge className="bg-pink-400/20 text-pink-400 text-lg px-4 py-2">
              #TEAToken
            </Badge>
            <Badge className="bg-purple-400/20 text-purple-400 text-lg px-4 py-2">
              #OnChainGossip
            </Badge>
          </div>
          
          <p className="text-white/60 max-w-2xl mx-auto">
            Built for degeneracy, powered by chaos, fueled by your hottest takes.
            <br />
            <span className="text-[#FF6B9D] font-bold">Join the revolution. Spill the tea. Stack the clout.</span>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JoinChaosSection;
