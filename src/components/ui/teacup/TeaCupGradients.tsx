
import React from 'react';

const TeaCupGradients: React.FC = () => {
  return (
    <defs>
      {/* Enhanced gradients with 80s vibes */}
      <radialGradient id="teaGlow" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FF6B9D" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#00D4AA" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#9B59B6" stopOpacity="0.4" />
      </radialGradient>
      
      <linearGradient id="retroCup" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="30%" stopColor="#FF9500" />
        <stop offset="70%" stopColor="#00D4AA" />
        <stop offset="100%" stopColor="#4DD9D4" />
      </linearGradient>
      
      <linearGradient id="spillingTea" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="25%" stopColor="#FF9500" />
        <stop offset="50%" stopColor="#F1C40F" />
        <stop offset="75%" stopColor="#E67E22" />
        <stop offset="100%" stopColor="#FF6B9D" />
      </linearGradient>
      
      <linearGradient id="teaSurface" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#FF6B9D" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.3" />
      </linearGradient>
      
      <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="50%" stopColor="#00D4AA" />
        <stop offset="100%" stopColor="#FF9500" />
      </linearGradient>
      
      <linearGradient id="saucerRetro" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4DD9D4" />
        <stop offset="50%" stopColor="#FF6B9D" />
        <stop offset="100%" stopColor="#00D4AA" />
      </linearGradient>
    </defs>
  );
};

export default TeaCupGradients;
