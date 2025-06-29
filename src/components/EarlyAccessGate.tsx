
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Coins, Zap, Gift } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useTeaToken } from '@/hooks/useTeaToken';

interface EarlyAccessGateProps {
  children: React.ReactNode;
  requiredTeaAmount?: number;
  fallbackContent?: React.ReactNode;
}

const EarlyAccessGate: React.FC<EarlyAccessGateProps> = ({
  children,
  requiredTeaAmount = 1000,
  fallbackContent
}) => {
  const { isConnected, connect } = useWallet();
  const { earlyAccessStatus, isLoading } = useTeaToken();

  // Check for demo mode access first
  const hasDemoAccess = localStorage.getItem('ctea-demo-mode') === 'true';
  const hasBetaAccess = localStorage.getItem('ctea-beta-access') === 'true';

  if (hasDemoAccess || hasBetaAccess) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ctea-teal"></div>
      </div>
    );
  }

  if (earlyAccessStatus.hasAccess) {
    return <>{children}</>;
  }

  if (fallbackContent) {
    return <>{fallbackContent}</>;
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-ctea-purple/20 to-ctea-teal/20 border-ctea-teal/30">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Crown className="w-16 h-16 text-ctea-yellow" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Early Access Required</h2>
          <p className="text-gray-300">
            Get exclusive access to premium features by holding $TEA tokens or trying demo mode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-ctea-dark/50 rounded-lg p-4">
            <Coins className="w-8 h-8 text-ctea-teal mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Hold $TEA</h3>
            <p className="text-sm text-gray-400 mb-2">
              Need {requiredTeaAmount.toLocaleString()} $TEA tokens
            </p>
            <Badge variant="outline" className="text-ctea-teal border-ctea-teal">
              {earlyAccessStatus.currentAmount.toLocaleString()} / {requiredTeaAmount.toLocaleString()}
            </Badge>
          </div>

          <div className="bg-ctea-dark/50 rounded-lg p-4">
            <Gift className="w-8 h-8 text-ctea-pink mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Demo Mode</h3>
            <p className="text-sm text-gray-400 mb-2">
              Try the platform with sample data
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="border-ctea-pink text-ctea-pink hover:bg-ctea-pink/10"
              onClick={() => {
                localStorage.setItem('ctea-demo-mode', 'true');
                window.location.reload();
              }}
            >
              Try Demo
            </Button>
          </div>

          <div className="bg-ctea-dark/50 rounded-lg p-4">
            <Zap className="w-8 h-8 text-ctea-yellow mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Beta Code</h3>
            <p className="text-sm text-gray-400 mb-2">
              Use an exclusive beta code
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="border-ctea-yellow text-ctea-yellow hover:bg-ctea-yellow/10"
              onClick={() => {
                localStorage.setItem('ctea-beta-access', 'true');
                window.location.reload();
              }}
            >
              Use Code
            </Button>
          </div>
        </div>

        {!isConnected && (
          <div className="pt-4">
            <Button 
              onClick={connect}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple text-white"
            >
              Connect Wallet to Check Access
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EarlyAccessGate;
