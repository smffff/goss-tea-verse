
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MinimalTipButton, InlineTipButton, DefaultTipButton } from '@/components/tip/TipButtonVariants';
import ConnectTipButton from '@/components/tip/ConnectTipButton';

interface TipButtonProps {
  variant?: 'default' | 'minimal' | 'inline' | 'connect';
  className?: string;
  network?: 'ethereum' | 'solana' | 'bitcoin' | 'avax' | 'polygon' | 'tron' | 'sui' | 'base';
}

const TipButton = ({ 
  variant = 'default', 
  className = '',
  network = 'ethereum'
}: TipButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Real wallet addresses from your screenshots
  const walletAddresses = {
    ethereum: '0x223Ea393d1c83338ee1E81C298924eA2A28c656d',
    avax: '0x223Ea393d1c83338ee1E81C298924eA2A28c656d',
    polygon: '0xCB9f62...6b77c9', // Same as ETH (EVM compatible)
    base: '0xCB9f62...6b77c9', // Same as ETH (EVM compatible)
    tron: 'TYqMDoQaqoAm6ttKbSKKVmbC2yt4YHq2nu',
    solana: 'CCazM2Rx6p1KfZawjckUVr1wQTJY87swyo1yN52GAQqa',
    bitcoin: 'bc1qej...tgazdc',
    sui: '0x161bc8...a40d44'
  };

  const walletAddress = walletAddresses[network];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast({
        title: "Address Copied! 📋",
        description: `${network.toUpperCase()} address copied. Send your tip and email proof to tips@ctea.news!`,
      });
      setTimeout(() => setCopied(false), 3000);
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
    network: network.toUpperCase(),
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
