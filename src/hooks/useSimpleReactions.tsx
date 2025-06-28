
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
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
      
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      // Use the new secure server-side function
      const { data: reactionResult, error } = await supabase
        .rpc('secure_reaction_insert', {
          p_submission_id: submissionId,
          p_anonymous_token: anonymousToken,
          p_reaction_type: reactionType
        });

      if (error) {
        throw new Error(`Failed to add reaction: ${error.message}`);
      }

      // Type assertion for the response (cast through unknown first)
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
        description: "Could not add your reaction. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return { handleReaction };
};
