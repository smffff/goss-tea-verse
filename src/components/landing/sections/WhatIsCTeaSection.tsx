
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MessageCircle, Trophy } from 'lucide-react';
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
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            What is CTea?
            <BrandedTeacupIcon size="lg" variant="steaming" animated />
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The ultimate crypto gossip HQ where anonymous intel meets AI-powered chaos
          </p>
        </motion.div>

        {/* Comic Panel Placeholder */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-2 border-[#FF6B9D]/30 p-8 relative overflow-hidden">
            <CardContent className="text-center">
              <div className="w-full h-64 bg-gradient-to-r from-[#FF6B9D]/20 to-[#00D4AA]/20 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">📰</div>
                  <p className="text-white/60 text-lg">Comic Panel Placeholder</p>
                  <p className="text-white/40 text-sm">Drop your comic panel asset here</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Anonymous Intel • AI Commentary • Meme Generation
              </h3>
              <p className="text-white/80 text-lg">
                Share your hottest takes without revealing identity. Let our AI amplify the drama 
                while you stack $TEA tokens for quality content.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-400/30 h-full">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-3">Anonymous Spills</h4>
                <p className="text-gray-300">
                  Share industry secrets without revealing your identity. Perfect for insiders with hot takes.
                </p>
                <Badge className="mt-3 bg-cyan-400/20 text-cyan-300">Stealth Mode</Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-pink-400/30 h-full">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-3">AI-Powered Chaos</h4>
                <p className="text-gray-300">
                  Smart commentary, credibility scoring, and automatic meme generation to amplify your drama.
                </p>
                <Badge className="mt-3 bg-pink-400/20 text-pink-300">Bot Enhanced</Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-orange-400/30 h-full">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-3">Earn & Govern</h4>
                <p className="text-gray-300">
                  Stack $TEA tokens for quality content. Vote on platform direction. Become a legend.
                </p>
                <Badge className="mt-3 bg-orange-400/20 text-orange-300">Token Rewards</Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhatIsCTeaSection;
