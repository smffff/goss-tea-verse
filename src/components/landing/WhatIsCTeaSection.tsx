
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Bot, Zap } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const WhatIsCTeaSection: React.FC = () => {
  const features = [
    { text: "AI Gossip", icon: Bot, color: "from-cyan-400 to-blue-500" },
    { text: "On-chain Drama", icon: Zap, color: "from-pink-400 to-purple-500" },
    { text: "MemeDAO meets Wendy Williams", icon: Sparkles, color: "from-yellow-400 to-orange-500" }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      {/* Comic Panel Slide In */}
      <motion.div
        className="absolute left-4 md:left-16 top-1/2 transform -translate-y-1/2 z-10"
        initial={{ x: -300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="w-32 h-40 md:w-48 md:h-60 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-2xl border-4 border-black transform rotate-3">
          <div className="p-4 h-full flex flex-col justify-center items-center text-black font-bold text-center">
            <div className="text-4xl mb-2">💬</div>
            <div className="text-sm md:text-base">SPILL TEA</div>
            <div className="text-xs md:text-sm">COMIC PANEL</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center">
        <ParallaxElement speed={0.3} direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8" style={{ fontFamily: "'Anton', sans-serif" }}>
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              What is CTea?
            </span>
          </h2>
        </ParallaxElement>

        <ParallaxElement speed={0.2} direction="up" delay={0.4}>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-semibold">
            An <span className="text-ctea-teal font-bold">AI-powered</span>, 
            <span className="text-pink-400 font-bold"> meme-fueled</span>, 
            <span className="text-purple-400 font-bold"> gossip app</span> for Web3.
            <br />
            Where anonymous leaks meet blockchain receipts.
          </p>
        </ParallaxElement>

        {/* Floating Quote Bubbles */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              className="relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`bg-gradient-to-r ${feature.color} p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white mb-3 mx-auto" />
                <p className="text-white font-bold text-lg">{feature.text}</p>
              </div>
              
              {/* Speech bubble tail */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r ${feature.color} rotate-45`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsCTeaSection;
