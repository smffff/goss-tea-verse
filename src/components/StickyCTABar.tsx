
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coffee, Eye } from 'lucide-react';

interface StickyCTABarProps {
  onSpillClick: () => void;
  onReadClick: () => void;
}

const StickyCTABar: React.FC<StickyCTABarProps> = ({ onSpillClick, onReadClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-gray-900 border-t-2 border-red-500 p-4 z-50 shadow-2xl">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-white font-bold text-sm md:text-base">
          Spill tea anonymously or say it with your chest 🗣️ — choose your chaos.
        </p>
        <div className="flex gap-2">
          <Button 
            onClick={onSpillClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 text-sm"
          >
            <Coffee className="w-4 h-4 mr-1" />
            Spill
          </Button>
          <Button 
            onClick={onReadClick}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 font-bold px-4 py-2 text-sm"
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
