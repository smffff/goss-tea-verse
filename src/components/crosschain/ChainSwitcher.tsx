
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowUpDown, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { SUPPORTED_CHAINS } from '@/config/chainConfig';
import { useWallet } from '@/components/WalletProvider';
import { useCrossChain } from '@/contexts/CrossChainContext';

const ChainSwitcher: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { wallet, switchToAvalanche } = useWallet();
  const { crossChainUser, isCheckingOGStatus } = useCrossChain();

  const getCurrentChain = () => {
    if (wallet.chainId === SUPPORTED_CHAINS.avalanche.id) return 'avalanche';
    if (wallet.chainId === SUPPORTED_CHAINS.avalanche_testnet.id) return 'avalanche_testnet';
    return 'unknown';
  };

  const currentChain = getCurrentChain();
  const chainConfig = SUPPORTED_CHAINS[currentChain] || { name: 'Unknown', symbol: '?' };

  return (
    <Card className="bg-ctea-dark/80 border-ctea-teal/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-ctea-teal to-pink-400 rounded-full flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{chainConfig.name}</span>
                {crossChainUser?.ogStatus.isOG && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs">
                    OG {crossChainUser.ogStatus.tier.toUpperCase()}
                  </Badge>
                )}
              </div>
              <span className="text-gray-400 text-sm">{chainConfig.symbol}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isCheckingOGStatus && (
              <div className="animate-spin w-4 h-4 border-2 border-ctea-teal border-t-transparent rounded-full" />
            )}
            
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="sm"
              className="text-ctea-teal hover:bg-ctea-teal/10"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            <div className="text-xs text-gray-400 mb-2">Switch Networks:</div>
            
            <Button
              onClick={switchToAvalanche}
              disabled={currentChain === 'avalanche'}
              className="w-full justify-between bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              <span>Avalanche (OG $TEA)</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
            
            <Button
              disabled
              className="w-full justify-between bg-gradient-to-r from-purple-500/50 to-pink-500/50 text-white/70 cursor-not-allowed"
            >
              <span>Solana (Coming Soon)</span>
              <span className="text-xs">July 2024</span>
            </Button>

            {crossChainUser?.ogStatus.isOG && (
              <div className="mt-3 p-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg border border-yellow-400/30">
                <div className="text-xs text-yellow-400 font-medium mb-1">OG Benefits Active:</div>
                <div className="text-xs text-gray-300">
                  • Early Solana access • Exclusive content • Priority support
                </div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChainSwitcher;
