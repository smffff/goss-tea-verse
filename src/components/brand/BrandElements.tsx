
import React from 'react';
import { cn } from '@/lib/utils';
import { BRAND_CONFIG } from '@/lib/config/brandConfig';
import AnimatedLogo from '@/components/AnimatedLogo';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'wink' | 'bounce' | 'splash' | 'steam' | 'shake' | 'subtle';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'subtle',
  showText = false,
  className
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <AnimatedLogo variant={variant} size={size} showText={showText} />
    </div>
  );
};

interface BrandTaglineProps {
  variant?: 'primary' | 'secondary' | 'minimal';
  className?: string;
}

export const BrandTagline: React.FC<BrandTaglineProps> = ({
  variant = 'primary',
  className
}) => {
  const getTaglineClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'text-lg md:text-xl text-muted-foreground font-medium';
      case 'minimal':
        return 'text-sm text-muted-foreground';
      default:
        return 'text-xl md:text-2xl font-headline font-bold text-vintage-red';
    }
  };

  return (
    <p className={cn(getTaglineClasses(), className)}>
      {BRAND_CONFIG.tagline}
    </p>
  );
};

interface BrandHeaderProps {
  showLogo?: boolean;
  showTagline?: boolean;
  logoSize?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  showLogo = true,
  showTagline = true,
  logoSize = 'lg',
  className
}) => {
  return (
    <div className={cn('text-center space-y-4', className)}>
      {showLogo && (
        <BrandLogo size={logoSize} variant="float" showText />
      )}
      <h1 className="text-4xl md:text-6xl font-headline font-bold text-vintage-red uppercase tracking-wider">
        {BRAND_CONFIG.name}
      </h1>
      {showTagline && <BrandTagline />}
    </div>
  );
};
