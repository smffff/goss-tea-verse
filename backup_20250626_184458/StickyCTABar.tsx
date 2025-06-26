
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee, Eye } from 'lucide-react';

interface StickyCTABarProps {
  onSpillClick: () => void;
  onReadClick: () => void;
}

const StickyCTABar: React.FC<StickyCTABarProps> = ({ onSpillClick, onReadClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-vintage-red to-tabloid-black border-t-2 border-vintage-red/50 p-3 md:p-4 z-sticky-cta shadow-2xl backdrop-blur-sm">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white font-bold text-sm md:text-base text-center sm:text-left">
          Spill tea anonymously or say it with your chest 🗣️ — you choose the drama.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <Button 
            onClick={onSpillClick}
            className="btn-pill bg-white hover:bg-newsprint text-vintage-red font-bold px-4 py-2 text-sm border-2 border-white hover:border-vintage-red transition-all"
          >
            <Coffee className="w-4 h-4 mr-1" />
            Spill Tea
          </Button>
          <Button 
            onClick={onReadClick}
            variant="outline"
            className="btn-pill border-2 border-white text-white hover:bg-white hover:text-tabloid-black font-bold px-4 py-2 text-sm transition-all"
          >
            <Eye className="w-4 h-4 mr-1" />
            Read
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;
