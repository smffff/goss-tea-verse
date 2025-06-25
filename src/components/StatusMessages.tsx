
import React from 'react';
import { CheckCircle, AlertCircle, Clock, Wifi, WifiOff, Zap } from 'lucide-react';

interface StatusMessageProps {
  type: 'success' | 'warning' | 'info' | 'loading' | 'offline' | 'online';
  message?: string;
  details?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
  details,
  showIcon = true,
  size = 'md'
}) => {
  const getStatusContent = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="text-green-500" />,
          bgColor: 'bg-green-500/10 border-green-500/30',
          textColor: 'text-green-600',
          defaultMessage: "Success! ✨",
          defaultDetails: "Mission accomplished with style!"
        };
      case 'warning':
        return {
          icon: <AlertCircle className="text-vintage-red" />,
          bgColor: 'bg-vintage-red/10 border-vintage-red/30',
          textColor: 'text-vintage-red',
          defaultMessage: "Hold Up! ⚠️",
          defaultDetails: "Something needs your attention, bestie."
        };
      case 'info':
        return {
          icon: <Zap className="text-neon-pink" />,
          bgColor: 'bg-neon-pink/10 border-neon-pink/30',
          textColor: 'text-neon-pink',
          defaultMessage: "Hot Tip! 💡",
          defaultDetails: "Some knowledge is about to be dropped."
        };
      case 'loading':
        return {
          icon: <Clock className="text-tabloid-black/60 animate-spin" />,
          bgColor: 'bg-tabloid-black/5 border-tabloid-black/20',
          textColor: 'text-tabloid-black/70',
          defaultMessage: "Brewing in Progress... ⏳",
          defaultDetails: "Good tea takes time to steep properly."
        };
      case 'offline':
        return {
          icon: <WifiOff className="text-vintage-red" />,
          bgColor: 'bg-vintage-red/10 border-vintage-red/30',
          textColor: 'text-vintage-red',
          defaultMessage: "Connection Lost! 📡",
          defaultDetails: "Even gossip networks go down sometimes. Check your internet!"
        };
      case 'online':
        return {
          icon: <Wifi className="text-green-500" />,
          bgColor: 'bg-green-500/10 border-green-500/30',
          textColor: 'text-green-600',
          defaultMessage: "Back Online! 🌐",
          defaultDetails: "Connection restored. Ready to spill more tea!"
        };
      default:
        return {
          icon: <AlertCircle className="text-tabloid-black/60" />,
          bgColor: 'bg-tabloid-black/5 border-tabloid-black/20',
          textColor: 'text-tabloid-black/70',
          defaultMessage: "Status Update",
          defaultDetails: "Something happened, but we're not sure what."
        };
    }
  };

  const content = getStatusContent();
  
  const sizeClasses = {
    sm: {
      container: 'p-3 text-sm',
      icon: 'w-4 h-4',
      title: 'text-sm font-medium',
      details: 'text-xs'
    },
    md: {
      container: 'p-4 text-base',
      icon: 'w-5 h-5',
      title: 'text-base font-medium',
      details: 'text-sm'
    },
    lg: {
      container: 'p-6 text-lg',
      icon: 'w-6 h-6',
      title: 'text-lg font-medium',
      details: 'text-base'
    }
  };

  return (
    <div className={`${content.bgColor} border rounded-lg ${sizeClasses[size].container} flex items-start gap-3`}>
      {showIcon && (
        <div className={`${sizeClasses[size].icon} flex-shrink-0 mt-0.5`}>
          {React.cloneElement(content.icon, { className: `${sizeClasses[size].icon} ${content.icon.props.className}` })}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <p className={`${content.textColor} ${sizeClasses[size].title} font-headline tracking-wide`}>
          {message || content.defaultMessage}
        </p>
        
        {(details || content.defaultDetails) && (
          <p className={`${content.textColor}/70 ${sizeClasses[size].details} mt-1 font-medium`}>
            {details || content.defaultDetails}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatusMessage;
