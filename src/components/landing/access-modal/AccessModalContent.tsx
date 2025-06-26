
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SpillingTeaCup from '@/components/ui/SpillingTeaCup';
import SpillSubmission from './SpillSubmission';
import BribeSubmission from './BribeSubmission';
import CodeSubmission from './CodeSubmission';
import GeneratedCode from './GeneratedCode';
import SuccessScreen from './SuccessScreen';

interface AccessModalContentProps {
  selectedPath: 'spill' | 'bribe' | 'code' | null;
  step: 'input' | 'generated' | 'success';
  config: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    description: string;
  };
  spillContent: string;
  setSpillContent: (content: string) => void;
  tipAmount: string;
  setTipAmount: (amount: string) => void;
  accessCode: string;
  onAccessCodeChange: (code: string) => void;
  showCode: boolean;
  setShowCode: (show: boolean) => void;
  generatedCode: string;
  error: string;
  isLoading: boolean;
  onSpillSubmit: () => void;
  onBribeSubmit: () => void;
  onCodeSubmit: () => void;
  onUseGeneratedCode: () => void;
}

const AccessModalContent: React.FC<AccessModalContentProps> = ({
  selectedPath,
  step,
  config,
  spillContent,
  setSpillContent,
  tipAmount,
  setTipAmount,
  accessCode,
  onAccessCodeChange,
  showCode,
  setShowCode,
  generatedCode,
  error,
  isLoading,
  onSpillSubmit,
  onBribeSubmit,
  onCodeSubmit,
  onUseGeneratedCode
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-3" 
                     style={{ fontFamily: "'Luckiest Guy', cursive" }}>
          <config.icon className="w-8 h-8" />
          {config.title}
        </DialogTitle>
        <p className="text-center text-white/80 text-sm mt-2">
          {config.description}
        </p>
      </DialogHeader>
      
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6 mt-4"
          >
            {selectedPath === 'spill' && (
              <SpillSubmission
                spillContent={spillContent}
                setSpillContent={setSpillContent}
                isLoading={isLoading}
                onSubmit={onSpillSubmit}
                error={error}
              />
            )}

            {selectedPath === 'bribe' && (
              <BribeSubmission
                tipAmount={tipAmount}
                setTipAmount={setTipAmount}
                isLoading={isLoading}
                onSubmit={onBribeSubmit}
                error={error}
              />
            )}

            {selectedPath === 'code' && (
              <CodeSubmission
                accessCode={accessCode}
                onAccessCodeChange={onAccessCodeChange}
                showCode={showCode}
                setShowCode={setShowCode}
                isLoading={isLoading}
                onSubmit={onCodeSubmit}
                error={error}
              />
            )}
          </motion.div>
        )}

        {step === 'generated' && (
          <GeneratedCode
            generatedCode={generatedCode}
            isLoading={isLoading}
            onUseCode={onUseGeneratedCode}
          />
        )}

        {step === 'success' && <SuccessScreen />}
      </AnimatePresence>
    </>
  );
};

export default AccessModalContent;
