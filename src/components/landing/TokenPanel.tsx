
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const TokenPanel: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[#1b1b1b]/50 to-transparent">
      <div className="text-center max-w-4xl mx-auto">
        <ParallaxElement speed={0.3} direction="up">
          <div className="bg-gradient-to-r from-[#00d1c1]/10 to-[#ff61a6]/10 border border-[#00d1c1]/30 rounded-3xl p-12">
            <div className="text-7xl mb-6">🚀</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" 
                style={{ fontFamily: "'Luckiest Guy', cursive" }}>
              $TEA Token on AVAX
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Stake, sip, and earn your way to the top of the gossip leaderboard
            </p>
            <Button
              className="bg-gradient-to-r from-[#ff61a6] to-[#00d1c1] hover:from-[#00d1c1] hover:to-[#ff61a6] text-white text-lg px-8 py-3 rounded-full font-bold"
            >
              Claim $TEA Tokens
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </ParallaxElement>
      </div>
    </section>
  );
};

export default TokenPanel;
