
import React from 'react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const TestimonialsPanel: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-6xl mx-auto">
        <ParallaxElement speed={0.3} direction="up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16" 
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            What the <span className="text-[#00d1c1]">Streets</span> Are Saying
          </h2>
        </ParallaxElement>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ParallaxElement speed={0.4} direction="left" delay={0.2}>
            <div className="bg-gradient-to-br from-[#00d1c1]/5 to-transparent border border-[#00d1c1]/20 rounded-2xl p-6">
              <div className="text-4xl mb-4">👀</div>
              <p className="text-white/90 italic mb-4">"Finally, a place where I can spill without getting rekt"</p>
              <p className="text-[#00d1c1] font-bold">- Anonymous Whale</p>
            </div>
          </ParallaxElement>

          <ParallaxElement speed={0.4} direction="right" delay={0.4}>
            <div className="bg-gradient-to-br from-[#ff61a6]/5 to-transparent border border-[#ff61a6]/20 rounded-2xl p-6">
              <div className="text-4xl mb-4">🔥</div>
              <p className="text-white/90 italic mb-4">"The alpha here is absolutely unhinged (in the best way)"</p>
              <p className="text-[#ff61a6] font-bold">- Degen Trader</p>
            </div>
          </ParallaxElement>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPanel;
