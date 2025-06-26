import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Crown, Settings, Share2 } from 'lucide-react';
import { useWallet } from '@/components/WalletProvider';
import { useCrossChain } from '@/contexts/CrossChainContext';
import { accessControlService, AccessLevel } from '@/services/accessControlService';
import { adminConfigService } from '@/services/adminConfigService';
import OGBadge from '@/components/OGBadge';
import BrandedTeacupIcon from '@/components/ui/BrandedTeacupIcon';
import CTeaBotGreeting from '@/components/onboarding/CTeaBotGreeting';
import CelebrationEffects from '@/components/effects/CelebrationEffects';
import { useCTeaBotInteractions } from '@/hooks/useCTeaBotInteractions';

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
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasTriggeredWelcome, setHasTriggeredWelcome] = useState(false);
  
  const { activeInteractions, triggerBotGreeting, dismissInteraction } = useCTeaBotInteractions();

  useEffect(() => {
    if (wallet.isConnected && wallet.address && crossChainUser?.ogStatus && !hasTriggeredWelcome) {
      const checkAccess = async () => {
        const access = await accessControlService.checkWalletAccess(wallet.address!);
        setAccessLevel(access);
        
        if (access.hasAccess) {
          // Trigger celebration and CTeaBot greeting
          setShowCelebration(true);
          triggerBotGreeting('wallet_connect', {
            walletType: wallet.walletType || 'unknown',
            teaBalance: access.teaBalance,
            ogTier: access.level
          });
          
          if (access.level !== 'none') {
            setTimeout(() => {
              triggerBotGreeting('og_unlock');
            }, 2000);
          }
          
          onAccessGranted(access);
          setHasTriggeredWelcome(true);
        }
      };
      checkAccess();
    }
  }, [wallet.isConnected, wallet.address, crossChainUser, onAccessGranted, hasTriggeredWelcome, triggerBotGreeting]);

  const handleWalletConnect = async (type: 'metamask' | 'core' | 'phantom') => {
    setIsConnecting(true);
    try {
      await connectWallet(type);
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleEnterApp = () => {
    navigate('/feed');
  };

  const handleShareStatus = () => {
    if (accessLevel && accessLevel.hasAccess) {
      const tweetText = `Just unlocked ${accessLevel.level.toUpperCase()} status on @CTeaNewsroom 🫖 Where crypto Twitter comes to spill. The tea is piping hot and I'm here for ALL the chaos ☕ #CTeaApp #OG${accessLevel.level}`;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(tweetUrl, '_blank');
    }
  };

  const getThresholdBadge = (amount: number) => {
    if (amount >= 1337) return { label: '1337+ LEGEND', color: 'from-yellow-400 to-orange-400' };
    if (amount >= 420) return { label: '420+ CONNOISSEUR', color: 'from-purple-400 to-pink-400' };
    if (amount >= 69) return { label: '69+ SIPPER', color: 'from-blue-400 to-teal-400' };
    return { label: 'NO ACCESS', color: 'from-gray-400 to-gray-500' };
  };

  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
    if (!showAdminPanel) {
      triggerBotGreeting('admin_mode');
    }
  };

  const handleAdminToggle = () => {
    adminConfigService.toggleAdminMode();
    window.location.reload();
  };

  if (wallet.isConnected && accessLevel?.hasAccess) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent">
              Welcome Back, OG! <BrandedTeacupIcon size="lg" variant="glowing" animated />
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
              <h3 className="text-white font-bold text-center flex items-center justify-center gap-2">
                <BrandedTeacupIcon size="md" variant="steaming" />
                Your OG Status
              </h3>
              
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Wallet Type:</span>
                  <span className="text-ctea-teal capitalize">{wallet.walletType}</span>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                <Button
                  onClick={handleShareStatus}
                  variant="outline"
                  size="sm"
                  className="border-pink-400/50 text-pink-400 hover:bg-pink-400/10"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share Status
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleEnterApp}
            className="bg-gradient-to-r from-ctea-teal to-pink-400 hover:from-ctea-teal/80 hover:to-pink-400/80 text-white font-bold text-lg px-8 py-4"
          >
            <BrandedTeacupIcon size="sm" className="mr-2" />
            Enter CTea Newsroom
          </Button>

          {/* Admin Controls */}
          {adminConfigService.isAdminMode() && (
            <Card className="bg-orange-500/20 border-orange-500/30 max-w-md mx-auto">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-2 text-orange-400">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-bold">ADMIN MODE ACTIVE</span>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* CTeaBot Interactions */}
        {activeInteractions.map((interaction) => (
          <CTeaBotGreeting
            key={interaction.id}
            trigger={interaction.trigger}
            userStatus={interaction.userStatus}
            onDismiss={() => dismissInteraction(interaction.id)}
          />
        ))}

        {/* Celebration Effects */}
        <CelebrationEffects 
          trigger={showCelebration}
          type="tea_particles"
          onComplete={() => setShowCelebration(false)}
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-ctea-teal via-pink-400 to-ctea-purple bg-clip-text text-transparent">
            We Don't Report the News.
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
            We Stir It. <BrandedTeacupIcon size="xl" variant="spilling" animated />
          </h2>
          
          <div className="inline-block">
            <Badge className="bg-gradient-to-r from-ctea-teal to-pink-400 text-black font-bold text-lg px-6 py-2">
              CTea NEWSROOM - EARLY ACCESS
            </Badge>
          </div>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect your wallet to check $TEA balance and unlock the chaos.
          </p>
        </div>

        {/* Token Threshold Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { amount: 69, label: 'SIPPER', icon: BrandedTeacupIcon, desc: 'Basic access + early features' },
            { amount: 420, label: 'CONNOISSEUR', icon: Zap, desc: 'Exclusive content + priority' },
            { amount: 1337, label: 'LEGEND', icon: Crown, desc: 'Full VIP + governance power' }
          ].map((tier) => {
            const badge = getThresholdBadge(tier.amount);
            const IconComponent = tier.icon;
            
            return (
              <Card key={tier.amount} className="bg-ctea-dark/60 border-ctea-teal/20">
                <CardContent className="p-4 text-center">
                  {tier.icon === BrandedTeacupIcon ? (
                    <BrandedTeacupIcon size="lg" variant="steaming" className="mx-auto mb-2" />
                  ) : (
                    <IconComponent className="w-8 h-8 mx-auto mb-2 text-ctea-teal" />
                  )}
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
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Button
              onClick={() => handleWalletConnect('metamask')}
              disabled={isConnecting || isCheckingOGStatus}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4"
            >
              <BrandedTeacupIcon size="sm" className="mr-2" />
              {isConnecting ? 'Connecting...' : 'MetaMask'}
            </Button>
            
            <Button
              onClick={() => handleWalletConnect('core')}
              disabled={isConnecting || isCheckingOGStatus}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4"
            >
              <BrandedTeacupIcon size="sm" className="mr-2" />
              {isConnecting ? 'Connecting...' : 'Core/Avalanche'}
            </Button>

            <Button
              onClick={() => handleWalletConnect('phantom')}
              disabled={isConnecting || isCheckingOGStatus}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-4"
            >
              <BrandedTeacupIcon size="sm" className="mr-2" />
              {isConnecting ? 'Connecting...' : 'Phantom'}
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
                <BrandedTeacupIcon size="xs" className="mr-1" />
                Spill Some Tea
              </Button>
            </div>
          </div>

          {/* Admin Access */}
          <div className="mt-8">
            <Button
              onClick={toggleAdminPanel}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-400"
            >
              <Settings className="w-4 h-4 mr-1" />
              Admin
            </Button>
            
            {showAdminPanel && (
              <Card className="bg-ctea-darker/90 border-gray-600/30 max-w-sm mx-auto mt-4">
                <CardContent className="p-4 space-y-3">
                  <h4 className="text-white font-bold text-center">Admin Controls</h4>
                  <div className="space-y-2">
                    <Button
                      onClick={handleAdminToggle}
                      variant="outline"
                      size="sm"
                      className={`w-full ${adminConfigService.isAdminMode() 
                        ? 'border-red-500/50 text-red-400' 
                        : 'border-green-500/50 text-green-400'
                      }`}
                    >
                      {adminConfigService.isAdminMode() ? 'Disable Admin Mode' : 'Enable Admin Mode'}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Admin mode bypasses all token requirements
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 max-w-md mx-auto">
          <BrandedTeacupIcon size="xs" className="inline mr-1" />
          Hold 69+ $TEA for instant access. Or charm us with bribes and gossip.
          <br />
          <span className="text-gray-600">Admin access: ?admin=ctea2024</span>
        </div>
      </motion.div>

      {/* CTeaBot Interactions */}
      {activeInteractions.map((interaction) => (
        <CTeaBotGreeting
          key={interaction.id}
          trigger={interaction.trigger}
          userStatus={interaction.userStatus}
          onDismiss={() => dismissInteraction(interaction.id)}
        />
      ))}
    </>
  );
};

export default WalletGatedHero;
