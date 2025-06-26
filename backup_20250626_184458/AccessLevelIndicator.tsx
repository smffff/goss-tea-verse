
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Eye, User, Crown, Shield } from 'lucide-react';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';

interface AccessLevelIndicatorProps {
  level: 'guest' | 'authenticated' | 'beta' | 'admin';
  size?: 'sm' | 'md' | 'lg';
}

const AccessLevelIndicator: React.FC<AccessLevelIndicatorProps> = ({ level, size = 'md' }) => {
  const levelConfig = {
    guest: {
      icon: Eye,
      label: 'Sneak Peek',
      description: '5-minute preview • Limited access',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30'
    },
    authenticated: {
      icon: User,
      label: 'Full Access',
      description: 'Complete experience • All features',
      gradient: 'from-ctea-teal to-blue-500',
      bgColor: 'bg-ctea-teal/20',
      borderColor: 'border-ctea-teal/30'
    },
    beta: {
      icon: Crown,
      label: 'Beta Access',
      description: 'Exclusive features • Early access',
      gradient: 'from-pink-400 to-purple-500',
      bgColor: 'bg-pink-400/20',
      borderColor: 'border-pink-400/30'
    },
    admin: {
      icon: Shield,
      label: 'Admin Access',
      description: 'Management tools • Full control',
      gradient: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30'
    }
  };

  const config = levelConfig[level];
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs p-2',
    md: 'text-sm p-3',
    lg: 'text-base p-4'
  };

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg ${sizeClasses[size]} text-center`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <IconComponent className="w-5 h-5 text-white" />
        <BrandedTeacupIcon size="sm" />
      </div>
      <Badge className={`bg-gradient-to-r ${config.gradient} text-white font-bold mb-2`}>
        {config.label}
      </Badge>
      <p className="text-gray-300 text-xs">{config.description}</p>
    </div>
  );
};

export default AccessLevelIndicator;
