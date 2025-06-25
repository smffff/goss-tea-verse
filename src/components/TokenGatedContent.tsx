import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, Star, Zap } from 'lucide-react';
import { useWallet } from '@/components/WalletProvider';

interface TokenGatedContentProps {
  requiredTea?: number;
  requiredSoap?: number;
  children: React.ReactNode;
  contentType: 'premium' | 'exclusive' | 'mod' | 'legendary';
  title: string;
  description: string;
  className?: string;
}

const TokenGatedContent: React.FC<TokenGatedContentProps> = ({
  requiredTea = 0,
  requiredSoap = 0,
  children,
  contentType,
  title,
  description,
  className = ''
}) => {
  const { wallet, connectWallet } = useWallet();

  const hasAccess = () => {
    if (!wallet.isConnected) return false;
    
    const teaBalance = parseInt(wallet.balance.tea);
    const soapBalance = parseInt(wallet.balance.soap);
    
    return teaBalance >= requiredTea && soapBalance >= requiredSoap;
  };

  const getContentTypeInfo = () => {
    switch (contentType) {
      case 'premium':
        return { 
          icon: Star, 
          color: 'from-ctea-yellow to-ctea-orange',
          badge: 'Premium',
          emoji: '⭐'
        };
      case 'exclusive':
        return { 
          icon: Crown, 
          color: 'from-ctea-purple to-ctea-pink',
          badge: 'Exclusive',
          emoji: '👑'
        };
      case 'mod':
        return { 
          icon: Lock, 
          color: 'from-ctea-teal to-ctea-purple',
          badge: 'Moderator',
          emoji: '🛡️'
        };
      case 'legendary':
        return { 
          icon: Zap, 
          color: 'from-yellow-400 to-orange-500',
          badge: 'Legendary',
          emoji: '⚡'
        };
      default:
        return { 
          icon: Lock, 
          color: 'from-gray-500 to-gray-600',
          badge: 'Locked',
          emoji: '🔒'
        };
    }
  };

  const typeInfo = getContentTypeInfo();
  const TypeIcon = typeInfo.icon;

  if (hasAccess()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Card className={`p-6 bg-gradient-to-br ${typeInfo.color} opacity-90 border-0 ${className}`}>
      <div className="text-center space-y-4">
        {/* Lock Icon & Badge */}
        <div className="flex flex-col items-center gap-2">
          <TypeIcon className="w-12 h-12 text-white" />
          <Badge className="bg-white/20 text-white border-0">
            {typeInfo.emoji} {typeInfo.badge} Content
          </Badge>
        </div>

        {/* Content Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/80 mb-4">{description}</p>
        </div>

        {/* Requirements */}
        <div className="space-y-3">
          <div className="text-sm text-white/90">Requirements to unlock:</div>
          <div className="flex justify-center gap-4">
            {requiredTea > 0 && (
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <span className="text-lg">💰</span>
                <span className="text-white font-medium">{requiredTea} $TEA</span>
              </div>
            )}
            {requiredSoap > 0 && (
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <span className="text-lg">🛡️</span>
                <span className="text-white font-medium">{requiredSoap} $SOAP</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {!wallet.isConnected ? (
            <Button 
              onClick={() => connectWallet('metamask')}
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold"
            >
              Connect Wallet to Access
            </Button>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-white/80">
                Current Balance: {wallet.balance.tea} $TEA, {wallet.balance.soap} $SOAP
              </div>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Earn More Tokens
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TokenGatedContent;
