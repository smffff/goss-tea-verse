
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

  return (
    <div className="fixed inset-0 z-5 pointer-events-none">
      {floatingObjects.map((obj) => {
        const y = useTransform(
          scrollProgress,
          [0, 1],
          [`${obj.y}vh`, `${obj.y - (obj.speed * 100)}vh`]
        );
        
        const x = obj.orbit 
          ? useTransform(
              scrollProgress,
              [0, 1],
              [`${obj.x}vw`, `${obj.x + 20}vw`]
            )
          : `${obj.x}vw`;

        const rotate = obj.orbit
          ? useTransform(scrollProgress, [0, 1], [0, 360])
          : 0;

        return (
          <motion.div
            key={obj.id}
            className="absolute will-change-transform"
            style={{
              x,
              y,
              scale: obj.scale,
              rotate: obj.orbit ? rotate : undefined
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.random() * 2 }}
          >
            {obj.element}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParallaxFloatingObjects;
