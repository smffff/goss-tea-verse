
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import TeaSubmissionCard from './TeaSubmissionCard';

interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  evidence_urls: string[] | null;
  reactions: { hot: number; cold: number; spicy: number };
  created_at: string;
  average_rating: number;
  rating_count: number;
  has_evidence: boolean;
}

interface AIComment {
  id: string;
  content: string;
  type: 'spicy' | 'smart' | 'memy' | 'savage';
  submission_id: string;
  created_at: string;
}

const TeaFeed = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [aiComments, setAiComments] = useState<{ [key: string]: AIComment[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(new Set());
  const { incrementReaction } = useUserProgression();

  useEffect(() => {
    fetchSubmissions();
    fetchAIComments();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      // Transform the data to ensure reactions have the correct type
      const transformedData = (data || []).map(submission => ({
        ...submission,
        reactions: typeof submission.reactions === 'object' && submission.reactions !== null 
          ? submission.reactions as { hot: number; cold: number; spicy: number }
          : { hot: 0, cold: 0, spicy: 0 }
      }));
      
      setSubmissions(transformedData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIComments = async () => {
    try {
      // This would fetch from a future ai_comments table
      // For now, we'll simulate with local storage or generate on demand
      console.log('AI comments would be fetched here');
    } catch (error) {
      console.error('Error fetching AI comments:', error);
    }
  };

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    try {
      const anonymousToken = localStorage.getItem('ctea_anonymous_token') || 
        Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      localStorage.setItem('ctea_anonymous_token', anonymousToken);

      // Check if user already reacted
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
      } else {
        // Create new reaction
        await supabase
          .from('user_reactions')
          .insert({
            submission_id: submissionId,
            anonymous_token: anonymousToken,
            reaction_type: reactionType
          });

        // Increment user progression for giving a reaction
        await incrementReaction('given');
      }

      // Update local state
      setSubmissions(prev => prev.map(sub => {
        if (sub.id === submissionId) {
          const newReactions = { ...sub.reactions };
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          return { ...sub, reactions: newReactions };
        }
        return sub;
      }));

    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  };

  const generateAICommentary = async (submission: TeaSubmission) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-commentary', {
        body: { 
          content: submission.content,
          category: submission.category,
          submissionId: submission.id
        }
      });

      if (error) throw error;
      
      // Update local state with new AI comment
      if (data?.commentary) {
        setAiComments(prev => ({
          ...prev,
          [submission.id]: [
            ...(prev[submission.id] || []),
            {
              id: Date.now().toString(),
              content: data.commentary,
              type: data.type || 'spicy',
              submission_id: submission.id,
              created_at: new Date().toISOString()
            }
          ]
        }));
      }
    } catch (error) {
      console.error('Error generating AI commentary:', error);
    }
  };

  const toggleComments = (submissionId: string) => {
    setExpandedSubmissions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-6 bg-ctea-dark/50 animate-pulse">
            <div className="h-4 bg-ctea-teal/20 rounded mb-3"></div>
            <div className="h-20 bg-ctea-teal/10 rounded mb-4"></div>
            <div className="flex gap-4">
              <div className="h-8 w-16 bg-ctea-pink/20 rounded"></div>
              <div className="h-8 w-16 bg-ctea-purple/20 rounded"></div>
              <div className="h-8 w-16 bg-ctea-yellow/20 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {submissions.map((submission) => (
        <TeaSubmissionCard
          key={submission.id}
          submission={submission}
          aiComments={aiComments[submission.id] || []}
          isExpanded={expandedSubmissions.has(submission.id)}
          onReaction={handleReaction}
          onToggleComments={toggleComments}
          onGenerateAI={generateAICommentary}
        />
      ))}
    </div>
  );
};

export default TeaFeed;
