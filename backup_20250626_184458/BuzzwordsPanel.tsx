
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParallaxElement from '@/components/ui/ParallaxElement';

const BuzzwordsPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-t from-[#1b1b1b] to-transparent">
      <div className="text-center max-w-6xl mx-auto">
        <ParallaxElement speed={0.2} direction="up">
          <h2 className="text-3xl md:text-4xl text-white mb-12" 
              style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            CTea is...
          </h2>
        </ParallaxElement>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {['Gossip', 'Anon Leaks', 'Scandal', 'Memes', 'Alpha', 'Chaos'].map((word, index) => (
            <ParallaxElement key={word} speed={0.3} direction="up" delay={index * 0.1}>
              <div className="bg-gradient-to-r from-[#00d1c1]/20 to-[#ff61a6]/20 border border-[#00d1c1]/30 rounded-full px-6 py-3 hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">{word}</span>
              </div>
            </ParallaxElement>
          ))}
        </div>

        <ParallaxElement speed={0.1} direction="up" delay={0.8}>
          <Button
            onClick={() => navigate('/feed')}
            className="bg-gradient-to-r from-[#00d1c1] to-[#ff61a6] hover:from-[#ff61a6] hover:to-[#00d1c1] text-white text-xl px-12 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Enter the Chaos
            <Coffee className="ml-2 w-6 h-6" />
          </Button>
        </ParallaxElement>
      </div>
    </section>
  );
};

export default BuzzwordsPanel;
