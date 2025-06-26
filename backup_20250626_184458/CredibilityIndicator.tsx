
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Star, Award, AlertTriangle } from 'lucide-react';

interface CredibilityIndicatorProps {
  soapScore: number;
  verificationLevel: 'none' | 'basic' | 'verified' | 'trusted' | 'legendary';
  evidenceStrength: number;
  communityTrust: number;
  className?: string;
}

const CredibilityIndicator: React.FC<CredibilityIndicatorProps> = ({
  soapScore,
  verificationLevel,
  evidenceStrength,
  communityTrust,
  className = ''
}) => {
  const getVerificationBadge = () => {
    switch (verificationLevel) {
      case 'legendary':
        return { icon: Award, label: 'Legendary', color: 'bg-ctea-yellow text-black', glow: 'shadow-yellow-400/50' };
      case 'trusted':
        return { icon: Shield, label: 'Trusted', color: 'bg-ctea-teal text-white', glow: 'shadow-ctea-teal/50' };
      case 'verified':
        return { icon: Star, label: 'Verified', color: 'bg-ctea-purple text-white', glow: 'shadow-ctea-purple/50' };
      case 'basic':
        return { icon: Shield, label: 'Basic', color: 'bg-ctea-pink text-white', glow: 'shadow-ctea-pink/50' };
      default:
        return { icon: AlertTriangle, label: 'Unverified', color: 'bg-gray-500 text-white', glow: 'shadow-gray-500/30' };
    }
  };

  const badge = getVerificationBadge();
  const BadgeIcon = badge.icon;

  const getCredibilityColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-ctea-teal to-ctea-purple';
    if (score >= 40) return 'from-ctea-yellow to-ctea-orange';
    return 'from-ctea-orange to-red-500';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Verification Badge */}
      <div className="flex items-center gap-2">
        <Badge className={`${badge.color} ${badge.glow} shadow-lg border-0`}>
          <BadgeIcon className="w-3 h-3 mr-1" />
          {badge.label}
        </Badge>
        <span className="text-sm text-gray-400">$SOAP: {soapScore}</span>
      </div>

      {/* Credibility Bars */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-300">Evidence Strength</span>
          <span className="text-white font-medium">{evidenceStrength}%</span>
        </div>
        <Progress 
          value={evidenceStrength} 
          className="h-1.5 bg-ctea-dark/50"
        />

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-300">Community Trust</span>
          <span className="text-white font-medium">{communityTrust}%</span>
        </div>
        <Progress 
          value={communityTrust} 
          className="h-1.5 bg-ctea-dark/50"
        />

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-300">Overall Credibility</span>
          <span className="text-white font-medium">{Math.round((evidenceStrength + communityTrust) / 2)}%</span>
        </div>
        <div className="h-2 bg-ctea-dark/50 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getCredibilityColor((evidenceStrength + communityTrust) / 2)} transition-all duration-500`}
            style={{ width: `${(evidenceStrength + communityTrust) / 2}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CredibilityIndicator;
