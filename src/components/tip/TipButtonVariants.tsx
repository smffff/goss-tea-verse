
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Heart, Wallet, Mail } from 'lucide-react';

interface TipButtonVariantsProps {
  walletAddress: string;
  copied: boolean;
  onCopy: () => void;
  network: string;
  className?: string;
}

export const MinimalTipButton: React.FC<TipButtonVariantsProps> = ({ 
  onCopy, 
  className 
}) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onCopy}
    className={`text-gray-400 hover:text-ctea-teal transition-colors ${className}`}
  >
    <Heart className="w-4 h-4 mr-1" />
    Tip Dev
  </Button>
);

export const InlineTipButton: React.FC<TipButtonVariantsProps> = ({ 
  walletAddress, 
  copied, 
  onCopy,
  network,
  className 
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
      <Wallet className="w-3 h-3 mr-1" />
      {network} Tips
    </Badge>
    <Button
      variant="ghost"
      size="sm"
      onClick={onCopy}
      className="text-xs font-mono text-gray-400 hover:text-ctea-teal p-1 h-auto"
    >
      {copied ? (
        <Check className="w-3 h-3 text-green-400" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </Button>
  </div>
);

export const DefaultTipButton: React.FC<TipButtonVariantsProps> = ({ 
  walletAddress, 
  copied, 
  onCopy,
  network,
  className 
}) => (
  <div className={`bg-ctea-darker/50 border border-ctea-purple/20 rounded-lg p-4 ${className}`}>
    <div className="flex items-center gap-2 mb-2">
      <Heart className="w-4 h-4 text-red-400" />
      <span className="text-sm font-medium text-white">Support Development</span>
    </div>
    <div className="flex items-center gap-2 text-xs mb-3">
      <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
        {network}
      </Badge>
      <code className="text-gray-400 font-mono text-xs bg-gray-800/50 px-2 py-1 rounded">
        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
      </code>
      <Button
        variant="ghost"
        size="sm"
        onClick={onCopy}
        className="h-6 w-6 p-0"
      >
        {copied ? (
          <Check className="w-3 h-3 text-green-400" />
        ) : (
          <Copy className="w-3 h-3 text-gray-400 hover:text-ctea-teal" />
        )}
      </Button>
    </div>
    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded p-2 mb-2">
      <div className="flex items-center gap-2 text-xs text-green-400">
        <Mail className="w-3 h-3" />
        <span>After sending, email proof to:</span>
      </div>
      <code className="text-xs text-white font-mono">tips@ctea.news</code>
    </div>
    <p className="text-xs text-gray-500 mt-2">
      Send any amount → Email screenshot → Get VIP access! ☕
    </p>
  </div>
);
