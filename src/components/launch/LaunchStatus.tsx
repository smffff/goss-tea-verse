
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface LaunchStatusProps {
  status: 'beta' | 'launching' | 'live';
  userCount?: number;
  spillCount?: number;
}

const LaunchStatus: React.FC<LaunchStatusProps> = ({ 
  status, 
  userCount = 0, 
  spillCount = 0 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'beta':
        return {
          icon: Clock,
          color: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
          label: 'Beta Access',
          description: 'Exclusive early access for beta users'
        };
      case 'launching':
        return {
          icon: AlertCircle,
          color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
          label: 'Launching Soon',
          description: 'Final preparations underway'
        };
      case 'live':
        return {
          icon: CheckCircle,
          color: 'bg-green-500/10 text-green-500 border-green-500/30',
          label: 'Live Now',
          description: 'Fully operational and ready'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card className="bg-ctea-dark/50 border-ctea-teal/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-full ${config.color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <Badge className={config.color}>
              {config.label}
            </Badge>
            <p className="text-sm text-gray-400 mt-1">
              {config.description}
            </p>
          </div>
        </div>

        {(userCount > 0 || spillCount > 0) && (
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-ctea-teal/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-ctea-teal">{userCount}</p>
              <p className="text-xs text-gray-400">Beta Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-400">{spillCount}</p>
              <p className="text-xs text-gray-400">Tea Spilled</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LaunchStatus;
