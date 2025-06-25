import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TabloidButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'spill' | 'read' | 'connect' | 'secondary';
  tabloidStyle?: boolean;
  shake?: boolean;
}

const TabloidButton: React.FC<TabloidButtonProps> = ({
  children,
  variant = 'spill',
  tabloidStyle = true,
  shake = false,
  className,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'spill':
        return 'bg-gradient-to-r from-vintage-red to-vintage-red-700 hover:from-vintage-red-600 hover:to-vintage-red-800 text-white border-2 border-vintage-red-800 shadow-lg';
      case 'read':
        return 'bg-transparent hover:bg-vintage-red hover:text-white text-vintage-red border-2 border-vintage-red shadow-lg';
      case 'connect':
        return 'bg-gradient-to-r from-tabloid-black to-tabloid-black-800 hover:from-tabloid-black-700 hover:to-tabloid-black-900 text-white border-2 border-tabloid-black-900 shadow-lg';
      case 'secondary':
        return 'bg-newsprint hover:bg-pale-pink text-tabloid-black border-2 border-tabloid-black shadow-lg';
      default:
        return '';
    }
  };

  const tabloidClasses = tabloidStyle ? 'font-headline font-bold tracking-wide uppercase text-lg px-8 py-4 rounded-lg' : '';
  const shakeClasses = shake ? 'hover:animate-teacup-shake' : '';
  const hoverEffects = 'transition-all duration-300 hover:scale-105 hover:shadow-xl';
  
  return (
    <Button
      className={cn(
        tabloidClasses,
        getVariantStyles(),
        shakeClasses,
        hoverEffects,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default TabloidButton;
