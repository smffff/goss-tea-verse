import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Copy, 
  Check, 
  Heart, 
  Wallet, 
  Mail, 
  ExternalLink,
  Crown,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TipButtonProps {
  variant?: 'default' | 'minimal' | 'inline' | 'connect' | 'premium';
  network?: 'ethereum' | 'avax' | 'polygon' | 'base' | 'tron' | 'solana' | 'bitcoin' | 'sui';
  amount?: number;
  className?: string;
  showCopyButton?: boolean;
  showEmailInfo?: boolean;
  onTipSent?: () => void;
}

interface WalletConfig {
  address: string;
  name: string;
  symbol: string;
}

const WALLET_CONFIGS: Record<string, WalletConfig> = {
  ethereum: {
    address: '0x223Ea393d1c83338ee1E81C298924eA2A28c656d',
    name: 'Ethereum',
    symbol: 'ETH'
  },
  avax: {
    address: '0x223Ea393d1c83338ee1E81C298924eA2A28c656d',
    name: 'Avalanche',
    symbol: 'AVAX'
  },
  polygon: {
    address: '0xCB9f62...6b77c9',
    name: 'Polygon',
    symbol: 'MATIC'
  },
  base: {
    address: '0xCB9f62...6b77c9',
    name: 'Base',
    symbol: 'ETH'
  },
  tron: {
    address: 'TYqMDoQaqoAm6ttKbSKKVmbC2yt4YHq2nu',
    name: 'Tron',
    symbol: 'TRX'
  },
  solana: {
    address: 'CCazM2Rx6p1KfZawjckUVr1wQTJY87swyo1yN52GAQqa',
    name: 'Solana',
    symbol: 'SOL'
  },
  bitcoin: {
    address: 'bc1qej...tgazdc',
    name: 'Bitcoin',
    symbol: 'BTC'
  },
  sui: {
    address: '0x161bc8...a40d44',
    name: 'Sui',
    symbol: 'SUI'
  }
};

export const UnifiedTipButton: React.FC<TipButtonProps> = ({
  variant = 'default',
  network = 'ethereum',
  amount = 5,
  className = '',
  showCopyButton = true,
  showEmailInfo = true,
  onTipSent
}) => {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const walletConfig = WALLET_CONFIGS[network];
  const displayAddress = `${walletConfig.address.slice(0, 6)}...${walletConfig.address.slice(-4)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletConfig.address);
      setCopied(true);
      toast({
        title: "Address Copied! 📋",
        description: `${walletConfig.name} address copied. Send your tip and email proof to tips@ctea.news!`,
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

  const handleTip = async () => {
    setIsProcessing(true);
    try {
      // Simulate tip processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Tip Sent! 💚",
        description: `Thank you for supporting CTea! Please email proof to tips@ctea.news`,
      });
      
      onTipSent?.();
    } catch (error) {
      toast({
        title: "Tip Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderMinimalVariant = () => (
    <Button
      onClick={handleTip}
      disabled={isProcessing}
      variant="outline"
      size="sm"
      className={`border-ctea-teal text-ctea-teal hover:bg-ctea-teal/10 ${className}`}
    >
      <Heart className="w-4 h-4 mr-2" />
      {isProcessing ? 'Processing...' : `Tip $${amount}`}
    </Button>
  );

  const renderInlineVariant = () => (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Button
        onClick={handleTip}
        disabled={isProcessing}
        size="sm"
        className="bg-ctea-teal hover:bg-ctea-teal/80 text-black"
      >
        <Heart className="w-4 h-4 mr-1" />
        {isProcessing ? '...' : `$${amount}`}
      </Button>
      {showCopyButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0"
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-400" />
          ) : (
            <Copy className="w-3 h-3 text-gray-400 hover:text-ctea-teal" />
          )}
        </Button>
      )}
    </div>
  );

  const renderConnectVariant = () => (
    <Card className={`bg-ctea-darker/50 border border-ctea-purple/20 rounded-lg p-4 ${className}`}>
      <CardContent className="p-0">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="w-4 h-4 text-ctea-purple" />
          <span className="text-sm font-medium text-white">Connect & Tip</span>
        </div>
        <div className="flex items-center gap-2 text-xs mb-3">
          <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
            {walletConfig.symbol}
          </Badge>
          <code className="text-gray-400 font-mono text-xs bg-gray-800/50 px-2 py-1 rounded">
            {displayAddress}
          </code>
          {showCopyButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-6 w-6 p-0"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400 hover:text-ctea-teal" />
              )}
            </Button>
          )}
        </div>
        <Button
          onClick={handleTip}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-ctea-purple to-ctea-teal text-white"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {isProcessing ? 'Connecting...' : 'Connect & Tip'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderPremiumVariant = () => (
    <Card className={`bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg p-4 ${className}`}>
      <CardContent className="p-0">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-white">Premium Support</span>
          <Sparkles className="w-4 h-4 text-orange-400" />
        </div>
        <div className="flex items-center gap-2 text-xs mb-3">
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
            VIP
          </Badge>
          <code className="text-gray-400 font-mono text-xs bg-gray-800/50 px-2 py-1 rounded">
            {displayAddress}
          </code>
          {showCopyButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-6 w-6 p-0"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400 hover:text-yellow-400" />
              )}
            </Button>
          )}
        </div>
        {showEmailInfo && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded p-2 mb-2">
            <div className="flex items-center gap-2 text-xs text-yellow-400">
              <Mail className="w-3 h-3" />
              <span>Email proof to:</span>
            </div>
            <code className="text-xs text-white font-mono">tips@ctea.news</code>
          </div>
        )}
        <Button
          onClick={handleTip}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 text-black font-bold"
        >
          <Crown className="w-4 h-4 mr-2" />
          {isProcessing ? 'Processing...' : `Premium Tip $${amount}`}
        </Button>
      </CardContent>
    </Card>
  );

  const renderDefaultVariant = () => (
    <Card className={`bg-ctea-darker/50 border border-ctea-purple/20 rounded-lg p-4 ${className}`}>
      <CardContent className="p-0">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-sm font-medium text-white">Support Development</span>
        </div>
        <div className="flex items-center gap-2 text-xs mb-3">
          <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
            {walletConfig.symbol}
          </Badge>
          <code className="text-gray-400 font-mono text-xs bg-gray-800/50 px-2 py-1 rounded">
            {displayAddress}
          </code>
          {showCopyButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-6 w-6 p-0"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400 hover:text-ctea-teal" />
              )}
            </Button>
          )}
        </div>
        {showEmailInfo && (
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded p-2 mb-2">
            <div className="flex items-center gap-2 text-xs text-green-400">
              <Mail className="w-3 h-3" />
              <span>After sending, email proof to:</span>
            </div>
            <code className="text-xs text-white font-mono">tips@ctea.news</code>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Send any amount → Email screenshot → Get VIP access! ☕
        </p>
      </CardContent>
    </Card>
  );

  switch (variant) {
    case 'minimal':
      return renderMinimalVariant();
    case 'inline':
      return renderInlineVariant();
    case 'connect':
      return renderConnectVariant();
    case 'premium':
      return renderPremiumVariant();
    default:
      return renderDefaultVariant();
  }
};

export default UnifiedTipButton; 