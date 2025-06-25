import React from 'react';
import { Coffee, Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'spinner' | 'dots' | 'tea';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  type = 'spinner',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const renderSpinner = () => {
    switch (type) {
      case 'tea':
        return (
          <div className="flex flex-col items-center gap-3">
            <Coffee className={`${sizeClasses[size]} text-ctea-teal animate-bounce`} />
            {text && <p className={`${textSizes[size]} text-gray-400`}>{text}</p>}
          </div>
        );
      case 'dots':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="flex space-x-1">
              <div className={`${sizeClasses[size]} bg-ctea-teal rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
              <div className={`${sizeClasses[size]} bg-ctea-teal rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
              <div className={`${sizeClasses[size]} bg-ctea-teal rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
            </div>
            {text && <p className={`${textSizes[size]} text-gray-400`}>{text}</p>}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className={`${sizeClasses[size]} text-ctea-teal animate-spin`} />
            {text && <p className={`${textSizes[size]} text-gray-400`}>{text}</p>}
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {renderSpinner()}
    </div>
  );
};

export default LoadingSpinner;
