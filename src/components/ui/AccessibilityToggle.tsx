import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilityToggleProps {
  className?: string;
}

const AccessibilityToggle: React.FC<AccessibilityToggleProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for existing preference
    const saved = localStorage.getItem('ctea-reduced-motion');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (saved === 'true' || prefersReduced) {
      setReducedMotion(true);
      document.documentElement.classList.add('reduced-motion');
    }
  }, []);

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('reduced-motion');
      localStorage.setItem('ctea-reduced-motion', 'true');
    } else {
      document.documentElement.classList.remove('reduced-motion');
      localStorage.setItem('ctea-reduced-motion', 'false');
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-gradient-to-br from-[#100C2A]/95 to-[#1a0d26]/95 backdrop-blur-lg border-2 border-[#00D8A4]/30 rounded-2xl p-4 shadow-2xl min-w-[280px]"
          >
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00D8A4]" />
                Accessibility
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Reduced Motion</p>
                    <p className="text-white/60 text-sm">Disable animations for accessibility</p>
                  </div>
                  <Button
                    onClick={toggleReducedMotion}
                    variant="outline"
                    size="sm"
                    className={`border-2 transition-all ${
                      reducedMotion 
                        ? 'border-[#00D8A4] bg-[#00D8A4]/10 text-[#00D8A4]' 
                        : 'border-white/30 text-white/70 hover:border-[#00D8A4]/50'
                    }`}
                  >
                    {reducedMotion ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-white/50 text-center">
                Settings saved automatically
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-[#00D8A4] to-[#FF4FB3] hover:from-[#FF4FB3] hover:to-[#00D8A4] text-white rounded-full w-12 h-12 shadow-2xl"
        style={{
          boxShadow: '0 0 20px rgba(0, 216, 164, 0.4)'
        }}
      >
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default AccessibilityToggle; 