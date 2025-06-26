
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Star, Zap, Share2, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCrossChain } from '@/contexts/CrossChainContext';
import { useToast } from '@/hooks/use-toast';

const OGStatusCard: React.FC = () => {
  const { crossChainUser, isCheckingOGStatus, createOGShareLink, getOGPerks } = useCrossChain();
  const { toast } = useToast();

  if (!crossChainUser?.ogStatus.isOG) return null;

  const { ogStatus } = crossChainUser;
  const perks = getOGPerks();

  const getTierIcon = () => {
    switch (ogStatus.tier) {
      case 'legend': return <Crown className="w-5 h-5 text-yellow-400" />;
      case 'connoisseur': return <Star className="w-5 h-5 text-purple-400" />;
      case 'sipper': return <Zap className="w-5 h-5 text-blue-400" />;
      default: return null;
    }
  };

  const getTierGradient = () => {
    switch (ogStatus.tier) {
      case 'legend': return 'from-yellow-400 to-orange-400';
      case 'connoisseur': return 'from-purple-400 to-pink-400';
      case 'sipper': return 'from-blue-400 to-teal-400';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const handleShare = () => {
    const shareLink = createOGShareLink();
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "OG Status Shared! 🎉",
      description: "Link copied to clipboard. Show off your OG status!",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-6"
    >
      <Card className={`bg-gradient-to-br ${getTierGradient()}/20 border-${ogStatus.tier === 'legend' ? 'yellow' : ogStatus.tier === 'connoisseur' ? 'purple' : 'blue'}-400/30`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getTierIcon()}
              <span className="text-white">OG {ogStatus.tier.toUpperCase()}</span>
              <Badge className={`bg-gradient-to-r ${getTierGradient()} text-black`}>
                Verified
              </Badge>
            </div>
            <Button
              onClick={handleShare}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-300">Avalanche Balance</div>
              <div className="text-xl font-bold text-white">
                {ogStatus.balance.toLocaleString()} $TEA
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Airdrop Status</div>
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">Eligible</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-300">OG Perks:</div>
            <div className="grid grid-cols-2 gap-1">
              {perks.map((perk) => (
                <div key={perk} className="text-xs text-white/80 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-ctea-teal rounded-full"></div>
                  {perk.replace('_', ' ').toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <div className="text-xs text-gray-400">
              Ready for Solana Summer Shores • Airdrop countdown: July 2024
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OGStatusCard;
