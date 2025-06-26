
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, Sparkles } from 'lucide-react';
import { track } from '@/utils/analytics';

interface User {
  user_metadata?: {
    subscription_tier?: string;
  };
}

interface PremiumFeatureGateProps {
  children: React.ReactNode;
  featureName: string;
  description: string;
  requiredTier: 'basic' | 'premium' | 'pro';
  onUpgrade: () => void;
  className?: string;
  user?: User | null;
}

const PremiumFeatureGate: React.FC<PremiumFeatureGateProps> = ({
  children,
  featureName,
  description,
  requiredTier,
  onUpgrade,
  className = '',
  user = null
}) => {
  // Check if user has required tier
  const hasAccess = user?.user_metadata?.subscription_tier === requiredTier || 
                   user?.user_metadata?.subscription_tier === 'pro';

  const handleUpgradeClick = () => {
    track('premium_upgrade_prompt', {
      feature: featureName,
      required_tier: requiredTier,
      current_tier: user?.user_metadata?.subscription_tier || 'none'
    });
    onUpgrade();
  };

  if (hasAccess) {
    return <div className={className}>{children}</div>;
  }

  const tierInfo = {
    basic: { icon: Sparkles, color: 'from-blue-500 to-cyan-500', price: '$4.99' },
    premium: { icon: Crown, color: 'from-purple-500 to-pink-500', price: '$9.99' },
    pro: { icon: Lock, color: 'from-orange-500 to-red-500', price: '$19.99' }
  };

  const { icon: TierIcon, color, price } = tierInfo[requiredTier];

  return (
    <Card className={`p-6 bg-gradient-to-br ${color} text-white ${className}`}>
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <TierIcon className="w-12 h-12" />
        </div>
        
        <div>
          <Badge className="bg-white/20 text-white mb-2">
            {requiredTier.toUpperCase()} FEATURE
          </Badge>
          <h3 className="text-xl font-bold mb-2">{featureName}</h3>
          <p className="text-white/90 mb-4">{description}</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm mb-2">Upgrade to unlock:</p>
          <ul className="text-sm space-y-1 text-left">
            <li>• {featureName}</li>
            <li>• Advanced tea analytics</li>
            <li>• Priority support</li>
            <li>• Ad-free experience</li>
          </ul>
        </div>

        <Button
          onClick={handleUpgradeClick}
          className="bg-white text-gray-900 hover:bg-gray-100 font-bold w-full"
        >
          Upgrade to {requiredTier} - {price}/month
        </Button>
      </div>
    </Card>
  );
};

export default PremiumFeatureGate;
