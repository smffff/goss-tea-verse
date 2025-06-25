
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee, Eye } from 'lucide-react';

interface StickyCTABarProps {
  onSpillClick: () => void;
  onReadClick: () => void;
}

const StickyCTABar: React.FC<StickyCTABarProps> = ({ onSpillClick, onReadClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-vintage-red to-tabloid-black border-t-2 border-vintage-red p-4 z-50 shadow-2xl">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-white font-bold text-sm md:text-base">
          Spill tea anonymously or say it with your chest 🗣️ — you choose the drama.
        </p>
        <div className="flex gap-2">
          <Button 
            onClick={onSpillClick}
            className="btn-pill bg-white hover:bg-gray-100 text-vintage-red font-bold px-4 py-2 text-sm"
          >
            <Coffee className="w-4 h-4 mr-1" />
            Spill the Tea
          </Button>
          <Button 
            onClick={onReadClick}
            variant="outline"
            className="btn-pill border-white text-white hover:bg-white hover:text-tabloid-black font-bold px-4 py-2 text-sm"
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
