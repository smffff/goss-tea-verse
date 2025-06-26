
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';
import TeaCup from '@/components/TeaCup';

interface HeroPanelProps {
  onEnterClick: () => void;
}

const HeroPanel: React.FC<HeroPanelProps> = ({ onEnterClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <ParallaxElement speed={0.6} direction="up" delay={0.2}>
          <div className="mb-8 animate-float">
            <TeaCup className="w-32 h-32 md:w-48 md:h-48 mx-auto filter drop-shadow-2xl" animated />
          </div>
        </ParallaxElement>

        <ParallaxElement speed={0.4} direction="up" delay={0.4}>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" 
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            <span className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] bg-clip-text text-transparent">
              CTea Newsroom
            </span>
          </h1>
        </ParallaxElement>

        <ParallaxElement speed={0.3} direction="up" delay={0.6}>
          <p className="text-2xl md:text-3xl text-[#00d1c1] mb-4 font-bold italic">
            Managed chaos, served hot.
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Where the alpha is spicy and the memes are hot
          </p>
        </ParallaxElement>

        <ParallaxElement speed={0.2} direction="up" delay={0.8}>
          <Button
            onClick={onEnterClick}
            className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:from-[#ff61a6] hover:to-[#00d1c1] text-white text-xl px-12 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl animate-pulse"
          >
            Enter the Newsroom
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </ParallaxElement>
      </div>
    </section>
  );
};

export default HeroPanel;
