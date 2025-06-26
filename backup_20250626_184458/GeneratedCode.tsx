
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coffee, Sparkles } from 'lucide-react';
import SpillingTeaCup from '@/components/ui/SpillingTeaCup';

interface GeneratedCodeProps {
  generatedCode: string;
  isLoading: boolean;
  onUseCode: () => void;
}

const GeneratedCode: React.FC<GeneratedCodeProps> = ({
  generatedCode,
  isLoading,
  onUseCode
}) => {
  return (
    <motion.div
      key="generated"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="text-center py-8 space-y-6"
    >
      <SpillingTeaCup size="lg" className="mx-auto" animated isSpilling />
      
      <h3 className="text-2xl font-bold text-white">
        🎉 Access Code Generated!
      </h3>
      
      <div className="bg-white/20 border border-white/40 rounded-xl p-6 backdrop-blur-sm">
        <p className="text-white/80 mb-4">Your exclusive access code:</p>
        <div className="bg-black/30 rounded-lg p-4 font-mono text-2xl font-bold text-center text-white tracking-wider">
          {generatedCode}
        </div>
        <p className="text-xs text-white/60 mt-2">
          Save this code - you'll need it to access the newsroom
        </p>
      </div>
      
      <Button
        onClick={onUseCode}
        disabled={isLoading}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 backdrop-blur-sm"
      >
        {isLoading ? (
          <>
            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
            Entering Newsroom...
          </>
        ) : (
          <>
            <Coffee className="w-5 h-5 mr-2" />
            Enter CTea Newsroom
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default GeneratedCode;
