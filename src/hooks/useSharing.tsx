
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';

export const useSharing = (submissions: TeaSubmission[]) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const { toast } = useToast();

  const handleShare = async (submissionId: string, platform: 'twitter' | 'copy') => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    const shareUrl = `${window.location.origin}/feed?submission=${submissionId}`;
    const shareText = `🔥 Hot Tea Alert: ${submission.content.substring(0, 100)}... #CTea #CryptoGossip`;

    try {
      if (platform === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopiedLink(submissionId);
        toast({
          title: "Link Copied! 📋",
          description: "Share link copied to clipboard",
        });
        setTimeout(() => setCopiedLink(null), 2000);
      }
    } catch (error) {
      console.error('useSharing - Share error:', error);
      toast({
        title: "Share Failed",
        description: "Couldn't share content. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { copiedLink, handleShare };
};
