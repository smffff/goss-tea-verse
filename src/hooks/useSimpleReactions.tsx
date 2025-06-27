
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

      // Check if user already reacted to this submission
      const { data: existingReaction } = await supabase
        .from('user_reactions')
        .select('*')
        .eq('submission_id', submissionId)
        .eq('anonymous_token', anonymousToken)
        .single();

      if (existingReaction) {
        // Update existing reaction
        const { error: updateError } = await supabase
          .from('user_reactions')
          .update({ reaction_type: reactionType })
          .eq('id', existingReaction.id);

        if (updateError) {
          throw new Error(`Failed to update reaction: ${updateError.message}`);
        }
      } else {
        // Create new reaction
        const { error: insertError } = await supabase
          .from('user_reactions')
          .insert({
            submission_id: submissionId,
            anonymous_token: anonymousToken,
            reaction_type: reactionType
          });

        if (insertError) {
          throw new Error(`Failed to add reaction: ${insertError.message}`);
        }

        await incrementReaction('given');
      }

      // Log successful secure reaction
      await EnhancedSecurityService.logSecurityEvent(
        'secure_reaction_success',
        { submissionId, reactionType },
        'medium'
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
