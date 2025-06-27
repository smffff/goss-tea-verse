
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Coffee, 
  Flame, 
  Shield, 
  Zap, 
  Star, 
  TrendingUp,
  Users,
  MessageCircle,
  Crown,
  Sparkles
} from 'lucide-react';
import AccessModal from './AccessModal';
import { useToast } from '@/hooks/use-toast';
import type { AccessLevel } from '@/components/access/AccessControlProvider';

interface EnhancedLandingPageProps {
  onAccessGranted: (level: AccessLevel) => void;
}

const EnhancedLandingPage: React.FC<EnhancedLandingPageProps> = ({ onAccessGranted }) => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const { toast } = useToast();

  const handleAccessGranted = () => {
    onAccessGranted('beta');
    setShowAccessModal(false);
  };

  const handleShowBribe = () => {
    toast({
      title: "Coming Soon! 💰",
      description: "Bribe features are being developed. Stay tuned!",
    });
  };

  const handleShowSpill = () => {
    setShowAccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ctea-teal/20 to-ctea-purple/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coffee className="w-8 h-8 text-ctea-teal" />
              <span className="text-3xl font-bold bg-gradient-to-r from-ctea-teal to-ctea-purple bg-clip-text text-transparent">
                CTea
              </span>
              <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
                Beta
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Spill the Tea<br />
              <span className="bg-gradient-to-r from-ctea-teal to-ctea-purple bg-clip-text text-transparent">
                Earn Rewards
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The hottest crypto gossip platform where your tea spills earn you real rewards. 
              Share anonymous insights, react to hot takes, and climb the leaderboards.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleShowSpill}
                size="lg"
                className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white px-8 py-3 text-lg font-semibold"
              >
                <Flame className="w-5 h-5 mr-2" />
                Start Spilling Tea
              </Button>
              <Button
                onClick={handleShowBribe}
                size="lg"
                variant="outline"
                className="border-ctea-purple text-ctea-purple hover:bg-ctea-purple/10 px-8 py-3 text-lg font-semibold"
              >
                <Crown className="w-5 h-5 mr-2" />
                Bribe for Access
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-ctea-dark/60 border-ctea-teal/30 hover:border-ctea-teal/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-ctea-teal" />
                <h3 className="text-xl font-bold text-white">Real Rewards</h3>
              </div>
              <p className="text-gray-300">
                Earn $TEA tokens for quality spills, reactions, and community engagement. 
                Your gossip has value!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/60 border-ctea-purple/30 hover:border-ctea-purple/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-ctea-purple" />
                <h3 className="text-xl font-bold text-white">Anonymous & Safe</h3>
              </div>
              <p className="text-gray-300">
                Spill tea without revealing your identity. Advanced security keeps your secrets safe.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-ctea-dark/60 border-ctea-teal/30 hover:border-ctea-teal/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-ctea-teal" />
                <h3 className="text-xl font-bold text-white">Trending Topics</h3>
              </div>
              <p className="text-gray-300">
                Stay on top of the hottest crypto drama and market-moving gossip in real-time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Access Modal */}
      <AccessModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        onAccessGranted={handleAccessGranted}
      />
    </div>
  );
};

export default EnhancedLandingPage;
