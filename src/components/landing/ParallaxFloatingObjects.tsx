import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface FloatingObject {
  id: string;
  element: React.ReactNode;
  x: number;
  y: number;
  scale: number;
  speed: number;
  orbit?: boolean;
}

interface ParallaxFloatingObjectsProps {
  scrollProgress: MotionValue<number>;
}

const ParallaxFloatingObjects: React.FC<ParallaxFloatingObjectsProps> = ({ scrollProgress }) => {
  const floatingObjects: FloatingObject[] = [
    // Teacup Rockets
    {
      id: 'teacup-rocket-1',
      element: <BrandedTeacupIcon size="xl" variant="spilling" animated />,
      x: 10,
      y: 20,
      scale: 1.2,
      speed: 0.3,
      orbit: true
    },
    {
      id: 'teacup-rocket-2',
      element: <BrandedTeacupIcon size="lg" variant="steaming" animated />,
      x: 85,
      y: 70,
      scale: 1,
      speed: 0.5
    },
    
    // $TEA Token Coins
    {
      id: 'tea-token-1',
      element: (
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
        >
          $TEA
        </motion.div>
      ),
      x: 75,
      y: 25,
      scale: 1,
      speed: 0.4
    },
    {
      id: 'tea-token-2',
      element: (
        <motion.div
          animate={{ rotateY: [360, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
        >
          TEA
        </motion.div>
      ),
      x: 20,
      y: 80,
      scale: 0.8,
      speed: 0.6
    },
    
    // Meme Quote Bubbles
    {
      id: 'quote-1',
      element: (
        <div className="bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-3 max-w-48 shadow-lg">
          <p className="text-cyan-400 text-sm font-bold">"demo mode is cute."</p>
          <div className="text-xs text-gray-400 mt-1">- Anonymous OG</div>
        </div>
      ),
      x: 60,
      y: 15,
      scale: 1,
      speed: 0.2
    },
    {
      id: 'quote-2',
      element: (
        <div className="bg-white/10 backdrop-blur-sm border border-pink-400/30 rounded-2xl p-3 max-w-52 shadow-lg">
          <p className="text-pink-400 text-sm font-bold">"spill the hottest tea"</p>
          <div className="text-xs text-gray-400 mt-1">- CTea Bot</div>
        </div>
      ),
      x: 15,
      y: 60,
      scale: 0.9,
      speed: 0.35
    },
    
    // OG Badges
    {
      id: 'og-badge-1',
      element: (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg">
          <div className="text-white text-center">
            <div className="text-xs font-bold">OG</div>
            <div className="text-xs">SIPPER</div>
          </div>
        </div>
      ),
      x: 90,
      y: 45,
      scale: 1,
      speed: 0.25
    },
    
    // Lady Invisible Avatar (placeholder)
    {
      id: 'lady-invisible',
      element: (
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xl"
        >
          👁️
        </motion.div>
      ),
      x: 40,
      y: 85,
      scale: 1,
      speed: 0.4
    }
  ];

  // Create individual transforms for each object
  const teacupRocket1Y = useTransform(scrollProgress, [0, 1], ['20vh', '-10vh']);
  const teacupRocket1X = useTransform(scrollProgress, [0, 1], ['10vw', '30vw']);
  const teacupRocket1Rotate = useTransform(scrollProgress, [0, 1], [0, 360]);

  const teacupRocket2Y = useTransform(scrollProgress, [0, 1], ['70vh', '20vh']);

  const teaToken1Y = useTransform(scrollProgress, [0, 1], ['25vh', '-15vh']);

  const teaToken2Y = useTransform(scrollProgress, [0, 1], ['80vh', '20vh']);

  const quote1Y = useTransform(scrollProgress, [0, 1], ['15vh', '-5vh']);

  const quote2Y = useTransform(scrollProgress, [0, 1], ['60vh', '25vh']);

  const ogBadge1Y = useTransform(scrollProgress, [0, 1], ['45vh', '20vh']);

  const ladyInvisibleY = useTransform(scrollProgress, [0, 1], ['85vh', '45vh']);

  return (
    <div className="fixed inset-0 z-5 pointer-events-none">
      {/* Teacup Rocket 1 */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: teacupRocket1X,
          y: teacupRocket1Y,
          scale: 1.2,
          rotate: teacupRocket1Rotate
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {floatingObjects[0].element}
      </motion.div>

      {/* Teacup Rocket 2 */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: '85vw',
          y: teacupRocket2Y,
          scale: 1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {floatingObjects[1].element}
      </motion.div>

      {/* TEA Token 1 */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: '75vw',
          y: teaToken1Y,
          scale: 1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {floatingObjects[2].element}
      </motion.div>

      {/* TEA Token 2 */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: '20vw',
          y: teaToken2Y,
          scale: 0.8
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {floatingObjects[3].element}
      </motion.div>

      {/* Quote 1 */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: '60vw',
          y: quote1Y,
          scale: 1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {floatingObjects[4].element}
      </motion.div>

      {/* Quote 2 */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: '15vw',
          y: quote2Y,
          scale: 0.9
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        {floatingObjects[5].element}
      </motion.div>

      {/* OG Badge 1 */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: '90vw',
          y: ogBadge1Y,
          scale: 1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        {floatingObjects[6].element}
      </motion.div>

      {/* Lady Invisible */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: '40vw',
          y: ladyInvisibleY,
          scale: 1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {floatingObjects[7].element}
      </motion.div>
    </div>
  );
};

export default ParallaxFloatingObjects;
