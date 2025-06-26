
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TestTube } from 'lucide-react';

interface BetaDisclaimerProps {
  variant?: 'banner' | 'inline' | 'compact';
  className?: string;
}

const BetaDisclaimer: React.FC<BetaDisclaimerProps> = ({ 
  variant = 'banner', 
  className = '' 
}) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 text-xs text-yellow-400 ${className}`}>
        <TestTube className="w-3 h-3" />
        <span>BETA</span>
        <span className="text-gray-500">|</span>
        <span>NFA</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          <TestTube className="w-3 h-3 mr-1" />
          BETA
        </Badge>
        <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30">
          <AlertTriangle className="w-3 h-3 mr-1" />
          NFA
        </Badge>
      </div>
    );
  }

  return (
    <Alert className={`bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-yellow-400" />
          <AlertTriangle className="w-5 h-5 text-orange-400" />
        </div>
        <AlertDescription className="text-white">
          <div className="space-y-1">
            <div className="font-semibold flex items-center gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                BETA VERSION
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30">
                NOT FINANCIAL ADVICE
              </Badge>
            </div>
            <p className="text-gray-300 text-sm">
              This platform is in beta testing. All content is for entertainment purposes only and should not be considered financial advice. 
              Always do your own research (DYOR) before making any investment decisions.
            </p>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default BetaDisclaimer;
