import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TeaSubmission } from '@/types/teaFeed';

export const useSimpleSharing = (submissions: TeaSubmission[]) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const { toast } = useToast();

  const handleShare = async (submissionId: string) => {
    try {
      const submission = submissions.find(s => s.id === submissionId);
      if (!submission) return;

      const shareUrl = `${window.location.origin}/feed#${submissionId}`;
      await navigator.clipboard.writeText(shareUrl);
      
      setCopiedLink(submissionId);
      setTimeout(() => setCopiedLink(null), 2000);
      
      toast({
        title: "Link Copied! 🔗",
        description: "Share this tea with your friends!",
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.error('useSimpleSharing - Error sharing:', error);
      toast({
        title: "Share Failed",
        description: "Couldn't copy the link. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { copiedLink, handleShare };
};
