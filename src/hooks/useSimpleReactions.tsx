import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import { secureLog } from '@/utils/secureLogging';
import { TeaTokenRewardService } from '@/services/teaTokenRewardService';

export const useSimpleReactions = () => {
  const { incrementReaction } = useUserProgression();
  const { toast } = useToast();

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy'): Promise<boolean> => {
    try {
      if (process.env.NODE_ENV === "development") {
        secureLog.info('useSimpleReactions - Adding reaction:', { submissionId, reactionType });
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
        await supabase
          .from('user_reactions')
          .update({ reaction_type: reactionType })
          .eq('id', existingReaction.id);
        
        toast({
          title: `Reaction Updated! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
          description: `You changed your reaction to ${reactionType}!`,
        });
      } else {
        // Add new reaction
        await supabase
          .from('user_reactions')
          .insert({
            submission_id: submissionId,
            anonymous_token: anonymousToken,
            reaction_type: reactionType
          });

        await incrementReaction('given');

        // Award tokens for new reaction
        const rewardResult = await TeaTokenRewardService.awardReactionReward(
          anonymousToken, // Using anonymous token as wallet address for now
          reactionType,
          submissionId
        );

        if (rewardResult.success) {
          toast({
            title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
            description: rewardResult.message,
          });
        } else {
          toast({
            title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
            description: `You ${reactionType === 'hot' ? 'heated up' : reactionType === 'cold' ? 'cooled down' : 'spiced up'} this tea!`,
          });
        }
      }

      return true;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        secureLog.error('useSimpleReactions - Error:', error);
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
