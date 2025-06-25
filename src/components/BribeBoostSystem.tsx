import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Zap, Coins, TrendingUp, Crown, CreditCard, Wallet } from 'lucide-react';
import { useUserProgression } from '@/hooks/useUserProgression';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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
  const [boostAmount, setBoostAmount] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'tea'>('stripe');
  const { userProgression, awardPoints } = useUserProgression();
  const { toast } = useToast();

  const boostTiers = [
    { amount: 25, cost: 2.99, teaCost: 10, label: 'Small Boost', icon: '⚡', description: 'Minor visibility increase' },
    { amount: 50, cost: 4.99, teaCost: 25, label: 'Medium Boost', icon: '🔥', description: 'Notable visibility boost' },
    { amount: 100, cost: 8.99, teaCost: 50, label: 'Large Boost', icon: '🚀', description: 'Major visibility increase' },
    { amount: 200, cost: 14.99, teaCost: 100, label: 'Viral Boost', icon: '👑', description: 'Maximum visibility' }
  ];

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      toast({
        title: "Payment Error",
        description: "Stripe is not available. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Create payment intent on backend
      const { data: paymentIntent, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: boostAmount,
          submissionId: submissionId,
          boostTier: boostTiers.find(tier => tier.amount === boostAmount)
        }
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: paymentIntent.sessionId
      });

      if (stripeError) throw stripeError;

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "Couldn't process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTeaBoost = async () => {
    const selectedTier = boostTiers.find(tier => tier.amount === boostAmount);
    if (!userProgression || userProgression.tea_points < (selectedTier?.teaCost || 0)) {
      toast({
        title: "Insufficient $TEA Points",
        description: "You need more $TEA points to boost this submission.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Deduct points from user
      await awardPoints(-(selectedTier?.teaCost || 0), `Boosted submission ${submissionId}`);

      // Update submission boost in database
      const { error } = await supabase
        .from('tea_submissions')
        .update({ 
          boost_score: (currentBoost || 0) + boostAmount,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId);

      if (error) throw error;

      // Add boost transaction
      await supabase
        .from('tea_points_transactions')
        .insert({
          anonymous_token: userProgression.anonymous_token,
          amount: -(selectedTier?.teaCost || 0),
          transaction_type: 'boost_purchase',
          description: `Boosted submission for ${selectedTier?.teaCost} $TEA points`
        });

      onBoostUpdated((currentBoost || 0) + boostAmount);
      setIsOpen(false);

      toast({
        title: "Boost Applied! 🚀",
        description: `Your submission is now boosted with +${boostAmount} visibility points!`,
      });

    } catch (error) {
      console.error('Boost error:', error);
      toast({
        title: "Boost Failed",
        description: "Couldn't apply boost. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getBoostTier = (boost: number) => {
    if (boost >= 200) return { ...boostTiers[3], current: true };
    if (boost >= 100) return { ...boostTiers[2], current: true };
    if (boost >= 50) return { ...boostTiers[1], current: true };
    if (boost >= 25) return { ...boostTiers[0], current: true };
    return null;
  };

  const currentTier = getBoostTier(currentBoost || 0);
  const selectedTier = boostTiers.find(tier => tier.amount === boostAmount);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="border-ctea-yellow/30 text-ctea-yellow hover:bg-ctea-yellow/10"
          >
            <Zap className="w-4 h-4 mr-1" />
            Boost {currentBoost ? `(+${currentBoost})` : ''}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-ctea-darker/95 border-ctea-teal/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-ctea-yellow" />
              Bribe to Boost Visibility
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Current Status */}
            <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Current Boost</span>
                <Badge className="bg-ctea-yellow text-ctea-dark font-bold">
                  +{currentBoost || 0}
                </Badge>
              </div>
              {currentTier && (
                <div className="flex items-center gap-2 text-sm text-ctea-teal">
                  <span>{currentTier.icon}</span>
                  <span>{currentTier.label}</span>
                </div>
              )}
            </div>

            {/* Payment Method Tabs */}
            <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'stripe' | 'tea')}>
              <TabsList className="grid w-full grid-cols-2 bg-ctea-dark/50">
                <TabsTrigger value="stripe" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Credit Card
                </TabsTrigger>
                <TabsTrigger value="tea" className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  $TEA Points
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stripe" className="space-y-4">
                {/* Boost Options for Stripe */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Choose Boost Amount:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {boostTiers.map((tier) => (
                      <Card
                        key={tier.amount}
                        className={`p-3 cursor-pointer transition-all ${
                          boostAmount === tier.amount
                            ? 'bg-gradient-to-r from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/50'
                            : 'bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-yellow/30'
                        }`}
                        onClick={() => setBoostAmount(tier.amount)}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{tier.icon}</div>
                          <div className="text-white font-bold text-sm">{tier.label}</div>
                          <div className="text-ctea-yellow font-bold text-xs">+{tier.amount}</div>
                          <div className="text-green-400 font-bold text-xs">${tier.cost}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Stripe Payment Button */}
                <Button
                  onClick={handleStripePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:opacity-90"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay ${selectedTier?.cost} to Boost
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="tea" className="space-y-4">
                {/* Boost Options for TEA */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Choose Boost Amount:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {boostTiers.map((tier) => (
                      <Card
                        key={tier.amount}
                        className={`p-3 cursor-pointer transition-all ${
                          boostAmount === tier.amount
                            ? 'bg-gradient-to-r from-ctea-yellow/20 to-ctea-orange/20 border-ctea-yellow/50'
                            : 'bg-ctea-dark/50 border-ctea-teal/20 hover:border-ctea-yellow/30'
                        }`}
                        onClick={() => setBoostAmount(tier.amount)}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{tier.icon}</div>
                          <div className="text-white font-bold text-sm">{tier.label}</div>
                          <div className="text-ctea-yellow font-bold text-xs">+{tier.amount}</div>
                          <div className="text-ctea-yellow text-xs">{tier.teaCost} $TEA</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* User Balance */}
                <div className="p-3 bg-ctea-purple/20 rounded-lg border border-ctea-purple/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Your $TEA Balance:</span>
                    <span className="text-ctea-yellow font-bold">
                      {userProgression?.tea_points || 0} $TEA
                    </span>
                  </div>
                  {userProgression && userProgression.tea_points < (selectedTier?.teaCost || 0) && (
                    <div className="text-ctea-pink text-xs mt-1">
                      Insufficient balance for this boost
                    </div>
                  )}
                </div>

                {/* TEA Payment Button */}
                <Button
                  onClick={handleTeaBoost}
                  disabled={isProcessing || !userProgression || userProgression.tea_points < (selectedTier?.teaCost || 0)}
                  className="w-full bg-gradient-to-r from-ctea-yellow to-ctea-orange text-ctea-dark font-bold hover:opacity-90"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ctea-dark mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Boost for {selectedTier?.teaCost} $TEA
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>

            {/* Cancel Button */}
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BribeBoostSystem; 