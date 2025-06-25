
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MinimalTipButton, InlineTipButton, DefaultTipButton } from './tip/TipButtonVariants';
import ConnectTipButton from './tip/ConnectTipButton';

interface TipButtonProps {
  variant?: 'default' | 'minimal' | 'inline' | 'connect';
  className?: string;
}

const TipButton = ({ variant = 'default', className = '' }: TipButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const walletAddress = '0x434e792c0e5759c4e23fbd2bb13bcf0e9994dbd0';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
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
    walletAddress,
    copied,
    onCopy: copyToClipboard,
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
