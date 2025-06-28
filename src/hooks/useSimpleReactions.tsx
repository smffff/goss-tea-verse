
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import { SecurityService } from '@/services/securityService';
import { secureLog } from '@/utils/secureLogging';

interface SecureReactionResult {
  success: boolean;
  error?: string;
}

export const useSimpleReactions = () => {
  const { incrementReaction } = useUserProgression();
  const { toast } = useToast();

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy'): Promise<boolean> => {
    try {
      if (process.env.NODE_ENV === "development") {
        secureLog.info('useSimpleReactions - Adding secure reaction:', { submissionId, reactionType });
      }
      
      // Get secure anonymous token
      const anonymousToken = await SecurityService.getOrCreateSecureToken();

      // Check enhanced rate limit with security monitoring
      const rateLimitCheck = await SecurityService.checkRateLimit(anonymousToken, 'reaction', 20, 15);
      
      if (!rateLimitCheck.allowed) {
        throw new Error(rateLimitCheck.blockedReason || 'Rate limit exceeded');
      }

      // Log suspicious activity if detected
      if (rateLimitCheck.securityViolation) {
        secureLog.warn('Suspicious reaction activity detected', { submissionId, reactionType });
      }

      // Use the secure server-side function
      const { data: reactionResult, error } = await supabase
        .rpc('secure_reaction_insert', {
          p_submission_id: submissionId,
          p_anonymous_token: anonymousToken,
          p_reaction_type: reactionType
        });

      if (error) {
        throw new Error(`Failed to add reaction: ${error.message}`);
      }

      const result = reactionResult as unknown as SecureReactionResult;

      if (!result?.success) {
        throw new Error(result?.error || 'Unknown error occurred');
      }

      await incrementReaction('given');

      toast({
        title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
        description: `You ${reactionType === 'hot' ? 'heated up' : reactionType === 'cold' ? 'cooled down' : 'spiced up'} this tea!`,
      });

      return true;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        secureLog.error('useSimpleReactions - Secure reaction error:', error);
      }

      toast({
        title: "Reaction Failed",
        description: error instanceof Error ? error.message : "Could not add your reaction. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return { handleReaction };
};
