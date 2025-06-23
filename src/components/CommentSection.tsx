
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Reply, Heart, Bot } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  anonymous_token: string;
  created_at: string;
  chat_room_id: string;
}

interface CommentSectionProps {
  submissionId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ submissionId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setupChatRoom();
  }, [submissionId]);

  useEffect(() => {
    if (chatRoomId) {
      fetchComments();
      
      // Set up real-time subscription
      const subscription = supabase
        .channel(`comments-${chatRoomId}`)
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `chat_room_id=eq.${chatRoomId}`
          }, 
          (payload) => {
            setComments(prev => [payload.new as Comment, ...prev]);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [chatRoomId]);

  const setupChatRoom = async () => {
    try {
      // Check if chat room exists for this submission
      let { data: existingRoom, error: fetchError } = await supabase
        .from('chat_rooms')
        .select('id')
        .eq('submission_id', submissionId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingRoom) {
        setChatRoomId(existingRoom.id);
      } else {
        // Create new chat room
        const { data: newRoom, error: createError } = await supabase
          .from('chat_rooms')
          .insert({
            submission_id: submissionId,
            name: `Comments for submission ${submissionId.slice(0, 8)}`
          })
          .select()
          .single();

        if (createError) throw createError;
        setChatRoomId(newRoom.id);
      }
    } catch (error) {
      console.error('Error setting up chat room:', error);
    }
  };

  const fetchComments = async () => {
    if (!chatRoomId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_room_id', chatRoomId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

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

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !chatRoomId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const anonymousToken = getAnonymousToken();

      const { error } = await supabase
        .from('messages')
        .insert({
          content: newComment.trim(),
          chat_room_id: chatRoomId,
          anonymous_token: anonymousToken
        });

      if (error) throw error;

      // Generate AI response to the comment
      try {
        await supabase.functions.invoke('generate-ai-commentary', {
          body: { 
            content: newComment.trim(),
            category: 'comment',
            submissionId: submissionId,
            isComment: true,
            chatRoomId
          }
        });
      } catch (aiError) {
        console.log('AI response generation error:', aiError);
        // Don't throw, as the comment was still saved successfully
      }

      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Comment Failed",
        description: "Couldn't post your comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const isUserComment = (anonymousToken: string) => {
    return anonymousToken === localStorage.getItem('ctea_anonymous_token');
  };

  const isAIComment = (anonymousToken: string) => {
    // A specific token to identify AI-generated comments
    return anonymousToken === 'ai-commentary-bot';
  };

  return (
    <div className="space-y-4">
      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="flex items-start gap-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add to the drama..."
          className="min-h-[60px] bg-ctea-darker/50 border-ctea-teal/30 text-white placeholder:text-gray-400 resize-none"
          maxLength={500}
        />
        <Button 
          type="submit" 
          disabled={!newComment.trim() || isSubmitting}
          className="bg-gradient-to-r from-ctea-purple to-ctea-pink text-white"
        >
          {isSubmitting ? 
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> :
            <Send className="w-4 h-4" />
          }
        </Button>
      </form>

      {/* Comments list */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm text-center italic">Be the first to comment...</p>
        ) : (
          comments.map((comment) => (
            <Card 
              key={comment.id} 
              className={`p-4 ${
                isAIComment(comment.anonymous_token) 
                  ? 'bg-gradient-to-br from-ctea-purple/20 to-ctea-teal/20 border-ctea-teal/30' 
                  : isUserComment(comment.anonymous_token)
                    ? 'bg-gradient-to-br from-ctea-pink/20 to-ctea-purple/20 border-ctea-pink/30'
                    : 'bg-ctea-dark/50 border-ctea-teal/10'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {isAIComment(comment.anonymous_token) ? (
                    <span className="text-sm font-bold text-ctea-teal flex items-center gap-1">
                      <Bot className="w-4 h-4" /> CTeaBot
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gray-300">
                      {isUserComment(comment.anonymous_token) ? 'You' : 'Anonymous User'}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{formatTimeAgo(comment.created_at)}</span>
              </div>
              <p className={`text-sm ${isAIComment(comment.anonymous_token) ? 'text-white' : 'text-gray-100'}`}>
                {comment.content}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-ctea-pink">
                    <Heart className="w-3 h-3" /> Like
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-ctea-teal">
                    <Reply className="w-3 h-3" /> Reply
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
