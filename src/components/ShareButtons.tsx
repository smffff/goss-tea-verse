import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
  variant?: 'full' | 'minimal';
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  url, 
  title, 
  variant = 'full',
  className = '' 
}) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "The link has been copied to your clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    }
  };

  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(`${title} ${url} #CTea #CryptoTea`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button
          size="sm"
          variant="outline"
          onClick={shareOnTwitter}
          className="border-[#00d1c1]/30 text-[#00d1c1] hover:bg-[#00d1c1]/10"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={copyToClipboard}
          className="border-[#ff61a6]/30 text-[#ff61a6] hover:bg-[#ff61a6]/10"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        size="sm"
        variant="outline"
        onClick={shareOnTwitter}
        className="border-[#00d1c1]/30 text-[#00d1c1] hover:bg-[#00d1c1]/10 flex-1"
      >
        <Twitter className="w-4 h-4 mr-2" />
        Tweet
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={copyToClipboard}
        className="border-[#ff61a6]/30 text-[#ff61a6] hover:bg-[#ff61a6]/10 flex-1"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy Link
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10"
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ShareButtons;
