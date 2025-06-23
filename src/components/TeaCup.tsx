
import React from 'react';

interface TeaCupProps {
  className?: string;
  animated?: boolean;
}

const TeaCup: React.FC<TeaCupProps> = ({ className = '', animated = false }) => {
  return (
    <div className={`${className} ${animated ? 'animate-bounce' : ''}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#backgroundGradient)"
          className="opacity-90"
        />
        
        {/* Steam */}
        <g className={animated ? 'animate-pulse' : ''}>
          <path
            d="M38 22 C38 17, 42 17, 42 22 C42 17, 46 17, 46 22"
            stroke="#FF6B9D"
            strokeWidth="2.5"
            fill="none"
            className="opacity-80"
          />
          <path
            d="M46 20 C46 15, 50 15, 50 20 C50 15, 54 15, 54 20"
            stroke="#00D4AA"
            strokeWidth="2.5"
            fill="none"
            className="opacity-60"
          />
          <path
            d="M54 22 C54 17, 58 17, 58 22 C58 17, 62 17, 62 22"
            stroke="#FF9500"
            strokeWidth="2.5"
            fill="none"
            className="opacity-70"
          />
        </g>
        
        {/* Cup Body - Modern Style */}
        <path
          d="M28 32 L28 68 C28 74, 32 78, 38 78 L62 78 C68 78, 72 74, 72 68 L72 32 Z"
          fill="url(#cupGradient)"
          stroke="#1A0D26"
          strokeWidth="3"
        />
        
        {/* Tea Liquid with Gradient */}
        <path
          d="M30 34 L30 66 C30 71, 33 75, 38 75 L62 75 C67 75, 70 71, 70 66 L70 34 Z"
          fill="url(#teaGradient)"
          className="opacity-85"
        />
        
        {/* Tea Surface Highlight */}
        <ellipse
          cx="50"
          cy="36"
          rx="20"
          ry="3"
          fill="url(#surfaceGradient)"
          className="opacity-60"
        />
        
        {/* Handle - Modernized */}
        <path
          d="M72 45 C82 45, 82 55, 72 55"
          stroke="#00D4AA"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Saucer */}
        <ellipse
          cx="50"
          cy="80"
          rx="28"
          ry="5"
          fill="url(#saucerGradient)"
          className="opacity-70"
        />
        
        {/* Decorative Drips */}
        <circle cx="33" cy="75" r="2" fill="#FF6B9D" className="opacity-60" />
        <circle cx="67" cy="73" r="1.5" fill="#00D4AA" className="opacity-50" />
        
        <defs>
          {/* Background Gradient */}
          <radialGradient id="backgroundGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF9500" />
            <stop offset="50%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#9B59B6" />
          </radialGradient>
          
          {/* Cup Gradient */}
          <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4AA" />
            <stop offset="50%" stopColor="#4DD9D4" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>
          
          {/* Tea Gradient */}
          <linearGradient id="teaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="30%" stopColor="#FF9500" />
            <stop offset="70%" stopColor="#F1C40F" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>
          
          {/* Surface Gradient */}
          <linearGradient id="surfaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6B9D" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Saucer Gradient */}
          <linearGradient id="saucerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DD9D4" />
            <stop offset="100%" stopColor="#00D4AA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TeaCup;
