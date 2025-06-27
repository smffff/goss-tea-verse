
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Zap, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { secureLog } from '@/utils/secureLog';

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

const EnhancedRealTimeFeed: React.FC = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      setSubmissions(data || []);
    } catch (error) {
      secureLog.error('Failed to fetch submissions:', error);
      toast({
        title: "Failed to Load Feed",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('tea_submissions')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'tea_submissions'
      }, (payload) => {
        const newSubmission = payload.new as TeaSubmission;
        if (newSubmission.status === 'approved') {
          setSubmissions(prev => [newSubmission, ...prev]);
          toast({
            title: "New Tea Alert! ☕",
            description: "Fresh gossip just dropped!",
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-8 h-8 animate-spin text-cyan-400" />
        <span className="ml-3 text-cyan-400">Loading fresh tea...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Live Tea Feed</h2>
        </div>
        <Button
          onClick={fetchSubmissions}
          size="sm"
          variant="outline"
          className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {submissions.length === 0 ? (
        <Card className="bg-slate-800/50 border-cyan-500/30">
          <CardContent className="p-8 text-center">
            <p className="text-gray-300">No tea to spill yet. Be the first to share some gossip!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id} className="bg-slate-800/50 border-cyan-500/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full">
                      {submission.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(submission.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                
                <p className="text-white mb-4">{submission.content}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-red-400">🔥 {submission.reactions?.hot || 0}</span>
                  <span className="text-blue-400">❄️ {submission.reactions?.cold || 0}</span>
                  <span className="text-orange-400">🌶️ {submission.reactions?.spicy || 0}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedRealTimeFeed;
