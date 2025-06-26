
import React from 'react';
import ParallaxElement from '@/components/ui/ParallaxElement';

interface ChaosPanelProps {
  onAccessPath: (path: 'spill' | 'bribe' | 'code') => void;
}

const ChaosPanel: React.FC<ChaosPanelProps> = ({ onAccessPath }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-transparent to-[#1b1b1b]/50">
      <div className="text-center max-w-5xl mx-auto">
        <ParallaxElement speed={0.3} direction="up">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-16" 
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            Choose Your <span className="text-[#ff61a6]">Chaos</span>
          </h2>
        </ParallaxElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ParallaxElement speed={0.4} direction="up" delay={0.2}>
            <div 
              onClick={() => onAccessPath('spill')}
              className="bg-gradient-to-b from-[#00d1c1]/20 to-[#00d1c1]/5 border-2 border-[#00d1c1]/30 rounded-2xl p-8 cursor-pointer hover:border-[#00d1c1] hover:shadow-xl hover:shadow-[#00d1c1]/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-6xl mb-4">🫖</div>
              <h3 className="text-2xl font-bold text-white mb-4">Spill the Tea</h3>
              <p className="text-white/70">Drop your hottest gossip and earn access</p>
            </div>
          </ParallaxElement>

          <ParallaxElement speed={0.4} direction="up" delay={0.4}>
            <div 
              onClick={() => onAccessPath('bribe')}
              className="bg-gradient-to-b from-[#ff61a6]/20 to-[#ff61a6]/5 border-2 border-[#ff61a6]/30 rounded-2xl p-8 cursor-pointer hover:border-[#ff61a6] hover:shadow-xl hover:shadow-[#ff61a6]/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-6xl mb-4">💅</div>
              <h3 className="text-2xl font-bold text-white mb-4">Bribe the Gatekeepers</h3>
              <p className="text-white/70">Show us your $TEA tokens for instant access</p>
            </div>
          </ParallaxElement>

          <ParallaxElement speed={0.4} direction="up" delay={0.6}>
            <div 
              onClick={() => onAccessPath('code')}
              className="bg-gradient-to-b from-white/10 to-white/5 border-2 border-white/30 rounded-2xl p-8 cursor-pointer hover:border-white hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-6xl mb-4">🔐</div>
              <h3 className="text-2xl font-bold text-white mb-4">Enter Access Code</h3>
              <p className="text-white/70">Already have the secret key?</p>
            </div>
          </ParallaxElement>
        </div>
      </div>
    </section>
  );
};

export default ChaosPanel;
