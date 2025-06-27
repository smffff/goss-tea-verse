import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MinimalTipButton, InlineTipButton, DefaultTipButton } from '@/components/tip/TipButtonVariants';
import ConnectTipButton from '@/components/tip/ConnectTipButton';
import { TeaTokenService } from '@/services/teaTokenService';
import { secureLog } from '@/utils/secureLog';

interface TipButtonProps {
  variant?: 'default' | 'minimal' | 'inline' | 'connect';
  className?: string;
  recipientAddress?: string;
  amount?: number;
  spillId?: string;
}

const TipButton = ({ 
  variant = 'default', 
  className = '',
  recipientAddress = '0x434e792c0e5759c4e23fbd2bb13bcf0e9994dbd0',
  amount = 5,
  spillId
}: TipButtonProps) => {
  const [isTipping, setIsTipping] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const handleTip = async () => {
    if (!recipientAddress) {
      toast({
        title: "No Recipient",
        description: "No recipient address provided for tipping.",
        variant: "destructive"
      });
      return;
    }

    setIsTipping(true);
    
    try {
      // Get current user's wallet address (anonymous token for now)
      const userWallet = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');

      // Transfer tokens
      const result = await TeaTokenService.awardTokens(
        userWallet,
        'tip',
        -amount, // Negative amount for outgoing tip
        spillId,
        {
          recipient_wallet: recipientAddress,
          tip_amount: amount,
          tip_type: 'user_tip'
        }
      );

      if (result.success) {
        toast({
          title: "Tip Sent! 💝",
          description: `Successfully sent ${amount} $TEA to the recipient!`,
        });
      } else {
        throw new Error(result.error || 'Failed to send tip');
      }
    } catch (error) {
      secureLog.error('Tip failed:', error);
      toast({
        title: "Tip Failed",
        description: "Could not send tip. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTipping(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(recipientAddress);
      setCopied(true);
      toast({
        title: "Wallet Address Copied! 📋",
        description: "AVAX address copied to clipboard. Thanks for the support!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the address manually",
        variant: "destructive"
      });
    }
  };

  const commonProps = {
    walletAddress: recipientAddress,
    copied,
    onCopy: copyToClipboard,
    onTip: handleTip,
    isTipping,
    amount,
    className
  };

  switch (variant) {
    case 'minimal':
      return <MinimalTipButton {...commonProps} />;
    case 'inline':
      return <InlineTipButton {...commonProps} />;
    case 'connect':
      return <ConnectTipButton {...commonProps} />;
    default:
      return <DefaultTipButton {...commonProps} />;
  }
};

export default TipButton;
