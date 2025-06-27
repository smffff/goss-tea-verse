import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Heart, Wallet, Coins, Loader2 } from 'lucide-react';

interface TipButtonVariantsProps {
  walletAddress: string;
  copied: boolean;
  onCopy: () => void;
  onTip?: () => void;
  isTipping?: boolean;
  amount?: number;
  className?: string;
}

export const MinimalTipButton: React.FC<TipButtonVariantsProps> = ({ 
  onCopy, 
  onTip, 
  isTipping, 
  amount = 5,
  className 
}) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onTip || onCopy}
    disabled={isTipping}
    className={`text-gray-400 hover:text-ctea-teal transition-colors ${className}`}
  >
    {isTipping ? (
      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
    ) : (
      <Heart className="w-4 h-4 mr-1" />
    )}
    {onTip ? `Tip ${amount} $TEA` : 'Tip Dev'}
  </Button>
);

export const InlineTipButton: React.FC<TipButtonVariantsProps> = ({ 
  walletAddress, 
  copied, 
  onCopy, 
  onTip,
  isTipping,
  amount = 5,
  className 
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
      <Coins className="w-3 h-3 mr-1" />
      {onTip ? `${amount} $TEA` : 'AVAX Tips'}
    </Badge>
    <Button
      variant="ghost"
      size="sm"
      onClick={onTip || onCopy}
      disabled={isTipping}
      className="text-xs font-mono text-gray-400 hover:text-ctea-teal p-1 h-auto"
    >
      {isTipping ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : copied ? (
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
  onTip,
  isTipping,
  amount = 5,
  className 
}) => (
  <div className={`bg-ctea-darker/50 border border-ctea-purple/20 rounded-lg p-4 ${className}`}>
    <div className="flex items-center gap-2 mb-2">
      <Heart className="w-4 h-4 text-red-400" />
      <span className="text-sm font-medium text-white">
        {onTip ? 'Send $TEA Tip' : 'Support Development'}
      </span>
    </div>
    
    {onTip ? (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Coins className="w-3 h-3 mr-1" />
            {amount} $TEA
          </Badge>
        </div>
        <Button
          onClick={onTip}
          disabled={isTipping}
          className="w-full bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white"
        >
          {isTipping ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Tip...
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Send {amount} $TEA
            </>
          )}
        </Button>
      </div>
    ) : (
      <>
        <div className="flex items-center gap-2 text-xs">
          <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
            AVAX
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
        <p className="text-xs text-gray-500 mt-2">
          Tips help keep the tea flowing! ☕
        </p>
      </>
    )}
  </div>
);
