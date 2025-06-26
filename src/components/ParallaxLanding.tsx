
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import HeroPanel from '@/components/landing/HeroPanel';
import ChaosPanel from '@/components/landing/ChaosPanel';
import TokenPanel from '@/components/landing/TokenPanel';
import TestimonialsPanel from '@/components/landing/TestimonialsPanel';
import BuzzwordsPanel from '@/components/landing/BuzzwordsPanel';
import AccessModal from '@/components/landing/AccessModal';
import FloatingElements from '@/components/landing/FloatingElements';

const ParallaxLanding: React.FC = () => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [selectedPath, setSelectedPath] = useState<'spill' | 'bribe' | 'code' | null>(null);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const middleY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);

  const handleAccessPath = (path: 'spill' | 'bribe' | 'code') => {
    setSelectedPath(path);
    setShowAccessModal(true);
  };

  const handleAccessSubmit = () => {
    if (selectedPath === 'code' && accessCode.toLowerCase() === 'tea') {
      toast({
        title: "Access Granted! 🫖",
        description: "Welcome to CTea Newsroom!",
      });
      navigate('/feed');
    } else if (selectedPath === 'spill') {
      toast({
        title: "Tea Spillers Welcome! ☕",
        description: "Your access code is: TEA",
      });
      setAccessCode('TEA');
      setTimeout(() => navigate('/feed'), 2000);
    } else if (selectedPath === 'bribe') {
      toast({
        title: "Bribe Accepted! 💰",
        description: "Your access code is: TEA",
      });
      setAccessCode('TEA');
      setTimeout(() => navigate('/feed'), 2000);
    } else {
      toast({
        title: "Invalid Code",
        description: "Try 'TEA' or choose another path!",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1b1b1b] via-[#2a1a2a] to-[#1a2a2a]">
      {/* Background Layer - Cyber Grid (Slowest) */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="w-full h-full cyber-grid animate-pulse"></div>
      </motion.div>

      {/* Middle Layer - Floating Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: middleY }}
      >
        <FloatingElements />
      </motion.div>

      {/* Foreground Content */}
      <motion.div 
        className="relative z-10"
        style={{ y: foregroundY }}
      >
        <HeroPanel onEnterClick={() => setShowAccessModal(true)} />
        <ChaosPanel onAccessPath={handleAccessPath} />
        <TokenPanel />
        <TestimonialsPanel />
        <BuzzwordsPanel />
      </motion.div>

      {/* Access Modal */}
      <AccessModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        selectedPath={selectedPath}
        accessCode={accessCode}
        onAccessCodeChange={setAccessCode}
        onSubmit={handleAccessSubmit}
      />
    </div>
  );
};

export default ParallaxLanding;
