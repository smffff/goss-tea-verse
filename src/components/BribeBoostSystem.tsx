
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserProgression } from '@/hooks/useUserProgression';

interface BribeBoostSystemProps {
  submissionId: string;
  currentBoost: number;
  onBoostUpdated: (newBoost: number) => void;
}

const BribeBoostSystem: React.FC<BribeBoostSystemProps> = ({
  submissionId,
  currentBoost,
  onBoostUpdated
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [boostAmount, setBoostAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { progression, addTeaPoints } = useUserProgression();

  const boostTiers = [
    { amount: 10, multiplier: 1.5, label: 'Small Boost' },
    { amount: 25, multiplier: 2.0, label: 'Medium Boost' },
    { amount: 50, multiplier: 3.0, label: 'Large Boost' },
    { amount: 100, multiplier: 5.0, label: 'Mega Boost' }
  ];

  const handleBoost = async (amount: number) => {
    if (progression.tea_points < amount) {
      toast({
        title: "Insufficient $TEA",
        description: `You need ${amount} $TEA tokens to boost this submission.`,
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate boost transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Deduct TEA points
      await addTeaPoints(-amount);
      
      // Update boost score
      const newBoost = currentBoost + amount;
      onBoostUpdated(newBoost);
      
      toast({
        title: "Boost Successful! 🚀",
        description: `Boosted submission with ${amount} $TEA tokens.`,
      });
      
      setIsOpen(false);
      setBoostAmount('');
    } catch (error) {
      toast({
        title: "Boost Failed",
        description: "Could not boost submission. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomBoost = async () => {
    const amount = parseInt(boostAmount);
    if (!amount || amount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid boost amount.",
        variant: "destructive"
      });
      return;
    }
    
    await handleBoost(amount);
  };

  if (!isOpen) {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="border-ctea-yellow/30 text-ctea-yellow hover:bg-ctea-yellow/10"
      >
        <Zap className="w-4 h-4 mr-1" />
        Boost
      </Button>
    );
  }

  return (
    <Card className="absolute z-50 p-4 bg-ctea-dark border border-ctea-yellow/30 w-80 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-ctea-yellow" />
            Boost Submission
          </h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            ×
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Your $TEA:</span>
            <Badge className="bg-ctea-yellow/20 text-ctea-yellow border border-ctea-yellow/30">
              {progression.tea_points}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Current Boost:</span>
            <span className="text-white">{currentBoost}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-300">Quick Boost Options:</p>
          <div className="grid grid-cols-2 gap-2">
            {boostTiers.map((tier) => (
              <Button
                key={tier.amount}
                size="sm"
                variant="outline"
                onClick={() => handleBoost(tier.amount)}
                disabled={isProcessing || progression.tea_points < tier.amount}
                className={`flex flex-col h-auto p-2 ${
                  progression.tea_points >= tier.amount
                    ? 'border-ctea-yellow/30 text-ctea-yellow hover:bg-ctea-yellow/10'
                    : 'border-gray-600 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span className="font-bold">{tier.amount} $TEA</span>
                <span className="text-xs">{tier.label}</span>
                <span className="text-xs">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  {tier.multiplier}x
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-300">Custom Amount:</p>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount"
              value={boostAmount}
              onChange={(e) => setBoostAmount(e.target.value)}
              className="bg-ctea-darker border-ctea-yellow/30 text-white"
            />
            <Button
              onClick={handleCustomBoost}
              disabled={isProcessing}
              className="bg-ctea-yellow text-ctea-dark hover:bg-ctea-yellow/90"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ctea-dark"></div>
              ) : (
                'Boost'
              )}
            </Button>
          </div>
        </div>

        <div className="p-2 bg-ctea-yellow/10 rounded border border-ctea-yellow/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-ctea-yellow mt-0.5 flex-shrink-0" />
            <p className="text-xs text-ctea-yellow">
              Boosting increases visibility and engagement potential. Higher boosts get priority placement in feeds.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BribeBoostSystem;
