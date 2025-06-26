
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Coffee, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '@/components/WalletProvider';
import { accessControlService, AccessLevel } from '@/services/accessControlService';

interface BribeButtonProps {
  onBribeAccepted: (accessLevel: AccessLevel) => void;
  onClose: () => void;
}

const BribeButton: React.FC<BribeButtonProps> = ({ onBribeAccepted, onClose }) => {
  const { wallet } = useWallet();
  const [tipAmount, setTipAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const quickAmounts = [
    { amount: 5, label: '☕ Coffee', desc: 'Basic appreciation' },
    { amount: 20, label: '🍕 Pizza', desc: 'Fuel the chaos' },
    { amount: 50, label: '💎 Premium', desc: 'Serious support' },
    { amount: 100, label: '👑 Legendary', desc: 'Ultimate flex' }
  ];

  const handleBribe = async () => {
    if (!tipAmount || parseFloat(tipAmount) <= 0) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate tip processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const accessLevel = accessControlService.checkBribeAccess(parseFloat(tipAmount));
      
      // Store bribe status
      localStorage.setItem('ctea_bribe_amount', tipAmount);
      localStorage.setItem('ctea_access_method', 'bribe');
      
      setShowSuccess(true);
      
      setTimeout(() => {
        onBribeAccepted(accessLevel);
      }, 2000);
      
    } catch (error) {
      console.error('Bribe processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-6"
      >
        <div className="text-6xl">💸</div>
        <h3 className="text-2xl font-bold text-green-400">Bribe Accepted!</h3>
        <p className="text-gray-300">
          The devs are pleased with your ${tipAmount} contribution.
          <br />
          Welcome to the chaos, generous soul! 🎉
        </p>
        <div className="animate-pulse">
          <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-black font-bold">
            🎫 VIP ACCESS GRANTED
          </Badge>
        </div>
      </motion.div>
    );
  }

  return (
    <Card className="bg-ctea-dark/95 border-pink-400/30 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-white flex items-center justify-center gap-2">
          <DollarSign className="w-5 h-5 text-pink-400" />
          Bribe the Devs
        </CardTitle>
        <p className="text-center text-gray-400 text-sm">
          No $TEA? No problem! Tip the devs for instant access.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {quickAmounts.map((quick) => (
            <Button
              key={quick.amount}
              onClick={() => setTipAmount(quick.amount.toString())}
              variant="outline"
              className="border-pink-400/30 text-white hover:border-pink-400/60 hover:bg-pink-400/10 p-3 h-auto flex-col"
            >
              <span className="font-bold">${quick.amount}</span>
              <span className="text-xs text-gray-400">{quick.label}</span>
            </Button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Custom Amount ($USD)</label>
          <Input
            type="number"
            placeholder="Enter amount..."
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            className="bg-ctea-darker border-ctea-teal/30 text-white"
          />
        </div>

        {/* Payment Method Info */}
        <div className="bg-ctea-darker/50 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Payment Method:</span>
            <span className="text-white">
              {wallet.isConnected ? '🦊 MetaMask Wallet' : '💳 Card/PayPal'}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Secure payment via Stripe. All tips go to development costs.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleBribe}
            disabled={!tipAmount || parseFloat(tipAmount) <= 0 || isProcessing}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Processing Bribe...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Send ${tipAmount || '0'} Tip
              </>
            )}
          </Button>
          
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-gray-400 hover:text-white"
          >
            Maybe Later
          </Button>
        </div>

        <div className="text-xs text-center text-gray-500">
          💡 Any amount gets you instant access. We're not picky, just broke.
        </div>
      </CardContent>
    </Card>
  );
};

export default BribeButton;
