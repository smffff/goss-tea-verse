
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Flag, ExternalLink, Flame, Snowflake } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AICommentary from './AICommentary';
import CommentSection from './CommentSection';

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
      setSubmissions(data || []);
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

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      gossip: '☕',
      drama: '🎭',
      rumors: '👂',
      exposed: '👀',
      memes: '🐸'
    };
    return emojis[category] || '☕';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
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
        <Card key={submission.id} className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30 neon-border">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-ctea-purple to-ctea-pink text-white">
                {getCategoryEmoji(submission.category)} {submission.category}
              </Badge>
              {submission.has_evidence && (
                <Badge variant="outline" className="border-ctea-yellow text-ctea-yellow">
                  📸 Evidence
                </Badge>
              )}
            </div>
            <span className="text-sm text-gray-400">{formatTimeAgo(submission.created_at)}</span>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-white leading-relaxed">{submission.content}</p>
          </div>

          {/* Evidence Links */}
          {submission.evidence_urls && submission.evidence_urls.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="text-sm text-ctea-teal font-medium">Evidence:</p>
              {submission.evidence_urls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ctea-teal hover:text-ctea-cyan transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm underline">Evidence {index + 1}</span>
                </a>
              ))}
            </div>
          )}

          {/* Reactions */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleReaction(submission.id, 'hot')}
              className="border-ctea-orange/30 text-ctea-orange hover:bg-ctea-orange/10"
            >
              <Flame className="w-4 h-4 mr-1" />
              Hot {submission.reactions.hot || 0}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleReaction(submission.id, 'cold')}
              className="border-ctea-cyan/30 text-ctea-cyan hover:bg-ctea-cyan/10"
            >
              <Snowflake className="w-4 h-4 mr-1" />
              Cold {submission.reactions.cold || 0}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleReaction(submission.id, 'spicy')}
              className="border-ctea-pink/30 text-ctea-pink hover:bg-ctea-pink/10"
            >
              🌶️ Spicy {submission.reactions.spicy || 0}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleComments(submission.id)}
                className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Comments
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => generateAICommentary(submission)}
                className="border-ctea-purple/30 text-ctea-purple hover:bg-ctea-purple/10"
              >
                🤖 AI Take
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-ctea-teal">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-ctea-pink">
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* AI Comments */}
          {aiComments[submission.id] && aiComments[submission.id].length > 0 && (
            <div className="mt-4 space-y-3">
              {aiComments[submission.id].map((comment) => (
                <AICommentary
                  key={comment.id}
                  content={comment.content}
                  type={comment.type}
                  onRegenerate={() => generateAICommentary(submission)}
                />
              ))}
            </div>
          )}

          {/* Comments Section */}
          {expandedSubmissions.has(submission.id) && (
            <div className="mt-4">
              <CommentSection submissionId={submission.id} />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default TeaFeed;
