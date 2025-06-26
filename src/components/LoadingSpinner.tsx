
import React from 'react';
import { Coffee, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'tea' | 'sparkles' | 'default';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message, 
  size = 'md',
  variant = 'tea'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const containerClasses = {
    sm: 'gap-2 text-sm',
    md: 'gap-3 text-base',
    lg: 'gap-4 text-lg'
  };

  const funnyMessages = [
    "Give me a min I'm not a dev I'm just a lady ok",
    "Hold up, the hamsters powering this thing need a coffee break ☕",
    "Loading... please don't judge my spaghetti code",
    "Trying to make this work with duct tape and determination",
    "Buffering like it's 2005... sorry bestie",
    "The tea is brewing but the code is still percolating",
    "One sec, gotta untangle these digital Christmas lights",
    "Loading faster than my will to debug on a Friday",
    "Plot twist: I have no idea what I'm doing but we're here anyway",
    "Patience grasshopper, Rome wasn't coded in a day"
  ];

  const displayMessage = message || funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      <div className="relative">
        {variant === 'tea' ? (
          <Coffee className={`${sizeClasses[size]} text-vintage-red animate-teacup-shake`} />
        ) : variant === 'sparkles' ? (
          <Sparkles className={`${sizeClasses[size]} text-neon-pink animate-pulse`} />
        ) : (
          <div className={`${sizeClasses[size]} border-2 border-vintage-red border-t-transparent rounded-full animate-spin`} />
        )}
        
        {/* Animated steam effect for tea variant */}
        {variant === 'tea' && (
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-3 bg-gradient-to-t from-vintage-red/30 to-transparent rounded-full animate-float opacity-60"></div>
            <div className="w-1 h-2 bg-gradient-to-t from-vintage-red/20 to-transparent rounded-full animate-float animation-delay-300 ml-1 -mt-2 opacity-40"></div>
          </div>
        )}
      </div>
      
      <p className="text-tabloid-black/70 font-headline font-medium text-center max-w-xs">
        {displayMessage}
      </p>
      
      {size === 'lg' && (
        <p className="text-tabloid-black/50 text-sm mt-2 font-medium">
          Beta life hits different 💅✨
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
