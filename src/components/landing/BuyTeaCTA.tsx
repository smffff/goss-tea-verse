import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Copy, Zap, Twitter, Trophy, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const BuyTeaCTA: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);
  const { toast } = useToast();

  // Contract address - replace with actual $TEA contract
  const TEA_CONTRACT = "0x32ae402ce8a388a3f27a8668ad33bcf4cab4fadb";
  
  // Affiliate links - replace with your actual affiliate codes
  const AFFILIATE_LINKS = {
    arena: "https://arena.app/coin/tea?ref=cteanews",
    twitter: "https://twitter.com/cteanews",
    arenaHome: "https://arena.app?ref=cteanews",
    dexscreener: "https://dexscreener.com/avalanche/0x116594bd6eb7c16570413e1ccc36f1fed38c0dff"
  };

  const handleRevealBuyOptions = () => {
    setIsRevealed(true);
    toast({
      title: "🚀 Buy Options Unlocked!",
      description: "Time to stack some $TEA and join the chaos",
    });
  };

  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(TEA_CONTRACT);
      setCopiedContract(true);
      toast({
        title: "📋 Contract Copied!",
        description: "Paste it in your wallet to add $TEA token",
      });
      setTimeout(() => setCopiedContract(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy manually: " + TEA_CONTRACT,
        variant: "destructive"
      });
    }
  };

  const openAffiliate = (platform: keyof typeof AFFILIATE_LINKS) => {
    window.open(AFFILIATE_LINKS[platform], '_blank', 'noopener,noreferrer');
    toast({
      title: `Opening ${platform}...`,
      description: "Thanks for using our affiliate link! 💚",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!isRevealed ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-[#00d1c1]/20 to-[#ff61a6]/20 border-2 border-[#00d1c1]/50 relative overflow-hidden">
            <CardContent className="p-8">
              {/* Pulsing background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00d1c1]/10 to-[#ff61a6]/10"
                animate={{
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <div className="text-6xl mb-4">🫖</div>
                <h3 className="text-3xl font-bold text-white mb-4"
                    style={{ fontFamily: "'Luckiest Guy', cursive" }}>
                  Ready to Stack $TEA?
                </h3>
                <p className="text-lg text-white/80 mb-6">
                  Join the chaos on AVAX and start earning those meme gains
                </p>
                
                <Button
                  onClick={handleRevealBuyOptions}
                  className="bg-gradient-to-r from-[#ff61a6] to-[#00d1c1] hover:from-[#00d1c1] hover:to-[#ff61a6] text-white text-xl px-8 py-4 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Zap className="mr-3 w-6 h-6" />
                  Reveal Buy Options
                  <Coins className="ml-3 w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Main Buy Options */}
            <Card className="bg-gradient-to-br from-[#00d1c1]/20 to-[#ff61a6]/20 border-2 border-[#00d1c1]/50">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                  <Coins className="w-6 h-6 text-[#00d1c1]" />
                  Buy $TEA on AVAX
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Button
                    onClick={() => openAffiliate('arena')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 text-lg"
                  >
                    <Trophy className="mr-3 w-5 h-5" />
                    Buy on Arena
                    <ExternalLink className="ml-3 w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => openAffiliate('arenaHome')}
                    variant="outline"
                    className="border-2 border-[#00d1c1] text-[#00d1c1] hover:bg-[#00d1c1] hover:text-black font-bold py-4 text-lg"
                  >
                    <Trophy className="mr-3 w-5 h-5" />
                    Explore Arena
                    <ExternalLink className="ml-3 w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => openAffiliate('dexscreener')}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 text-lg md:col-span-2"
                  >
                    📈 View $TEA Chart (AVAX)
                    <ExternalLink className="ml-3 w-4 h-4" />
                  </Button>
                </div>

                {/* Contract Address */}
                <div className="bg-black/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">$TEA Contract Address:</div>
                      <div className="font-mono text-white text-sm break-all">
                        {TEA_CONTRACT}
                      </div>
                    </div>
                    <Button
                      onClick={copyContract}
                      size="sm"
                      variant="outline"
                      className={`ml-4 ${copiedContract ? 'bg-green-500 text-white' : ''}`}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedContract ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={() => openAffiliate('twitter')}
                    variant="outline"
                    className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    <Twitter className="mr-2 w-4 h-4" />
                    @cteanews
                    <ExternalLink className="ml-2 w-3 h-3" />
                  </Button>
                  
                  <Badge className="bg-[#00d1c1]/20 text-[#00d1c1] border-[#00d1c1]/50">
                    💚 Affiliate Links - Thanks for the support!
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Meme Call to Action */}
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50">
              <CardContent className="p-4 text-center">
                <p className="text-white font-bold mb-2">
                  🔥 Not financial advice, just pure chaos energy 🔥
                </p>
                <p className="text-sm text-white/80">
                  Stack $TEA → Spill Tea → Earn Clout → Repeat
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default BuyTeaCTA;
