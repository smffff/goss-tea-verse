
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLog';
import TeaSubmissionCard from './TeaSubmissionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeaSubmission {
  id: string;
  content: string;
  category: string;
  created_at: string;
  reactions: {
    hot: number;
    cold: number;
    spicy: number;
  };
}

const TeaFeed: React.FC = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSubmissions = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) setIsRefreshing(true);
      
      const { data, error } = await supabase
        .from('tea_submissions')
        .select('id, content, category, created_at, reactions')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      setSubmissions(data || []);
    } catch (error) {
      secureLog.error('Failed to fetch tea submissions', error);
    } finally {
      setIsLoading(false);
      if (showRefreshLoader) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleReaction = async (submissionId: string, reactionType: 'hot' | 'cold' | 'spicy') => {
    try {
      // Update local state optimistically
      setSubmissions(prev => prev.map(sub => 
        sub.id === submissionId 
          ? { 
              ...sub, 
              reactions: { 
                ...sub.reactions, 
                [reactionType]: sub.reactions[reactionType] + 1 
              } 
            }
          : sub
      ));

      // TODO: Update database with reaction
      secureLog.info('Reaction added', { submissionId, reactionType });
      return true;
    } catch (error) {
      secureLog.error('Failed to add reaction', error);
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin w-8 h-8 border-2 border-ctea-teal border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Coffee className="w-5 h-5 text-ctea-teal" />
          Live Tea Feed
        </h2>
        <Button
          onClick={() => fetchSubmissions(true)}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {submissions.length === 0 ? (
        <Card className="bg-ctea-dark/60 border-ctea-teal/30">
          <CardContent className="p-8 text-center">
            <Coffee className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No Tea Spilled Yet</h3>
            <p className="text-gray-400">Be the first to share some hot gossip!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <TeaSubmissionCard
              key={submission.id}
              submission={submission}
              onReaction={handleReaction}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeaFeed;
