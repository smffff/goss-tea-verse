
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Coffee, Zap, Crown } from 'lucide-react';
import { useWallet } from '@/components/WalletProvider';
import { useCrossChain } from '@/contexts/CrossChainContext';
import { accessControlService, AccessLevel } from '@/services/accessControlService';
import OGBadge from '@/components/OGBadge';

interface WalletGatedHeroProps {
  onAccessGranted: (accessLevel: AccessLevel) => void;
  onShowBribe: () => void;
  onShowSpill: () => void;
}

const WalletGatedHero: React.FC<WalletGatedHeroProps> = ({
  onAccessGranted,
  onShowBribe,
  onShowSpill
}) => {
  const navigate = useNavigate();
  const { wallet, connectWallet } = useWallet();
  const { crossChainUser, isCheckingOGStatus } = useCrossChain();
  const [accessLevel, setAccessLevel] = useState<AccessLevel | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (wallet.isConnected && wallet.address && crossChainUser?.ogStatus) {
      const checkAccess = async () => {
        const access = await accessControlService.checkWalletAccess(wallet.address!);
        setAccessLevel(access);
        if (access.hasAccess) {
          onAccessGranted(access);
        }
      };
      checkAccess();
    }
  }, [wallet.isConnected, wallet.address, crossChainUser, onAccessGranted]);

  const handleWalletConnect = async (type: 'metamask' | 'core') => {
    setIsConnecting(true);
    try {
      await connectWallet(type);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleEnterApp = () => {
    navigate('/feed');
  };

  const getThresholdBadge = (amount: number) => {
    if (amount >= 1337) return { label: '1337+ LEGEND', color: 'from-yellow-400 to-orange-400' };
    if (amount >= 420) return { label: '420+ CONNOISSEUR', color: 'from-purple-400 to-pink-400' };
    if (amount >= 69) return { label: '69+ SIPPER', color: 'from-blue-400 to-teal-400' };
    return { label: 'NO ACCESS', color: 'from-gray-400 to-gray-500' };
  };

  if (wallet.isConnected && accessLevel?.hasAccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent">
            Welcome Back, OG! 🫖
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {accessControlService.getAccessMessage(accessLevel)}
          </p>

          <div className="flex justify-center">
            <OGBadge size="lg" animated={true} />
          </div>
        </div>

        <Card className="bg-ctea-dark/80 border-ctea-teal/30 max-w-md mx-auto">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-white font-bold text-center">Your OG Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">$TEA Balance:</span>
                <span className="text-ctea-teal font-mono">{accessLevel.teaBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Access Level:</span>
                <span className="text-white font-semibold">{accessLevel.level.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Perks Active:</span>
                <span className="text-green-400">{accessLevel.perks.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleEnterApp}
          className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white font-bold text-lg px-8 py-4"
        >
          <Coffee className="w-5 h-5 mr-2" />
          Enter the Tea Room
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      <div className="space-y-4">
        <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent">
          We Don't Report the News.
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          We Stir It. 🫖
        </h2>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Prove your TEA: Connect wallet to unlock the party.
        </p>
      </div>

      {/* Token Threshold Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {[
          { amount: 69, label: 'SIPPER', icon: Coffee, desc: 'Basic access + early features' },
          { amount: 420, label: 'CONNOISSEUR', icon: Zap, desc: 'Exclusive content + priority' },
          { amount: 1337, label: 'LEGEND', icon: Crown, desc: 'Full VIP + governance power' }
        ].map((tier) => {
          const badge = getThresholdBadge(tier.amount);
          const Icon = tier.icon;
          
          return (
            <Card key={tier.amount} className="bg-ctea-dark/60 border-ctea-teal/20">
              <CardContent className="p-4 text-center">
                <Icon className="w-8 h-8 mx-auto mb-2 text-ctea-teal" />
                <Badge className={`bg-gradient-to-r ${badge.color} text-black font-bold mb-2`}>
                  {tier.amount}+ $TEA
                </Badge>
                <h4 className="text-white font-bold">{tier.label}</h4>
                <p className="text-xs text-gray-400">{tier.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Wallet Connect Buttons */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Button
            onClick={() => handleWalletConnect('metamask')}
            disabled={isConnecting || isCheckingOGStatus}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4"
          >
            <Wallet className="w-5 h-5 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
          </Button>
          
          <Button
            onClick={() => handleWalletConnect('core')}
            disabled={isConnecting || isCheckingOGStatus}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4"
          >
            <Wallet className="w-5 h-5 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect Core/Avalanche'}
          </Button>
        </div>

        {/* Alternative Access Methods */}
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">No $TEA tokens? No problem!</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={onShowBribe}
              variant="outline"
              className="border-pink-400/50 text-pink-400 hover:bg-pink-400/10"
            >
              💸 Bribe the Devs
            </Button>
            <Button
              onClick={onShowSpill}
              variant="outline"
              className="border-ctea-teal/50 text-ctea-teal hover:bg-ctea-teal/10"
            >
              🫖 Spill Some Tea
            </Button>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 max-w-md mx-auto">
        💡 Hold 69+ $TEA for instant access. Or charm us with bribes and gossip.
      </div>
    </motion.div>
  );
};

export default WalletGatedHero;
