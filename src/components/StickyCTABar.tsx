import React from 'react';
import TabloidButton from '@/components/ui/TabloidButton';

interface StickyCTABarProps {
  onSpillClick: () => void;
  onReadClick: () => void;
}

const StickyCTABar: React.FC<StickyCTABarProps> = ({ onSpillClick, onReadClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 via-pink-400 to-black border-t-4 border-black p-3 md:p-4 z-sticky-cta shadow-2xl backdrop-blur-sm animate-sticky-banner">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white font-extrabold text-base md:text-lg text-center sm:text-left tracking-wider flex items-center gap-2">
          <span role="img" aria-label="teacup">🫖</span> Spill tea anonymously or say it with your chest <span role="img" aria-label="mic">🎤</span> — you choose the drama.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <TabloidButton 
            onClick={onSpillClick}
            variant="spill"
            shake={true}
            className="bg-red-600 hover:bg-black text-white border-4 border-black font-extrabold px-6 py-2 text-base neon-glow animate-shake-on-hover"
          >
            🫖 Spill Tea
          </TabloidButton>
          <TabloidButton 
            onClick={onReadClick}
            variant="read"
            className="bg-black hover:bg-red-700 text-white border-4 border-white font-extrabold px-6 py-2 text-base neon-glow animate-shake-on-hover"
          >
            🎤 Read
          </TabloidButton>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;
