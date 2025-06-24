
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserProgression {
  id: string;
  current_xp: number;
  current_level: number;
  tea_points: number;
  total_posts: number;
  total_reactions_given: number;
  total_reactions_received: number;
  anonymous_token: string;
}

interface UserLevel {
  level: number;
  name: string;
  min_xp: number;
  max_xp?: number;
  badge_color: string;
  perks: any;
}

export const useUserProgression = () => {
  const [userProgression, setUserProgression] = useState<UserProgression | null>(null);
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAnonymousToken = () => {
    let token = localStorage.getItem('ctea_anonymous_token');
    if (!token) {
      token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      localStorage.setItem('ctea_anonymous_token', token);
    }
    return token;
  };

  const fetchUserProgression = async () => {
    try {
      const anonymousToken = getAnonymousToken();
      
      // Get or create user progression
      let { data: progression, error } = await supabase
        .from('user_progression')
        .select('*')
        .eq('anonymous_token', anonymousToken)
        .single();

      if (error && error.code === 'PGRST116') {
        // User doesn't exist, create new progression
        const { data: newProgression, error: createError } = await supabase
          .from('user_progression')
          .insert({
            anonymous_token: anonymousToken,
            current_xp: 0,
            current_level: 1,
            tea_points: 0,
            total_posts: 0,
            total_reactions_given: 0,
            total_reactions_received: 0
          })
          .select()
          .single();

        if (createError) throw createError;
        progression = newProgression;
      } else if (error) {
        throw error;
      }

      setUserProgression(progression);

      // Fetch user level info
      const { data: levelData, error: levelError } = await supabase
        .from('user_levels')
        .select('*')
        .eq('level', progression.current_level)
        .single();

      if (levelError) {
        console.error('Error fetching level data:', levelError);
      } else {
        setUserLevel(levelData);
      }

    } catch (error) {
      console.error('Error fetching user progression:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const awardPoints = async (points: number, reason: string) => {
    try {
      const anonymousToken = getAnonymousToken();
      
      // Add tea points transaction
      await supabase
        .from('tea_points_transactions')
        .insert({
          anonymous_token: anonymousToken,
          amount: points,
          transaction_type: 'earned',
          description: reason
        });

      // Update user progression
      const { data, error } = await supabase
        .from('user_progression')
        .update({
          tea_points: (userProgression?.tea_points || 0) + points,
          current_xp: (userProgression?.current_xp || 0) + points,
          updated_at: new Date().toISOString()
        })
        .eq('anonymous_token', anonymousToken)
        .select()
        .single();

      if (error) throw error;
      
      setUserProgression(data);
      
      // Check for level up
      await checkLevelUp(data.current_xp);
      
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  };

  const checkLevelUp = async (currentXp: number) => {
    try {
      // Check if user should level up
      const { data: nextLevel, error } = await supabase
        .from('user_levels')
        .select('*')
        .gt('level', userProgression?.current_level || 1)
        .lte('min_xp', currentXp)
        .order('level', { ascending: true })
        .limit(1)
        .single();

      if (!error && nextLevel) {
        const anonymousToken = getAnonymousToken();
        
        // Update user level
        await supabase
          .from('user_progression')
          .update({ current_level: nextLevel.level })
          .eq('anonymous_token', anonymousToken);

        setUserLevel(nextLevel);
        setUserProgression(prev => prev ? { ...prev, current_level: nextLevel.level } : null);

        // Could trigger a notification or celebration here
        console.log(`Level up! Now level ${nextLevel.level}: ${nextLevel.name}`);
      }
    } catch (error) {
      console.error('Error checking level up:', error);
    }
  };

  const incrementPost = async () => {
    try {
      const anonymousToken = getAnonymousToken();
      
      await supabase
        .from('user_progression')
        .update({
          total_posts: (userProgression?.total_posts || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('anonymous_token', anonymousToken);

      setUserProgression(prev => prev ? { ...prev, total_posts: prev.total_posts + 1 } : null);
      
      // Award points for posting
      await awardPoints(10, 'Posted content');
      
    } catch (error) {
      console.error('Error incrementing post count:', error);
    }
  };

  const incrementReaction = async (type: 'given' | 'received') => {
    try {
      const anonymousToken = getAnonymousToken();
      const field = type === 'given' ? 'total_reactions_given' : 'total_reactions_received';
      
      await supabase
        .from('user_progression')
        .update({
          [field]: (userProgression?.[field] || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('anonymous_token', anonymousToken);

      setUserProgression(prev => prev ? { ...prev, [field]: prev[field] + 1 } : null);
      
      // Award points for reactions
      const points = type === 'given' ? 2 : 5;
      await awardPoints(points, type === 'given' ? 'Gave reaction' : 'Received reaction');
      
    } catch (error) {
      console.error('Error incrementing reaction count:', error);
    }
  };

  useEffect(() => {
    fetchUserProgression();
  }, []);

  return {
    userProgression,
    userLevel,
    isLoading,
    awardPoints,
    incrementPost,
    incrementReaction,
    refreshProgression: fetchUserProgression
  };
};
