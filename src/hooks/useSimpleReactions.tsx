
import { useCallback } from 'react';
import { SecurityService } from '@/services/securityService';
import { useToast } from '@/hooks/use-toast';

export const useSimpleReactions = () => {
  const { toast } = useToast();

  const handleReaction = useCallback(async (
    submissionId: string, 
    reactionType: 'hot' | 'cold' | 'spicy'
  ): Promise<boolean> => {
    try {
      const result = await SecurityService.createSecureReaction(submissionId, reactionType);
      
      if (!result.success) {
        toast({
          title: "Reaction failed",
          description: result.error || "Please try again",
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add reaction",
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  return { handleReaction };
};
