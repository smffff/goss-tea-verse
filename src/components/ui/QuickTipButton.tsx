
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Crown, Coins, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickTipButtonProps {
  amount: number;
  onTipSuccess?: (amount: number) => void;
  disabled?: boolean;
  className?: string;
}

const QuickTipButton: React.FC<QuickTipButtonProps> = ({
  amount,
  onTipSuccess,
  disabled = false,
  className = ''
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleTip = async () => {
    if (disabled || isProcessing) return;

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      
      toast({
        title: `Thanks for the ${amount === 1 ? 'coffee' : 'generous tip'}! ☕`,
        description: `$${amount} tip sent successfully!`,
      });

      if (onTipSuccess) {
        onTipSuccess(amount);
      }

      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 2000);
      
    } catch (error) {
      toast({
        title: "Tip Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const isPremium = amount >= 10;
  const isSuccess = isSuccess;

  return (
    <Button
      onClick={handleTip}
      disabled={disabled || isProcessing}
      className={`
        relative overflow-hidden transition-all duration-300
        ${isPremium 
          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 border-yellow-400/50' 
          : 'bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal'
        }
        text-white font-bold transform hover:scale-105 shadow-lg
        ${isSuccess ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-ctea-dark' : ''}
        ${className}
      `}
    >
      {isProcessing && (
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      )}
      
      <div className="flex items-center gap-2">
        {isSuccess ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Heart className="w-4 h-4" />
        )}
        
        <span>
          {isSuccess ? 'Sent!' : isProcessing ? 'Processing...' : `$${amount}`}
        </span>
        
        {isPremium && !isProcessing && !isSuccess && (
          <Crown className="w-4 h-4 text-yellow-400" />
        )}
      </div>
    </Button>
  );
};

export default QuickTipButton;
