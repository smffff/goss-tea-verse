
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
  variant?: 'minimal' | 'expanded';
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  variant = 'expanded',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${title} ${url}`);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard."
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy failed",
        description: "Please try copying the link manually.",
        variant: "destructive"
      });
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <Button size="sm" variant="ghost" onClick={copyToClipboard} className="text-ctea-teal hover:bg-ctea-teal/10">
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </Button>
        <Button size="sm" variant="ghost" onClick={shareOnTwitter} className="text-ctea-teal hover:bg-ctea-teal/10">
          <Twitter className="w-3 h-3" />
        </Button>
        {navigator.share && (
          <Button size="sm" variant="ghost" onClick={shareNative} className="text-ctea-teal hover:bg-ctea-teal/10">
            <MessageCircle className="w-3 h-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button size="sm" variant="outline" onClick={copyToClipboard} className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10">
        {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
        {copied ? 'Copied!' : 'Copy'}
      </Button>
      <Button size="sm" variant="outline" onClick={shareOnTwitter} className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
        <Twitter className="w-3 h-3 mr-1" />
        Twitter
      </Button>
      <Button size="sm" variant="outline" onClick={shareOnFacebook} className="border-blue-600/30 text-blue-500 hover:bg-blue-600/10">
        <Facebook className="w-3 h-3 mr-1" />
        Facebook
      </Button>
    </div>
  );
};

export default ShareButtons;
