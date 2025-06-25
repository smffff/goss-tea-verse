
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Heart, Users, Twitter, LinkIcon } from 'lucide-react';

interface ConnectTipButtonProps {
  walletAddress: string;
  copied: boolean;
  onCopy: () => void;
  className?: string;
}

const ConnectTipButton: React.FC<ConnectTipButtonProps> = ({ 
  walletAddress, 
  copied, 
  onCopy, 
  className 
}) => {
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
        Connect with me or send tips to keep the tea flowing! ☕
      </p>
    </div>
  );
};

export default ConnectTipButton;
