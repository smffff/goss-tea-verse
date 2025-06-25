
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Heart, Wallet, Users, Twitter, LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const developerLinks = [
    {
      name: 'Arena Social',
      icon: Users,
      url: 'https://arena.social/?ref=LadyInvsible',
      color: 'hover:text-blue-400'
    },
    {
      name: 'X/Twitter',
      icon: Twitter,
      url: 'https://x.com/ladyinvsible',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Linktree',
      icon: LinkIcon,
      url: 'https://linktr.ee/ladyinvsible',
      color: 'hover:text-green-400'
    }
  ];

  if (variant === 'minimal') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className={`text-gray-400 hover:text-ctea-teal transition-colors ${className}`}
      >
        <Heart className="w-4 h-4 mr-1" />
        Tip Dev
      </Button>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
          <Wallet className="w-3 h-3 mr-1" />
          AVAX Tips
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
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
  }

  if (variant === 'connect') {
    return (
      <div className={`bg-ctea-darker/50 border border-ctea-purple/20 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-sm font-medium text-white">Connect & Support</span>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-2 mb-3">
          {developerLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              size="sm"
              onClick={() => openLink(link.url)}
              className={`text-gray-400 ${link.color} transition-colors duration-200 h-8 w-8 p-0`}
              aria-label={link.name}
            >
              <link.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>

        {/* Tip Section */}
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
            onClick={copyToClipboard}
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
          Connect with me or send tips to keep the tea flowing! ☕
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-ctea-darker/50 border border-ctea-purple/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-4 h-4 text-red-400" />
        <span className="text-sm font-medium text-white">Support Development</span>
      </div>
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
          onClick={copyToClipboard}
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
    </div>
  );
};

export default TipButton;
