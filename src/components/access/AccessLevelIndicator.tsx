
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, Lock, Shield } from 'lucide-react';

interface AccessLevelIndicatorProps {
  level: 'guest' | 'authenticated' | 'beta' | 'admin';
  className?: string;
}

const AccessLevelIndicator: React.FC<AccessLevelIndicatorProps> = ({ 
  level, 
  className = '' 
}) => {
  const configs = {
    guest: {
      icon: Users,
      text: 'Guest Access',
      color: 'bg-gray-500 text-white',
      description: 'Limited access to public content'
    },
    authenticated: {
      icon: Shield,
      text: 'Authenticated',
      color: 'bg-green-500 text-white',
      description: 'Full access to platform features'
    },
    beta: {
      icon: Crown,
      text: 'Beta Access',
      color: 'bg-ctea-purple text-white',
      description: 'Early access to premium features'
    },
    admin: {
      icon: Lock,
      text: 'Admin',
      color: 'bg-red-500 text-white',
      description: 'Full administrative privileges'
    }
  };

  const config = configs[level];
  const Icon = config.icon;

  return (
    <div className={`space-y-2 ${className}`}>
      <Badge className={config.color}>
        <Icon className="w-4 h-4 mr-2" />
        {config.text}
      </Badge>
      <p className="text-sm text-gray-400">{config.description}</p>
    </div>
  );
};

export default AccessLevelIndicator;
