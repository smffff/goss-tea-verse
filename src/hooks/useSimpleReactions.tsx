
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import { secureLog } from '@/utils/secureLogging';
import { EnhancedSecurityService } from '@/services/enhancedSecurityService';

export const useSimpleReactions = () => {
  const { incrementReaction } = useUserProgression();
  const { toast } = useToast();

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy'): Promise<boolean> => {
    try {
      if (process.env.NODE_ENV === "development") {
        secureLog.info('useSimpleReactions - Adding secure reaction:', { submissionId, reactionType });
      }
      
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      // Use secure server-side reaction function
      const { data: reactionResult, error } = await supabase
        .rpc('secure_reaction_insert', {
          p_submission_id: submissionId,
          p_anonymous_token: anonymousToken,
          p_reaction_type: reactionType
        });

      if (error) {
        throw new Error(`Secure reaction failed: ${error.message}`);
      }

      if (!reactionResult?.success) {
        if (reactionResult?.error?.includes('Rate limit')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Please wait before reacting again.",
            variant: "destructive"
          });
          return false;
        }
        throw new Error(reactionResult?.error || 'Reaction failed');
      }

      await incrementReaction('given');

      // Log successful secure reaction
      await EnhancedSecurityService.logSecurityEvent(
        'secure_reaction_success',
        { submissionId, reactionType },
        'info'
      );

      toast({
        title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
        description: `You ${reactionType === 'hot' ? 'heated up' : reactionType === 'cold' ? 'cooled down' : 'spiced up'} this tea!`,
      });

      return true;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        secureLog.error('useSimpleReactions - Secure reaction error:', error);
      }

      await EnhancedSecurityService.logSecurityEvent(
        'reaction_error',
        { error: error instanceof Error ? error.message : 'Unknown error', submissionId, reactionType },
        'medium'
      );

      toast({
        title: "Reaction Failed",
        description: "Could not add your reaction. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return { handleReaction };
};
