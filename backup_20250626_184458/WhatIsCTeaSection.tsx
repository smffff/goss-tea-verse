
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MessageCircle, Trophy, Zap } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

const WhatIsCTeaSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [400, 1200], [100, -100]);
  const opacity = useTransform(scrollY, [300, 600, 1000, 1300], [0, 1, 1, 0]);

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
      style={{ y, opacity }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 flex items-center justify-center gap-4"
              style={{ 
                fontFamily: "'Anton', 'Impact', sans-serif",
                textShadow: '0 0 20px rgba(0, 216, 164, 0.5)'
              }}>
            What is CTea?
            <BrandedTeacupIcon size="lg" variant="steaming" animated />
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The ultimate crypto gossip HQ where anonymous intel meets AI-powered chaos
          </p>
        </motion.div>

        {/* Enhanced Comic Panel */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
          whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 border-4 border-[#FF6B9D] p-8 relative overflow-hidden"
                style={{ 
                  borderRadius: '25px',
                  filter: 'drop-shadow(0 15px 35px rgba(255, 107, 157, 0.3))'
                }}>
            
            {/* Comic book halftone pattern */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: 'radial-gradient(circle, #FF6B9D 2px, transparent 2px)',
                   backgroundSize: '20px 20px',
                   backgroundPosition: '0 0, 10px 10px'
                 }} />
            
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 left-1/4 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#FF6B9D] transform translate-y-full"
                 style={{ filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3))' }} />

            <CardContent className="text-center relative z-10">
              {/* Comic Panel Header */}
              <motion.div
                className="bg-gradient-to-r from-[#FF6B9D] to-[#00D4AA] text-black px-6 py-3 rounded-full inline-block mb-6 border-4 border-white font-bold text-lg"
                style={{ 
                  fontFamily: "'Anton', 'Impact', sans-serif",
                  filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))'
                }}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.3 }}
              >
                🫖 WHAT IS CTEA? 🫖
              </motion.div>

              <div className="w-full h-80 bg-gradient-to-br from-[#FF6B9D]/20 to-[#00D4AA]/20 rounded-2xl border-4 border-dashed border-white/40 flex items-center justify-center mb-6 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-30"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-pink-400 rotate-45 opacity-40"
                    animate={{ y: [0, -20, 0], rotate: [45, 225, 45] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                </div>

                <div className="text-center z-10">
                  <motion.div 
                    className="text-8xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📰
                  </motion.div>
                  <p className="text-white/70 text-lg font-bold">Comic Panel Placeholder</p>
                  <p className="text-white/50 text-sm">Drop your comic panel asset here</p>
                  
                  {/* Floating speech bubbles */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    "SPILL TEA!"
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    "EARN $TEA!"
                  </motion.div>
                </div>
              </div>

              <motion.h3 
                className="text-3xl font-bold text-white mb-4"
                style={{ 
                  fontFamily: "'Anton', 'Impact', sans-serif",
                  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)'
                }}
                whileInView={{ scale: [0.9, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Anonymous Intel • AI Commentary • Meme Generation
              </motion.h3>
              <p className="text-white/80 text-lg leading-relaxed max-w-4xl mx-auto">
                Share your hottest takes without revealing identity. Let our AI amplify the drama 
                while you stack <span className="text-yellow-400 font-bold">$TEA tokens</span> for quality content.
              </p>

              {/* Animated "BAM!" effect */}
              <motion.div
                className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold transform -rotate-12"
                style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
                initial={{ scale: 0, rotate: -12 }}
                whileInView={{ scale: 1, rotate: -12 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              >
                BAM!
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0, rotateY: -30 }}
            whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-4 border-cyan-400/50 h-full relative overflow-hidden"
                  style={{ borderRadius: '20px', filter: 'drop-shadow(0 10px 25px rgba(6, 182, 212, 0.2))' }}>
              
              {/* Comic dots pattern */}
              <div className="absolute inset-0 opacity-5"
                   style={{
                     backgroundImage: 'radial-gradient(circle, cyan 1px, transparent 1px)',
                     backgroundSize: '15px 15px'
                   }} />
              
              <CardContent className="p-6 text-center relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle className="w-16 h-16 text-cyan-400 mx-auto mb-4" 
                                 style={{ filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.6))' }} />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-3" 
                    style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
                  Anonymous Spills
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Share industry secrets without revealing your identity. Perfect for insiders with hot takes.
                </p>
                <Badge className="mt-4 bg-cyan-400/20 text-cyan-300 border-cyan-400/40 px-4 py-1">
                  🥷 Stealth Mode
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-4 border-pink-400/50 h-full relative overflow-hidden"
                  style={{ borderRadius: '20px', filter: 'drop-shadow(0 10px 25px rgba(236, 72, 153, 0.2))' }}>
              
              <div className="absolute inset-0 opacity-5"
                   style={{
                     backgroundImage: 'radial-gradient(circle, #FF6B9D 1px, transparent 1px)',
                     backgroundSize: '15px 15px'
                   }} />
              
              <CardContent className="p-6 text-center relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-16 h-16 text-pink-400 mx-auto mb-4" 
                            style={{ filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.6))' }} />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-3" 
                    style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
                  AI-Powered Chaos
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Smart commentary, credibility scoring, and automatic meme generation to amplify your drama.
                </p>
                <Badge className="mt-4 bg-pink-400/20 text-pink-300 border-pink-400/40 px-4 py-1">
                  🤖 Bot Enhanced
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0, rotateY: 30 }}
            whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 border-4 border-orange-400/50 h-full relative overflow-hidden"
                  style={{ borderRadius: '20px', filter: 'drop-shadow(0 10px 25px rgba(251, 146, 60, 0.2))' }}>
              
              <div className="absolute inset-0 opacity-5"
                   style={{
                     backgroundImage: 'radial-gradient(circle, orange 1px, transparent 1px)',
                     backgroundSize: '15px 15px'
                   }} />
              
              <CardContent className="p-6 text-center relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Trophy className="w-16 h-16 text-orange-400 mx-auto mb-4" 
                          style={{ filter: 'drop-shadow(0 0 15px rgba(251, 146, 60, 0.6))' }} />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-3" 
                    style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}>
                  Earn & Govern
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Stack $TEA tokens for quality content. Vote on platform direction. Become a legend.
                </p>
                <Badge className="mt-4 bg-orange-400/20 text-orange-300 border-orange-400/40 px-4 py-1">
                  💰 Token Rewards
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhatIsCTeaSection;
