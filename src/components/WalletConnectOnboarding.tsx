
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wallet, CheckCircle, Star, Coffee, TrendingUp } from 'lucide-react';

interface WalletConnectOnboardingProps {
  onComplete: () => void;
  className?: string;
}

const WalletConnectOnboarding: React.FC<WalletConnectOnboardingProps> = ({
  onComplete,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const steps = [
    { title: 'Connect Wallet', description: 'Link your Web3 wallet to get started' },
    { title: 'Choose Interests', description: 'Pick topics you want to follow' },
    { title: 'Quick Tour', description: 'Learn how to earn $TEA and $SOAP' },
    { title: 'Start Spilling', description: 'Ready to share some tea!' }
  ];

  const interests = [
    { id: 'defi', label: 'DeFi Drama', emoji: '💰' },
    { id: 'nft', label: 'NFT Gossip', emoji: '🖼️' },
    { id: 'memecoins', label: 'Memecoin Madness', emoji: '🐕' },
    { id: 'ethereum', label: 'Ethereum News', emoji: '💎' },
    { id: 'solana', label: 'Solana Saga', emoji: '🌞' },
    { id: 'regulation', label: 'Regulatory Tea', emoji: '⚖️' },
    { id: 'exchanges', label: 'Exchange Drama', emoji: '🏦' },
    { id: 'influencers', label: 'Crypto Influencers', emoji: '📱' }
  ];

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep(1);
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <Card className="p-8 bg-gradient-to-br from-ctea-dark/90 to-ctea-darker/95 border-ctea-teal/30">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Welcome to CTea Newsroom!</h2>
            <Badge className="bg-ctea-teal text-white">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-ctea-dark/50" />
          <p className="text-gray-300 mt-2">{steps[currentStep].description}</p>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 0 && (
            <div className="text-center space-y-6">
              <Wallet className="w-16 h-16 text-ctea-teal mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
                <p className="text-gray-300 mb-6">
                  Connect your Web3 wallet to start earning $TEA tokens and building your $SOAP reputation.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-12"
                >
                  {isConnecting ? 'Connecting...' : '🦊 MetaMask'}
                </Button>
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  variant="outline"
                  className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10 h-12"
                >
                  🔗 WalletConnect
                </Button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Star className="w-12 h-12 text-ctea-yellow mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Choose Your Interests</h3>
                <p className="text-gray-300">
                  Select topics you're interested in to personalize your feed.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <Button
                    key={interest.id}
                    variant={selectedInterests.includes(interest.id) ? 'default' : 'outline'}
                    onClick={() => toggleInterest(interest.id)}
                    className={`h-12 flex items-center gap-2 ${
                      selectedInterests.includes(interest.id)
                        ? 'bg-gradient-ctea text-white'
                        : 'border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10'
                    }`}
                  >
                    <span className="text-lg">{interest.emoji}</span>
                    {interest.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Coffee className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">How CTea Works</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-ctea-teal/10 border border-ctea-teal/30">
                  <div className="text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <h4 className="font-bold text-white mb-2">$TEA Tokens</h4>
                    <p className="text-sm text-gray-300">
                      Earn by posting quality content, getting reactions, and engaging with the community.
                    </p>
                  </div>
                </Card>
                <Card className="p-4 bg-ctea-purple/10 border border-ctea-purple/30">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🛡️</div>
                    <h4 className="font-bold text-white mb-2">$SOAP Reputation</h4>
                    <p className="text-sm text-gray-300">
                      Build credibility by submitting verified content and participating in moderation.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <TrendingUp className="w-16 h-16 text-ctea-pink mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">You're All Set!</h3>
                <p className="text-gray-300 mb-6">
                  Ready to start spilling the hottest crypto tea? Your journey to becoming a trusted voice in Web3 begins now.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">☕</div>
                  <div className="text-sm text-gray-300">Submit Tea</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">🔥</div>
                  <div className="text-sm text-gray-300">React & Vote</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">🚀</div>
                  <div className="text-sm text-gray-300">Go Viral</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === 1 && selectedInterests.length === 0}
            className="bg-gradient-ctea text-white"
          >
            {currentStep === steps.length - 1 ? 'Start Spilling Tea!' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WalletConnectOnboarding;
