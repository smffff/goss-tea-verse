import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Share2, 
  Twitter, 
  Copy, 
  CheckCircle, 
  ExternalLink,
  MessageCircle,
  Link as LinkIcon,
  Zap,
  Heart,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackShareAction } from '@/lib/analytics';

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  platform?: 'twitter' | 'discord' | 'telegram' | 'copy';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'expanded';
  showCounts?: boolean;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check out this spicy tea on CTea Newsroom! ☕',
  description = 'Anonymous crypto gossip, served hot.',
  hashtags = ['CTea', 'CryptoGossip', 'SpillTheTea'],
  platform,
  size = 'md',
  variant = 'default',
  showCounts = false,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const { toast } = useToast();

  const shareData = {
    url,
    title,
    description,
    hashtags: hashtags.join(' ')
  };

  const handleShare = async (platform: string) => {
    try {
      trackShareAction(platform);

      switch (platform) {
        case 'twitter':
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags.join(','))}`;
          window.open(twitterUrl, '_blank', 'width=600,height=400');
          break;

        case 'discord':
          const discordUrl = `https://discord.com/channels/@me?content=${encodeURIComponent(`${title} ${url}`)}`;
          window.open(discordUrl, '_blank');
          break;

        case 'telegram':
          const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
          window.open(telegramUrl, '_blank');
          break;

        case 'copy':
          await navigator.clipboard.writeText(`${title} ${url}`);
          setCopied(true);
          toast({
            title: "Link Copied! 📋",
            description: "Share link copied to clipboard",
          });
          setTimeout(() => setCopied(false), 2000);
          break;

        default:
          if (navigator.share) {
            await navigator.share({
              title,
              text: description,
              url
            });
          } else {
            await navigator.clipboard.writeText(`${title} ${url}`);
            setCopied(true);
            toast({
              title: "Link Copied! 📋",
              description: "Share link copied to clipboard",
            });
            setTimeout(() => setCopied(false), 2000);
          }
      }

      setShareCount(prev => prev + 1);
    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: "Share Failed",
        description: "Couldn't share content. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return 'h-8 px-3 text-sm';
      case 'lg':
        return 'h-12 px-6 text-lg';
      default:
        return 'h-10 px-4 text-base';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const shareOptions = [
    {
      platform: 'twitter',
      label: 'Twitter',
      icon: <Twitter className={getIconSize()} />,
      color: 'bg-blue-500 hover:bg-blue-600 text-white',
      borderColor: 'border-blue-500/30'
    },
    {
      platform: 'discord',
      label: 'Discord',
      icon: <MessageCircle className={getIconSize()} />,
      color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
      borderColor: 'border-indigo-500/30'
    },
    {
      platform: 'telegram',
      label: 'Telegram',
      icon: <ExternalLink className={getIconSize()} />,
      color: 'bg-blue-400 hover:bg-blue-500 text-white',
      borderColor: 'border-blue-400/30'
    },
    {
      platform: 'copy',
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? <CheckCircle className={getIconSize()} /> : <Copy className={getIconSize()} />,
      color: copied ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white',
      borderColor: copied ? 'border-green-500/30' : 'border-gray-500/30'
    }
  ];

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          onClick={() => handleShare('twitter')}
          size="sm"
          variant="outline"
          className="border-accent/30 text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 transition-transform duration-150"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => handleShare('copy')}
          size="sm"
          variant="outline"
          className="border-accent/30 text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 transition-transform duration-150"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  if (variant === 'expanded') {
    return (
      <Card className={`p-6 bg-gradient-to-br from-accent/5 to-accent2/5 border-accent/20 ${className}`}>
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5 text-accent" />
            Share This Tea
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Help spread the word about this spicy take!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {shareOptions.map((option) => (
            <Button
              key={option.platform}
              onClick={() => handleShare(option.platform)}
              className={`${option.color} font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 ${getButtonSize()}`}
            >
              {option.icon}
              <span className="ml-2">{option.label}</span>
            </Button>
          ))}
        </div>

        {showCounts && (
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              <span>{shareCount} shares</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>🔥 Hot</span>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center gap-2 text-sm text-accent">
            <Zap className="w-4 h-4" />
            <span>Sharing helps the community discover great content!</span>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {shareOptions.map((option) => (
        <Button
          key={option.platform}
          onClick={() => handleShare(option.platform)}
          variant="outline"
          className={`${option.borderColor} hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 transition-transform duration-150 ${getButtonSize()}`}
          title={`Share on ${option.label}`}
        >
          {option.icon}
          {size !== 'sm' && <span className="ml-2">{option.label}</span>}
        </Button>
      ))}
      
      {showCounts && shareCount > 0 && (
        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
          {shareCount} shares
        </Badge>
      )}
    </div>
  );
};

export default ShareButtons; 