import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  variant?: 'wink' | 'bounce' | 'splash' | 'steam' | 'shake' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  variant = 'subtle',
  size = 'md',
  className = '',
  showText = false
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const animationClasses = {
    wink: 'animate-wink',
    bounce: 'animate-bounce',
    splash: 'animate-splash',
    steam: 'animate-steam',
    shake: 'animate-teacup-shake',
    subtle: 'animate-float'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(sizeClasses[size], animationClasses[variant], 'relative')}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="teacupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4aa"/>
              <stop offset="50%" stopColor="#ff6b9d"/>
              <stop offset="100%" stopColor="#b983ff"/>
            </linearGradient>
            
            <linearGradient id="steamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#00d4aa" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#b983ff" stopOpacity="0.4"/>
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle cx="32" cy="32" r="30" fill="url(#teacupGradient)" opacity="0.9"/>
          
          {/* Steam Puffs - Only show for steam variant */}
          {variant === 'steam' && (
            <>
              <g className="animate-steam">
                <path d="M28 18 Q30 12 32 18 Q34 24 32 18" stroke="url(#steamGradient)" strokeWidth="2" fill="none"/>
              </g>
              <g className="animate-steam" style={{ animationDelay: '0.5s' }}>
                <path d="M32 16 Q34 10 36 16 Q38 22 36 16" stroke="url(#steamGradient)" strokeWidth="2" fill="none"/>
              </g>
              <g className="animate-steam" style={{ animationDelay: '1s' }}>
                <path d="M36 18 Q38 12 40 18 Q42 24 40 18" stroke="url(#steamGradient)" strokeWidth="2" fill="none"/>
              </g>
            </>
          )}
          
          {/* Teacup Body */}
          <g>
            {/* Cup */}
            <path d="M20 28 L20 36 C20 38, 22 40, 24 40 L40 40 C42 40, 44 38, 44 36 L44 28 Z" 
                  fill="white" stroke="#1a0d26" strokeWidth="2"/>
            
            {/* Handle */}
            <path d="M44 32 C48 32, 48 36, 44 36" stroke="#1a0d26" strokeWidth="2" fill="none"/>
            
            {/* Tea Liquid */}
            <path d="M22 30 L22 35 C22 37, 23 38, 24 38 L40 38 C41 38, 42 37, 42 35 L42 30 Z" 
                  fill="#8B4513" opacity="0.8"/>
            
            {/* Tea Surface */}
            <ellipse cx="32" cy="31" rx="10" ry="2" fill="#D2691E" opacity="0.6"/>
            
            {/* Eyes */}
            <circle cx="28" cy="32" r="2" fill="#1a0d26" className={variant === 'wink' ? 'animate-wink' : ''}/>
            <circle cx="36" cy="32" r="2" fill="#1a0d26" className={variant === 'wink' ? 'animate-wink' : ''} style={{ animationDelay: '2s' }}/>
            
            {/* Smile */}
            <path d="M28 36 Q32 38 36 36" stroke="#1a0d26" strokeWidth="1.5" fill="none"/>
          </g>
          
          {/* Splash Effect - Only show for splash variant */}
          {variant === 'splash' && (
            <g className="animate-splash">
              <circle cx="32" cy="42" r="3" fill="#ff6b9d" opacity="0.6"/>
              <circle cx="30" cy="44" r="2" fill="#00d4aa" opacity="0.4"/>
              <circle cx="34" cy="44" r="2" fill="#b983ff" opacity="0.4"/>
            </g>
          )}
          
          {/* CTea Text */}
          {showText && (
            <text x="32" y="58" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#1a0d26">
              CTea
            </text>
          )}
        </svg>
      </div>
      
      {showText && (
        <span className="font-bold text-white text-lg">CTea Newsroom</span>
      )}
    </div>
  );
};

export default AnimatedLogo; 