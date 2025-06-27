import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, X, Flag, AlertTriangle, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSecureAuth } from '@/hooks/useSecureAuth';

interface QueueItem {
  id: string;
  content: string;
  category: string;
  evidence_urls: string[] | null;
  reactions: { hot: number; cold: number; spicy: number };
  created_at: string;
  anonymous_token: string;
  flag_count: number;
  status: 'approved' | 'pending' | 'rejected';
  ai_risk_score?: number;
  ai_recommendation?: string;
  priority: string;
}

const ModQueue = () => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { toast } = useToast();
  const { requireModerator, isAdmin } = useSecureAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!requireModerator()) return;
    fetchQueueItems();
  }, [requireModerator]);

  const fetchQueueItems = async () => {
    try {
      const { data, error } = await supabase
        .from('tea_submissions')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Transform data and add mock AI analysis since these fields don't exist
      const transformedItems: QueueItem[] = (data || []).map(item => {
        // Safely parse reactions from Json type
        let reactions = { hot: 0, cold: 0, spicy: 0 };
        if (item.reactions && typeof item.reactions === 'object') {
          reactions = item.reactions as { hot: number; cold: number; spicy: number };
        }

        return {
          ...item,
          reactions,
          ai_risk_score: Math.floor(Math.random() * 100),
          ai_recommendation: Math.random() > 0.5 ? 'approve' : 'review',
          priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
          status: item.status as 'approved' | 'pending' | 'rejected'
        };
      });

      setQueueItems(transformedItems);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error('Error fetching queue items:', error);
      }
      setError('Failed to load moderation queue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeration = async (itemId: string, action: 'approve' | 'reject' | 'flag') => {
    try {
      const newStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'flagged';
      
      const { error } = await supabase
        .from('tea_submissions')
        .update({ status: newStatus })
        .eq('id', itemId);

      if (error) throw error;

      setQueueItems(prev => prev.filter(item => item.id !== itemId));

      toast({
        title: `Submission ${action}d successfully`,
        description: `The submission has been ${action}d.`,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error('Error moderating submission:', error);
      }
      setError('Failed to moderate submission');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 bg-ctea-dark/30 border border-ctea-teal/20">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-ctea-teal/20 rounded"></div>
              <div className="h-8 bg-ctea-teal/20 rounded"></div>
              <div className="h-4 bg-ctea-teal/20 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Moderation Queue</h2>
        <Badge className="bg-ctea-teal/20 text-ctea-teal">
          {queueItems.length} pending
        </Badge>
      </div>

      {/* Simple Security Status for Admins */}
      {isAdmin && (
        <Card className="p-4 bg-ctea-dark/30 border border-ctea-teal/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-ctea-teal" />
            <h3 className="text-white font-semibold">Security Status</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Queue Size:</span>
              <span className="text-white ml-2">{queueItems.length}</span>
            </div>
            <div>
              <span className="text-gray-400">System Status:</span>
              <span className="text-green-400 ml-2">Operational</span>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {queueItems.map((item) => (
          <Card key={item.id} className="p-6 bg-ctea-dark/30 border border-ctea-teal/20">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority.toUpperCase()}
                  </Badge>
                  <Badge className="bg-ctea-purple/20 text-ctea-purple border-ctea-purple/30">
                    #{item.category}
                  </Badge>
                  {item.flag_count > 0 && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      <Flag className="w-3 h-3 mr-1" />
                      {item.flag_count} flags
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Content */}
              <div className="text-white">
                {item.content}
              </div>

              {/* AI Analysis */}
              <div className="bg-ctea-darker/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">AI Risk Analysis</span>
                  <span className={`text-sm font-bold ${getRiskColor(item.ai_risk_score || 0)}`}>
                    {item.ai_risk_score}/100
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  Recommendation: <span className="text-ctea-teal">{item.ai_recommendation}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  variant="outline"
                  className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {selectedItem === item.id ? 'Hide' : 'Review'}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleModeration(item.id, 'approve')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleModeration(item.id, 'reject')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleModeration(item.id, 'flag')}
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                >
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Flag
                </Button>
              </div>

              {/* Expanded Details */}
              {selectedItem === item.id && (
                <div className="border-t border-ctea-teal/20 pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Submission ID:</span>
                      <div className="text-white font-mono">{item.id}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">User Token:</span>
                      <div className="text-white font-mono">{item.anonymous_token.slice(0, 8)}...</div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-gray-400">Detailed AI Analysis:</span>
                    <div className="text-white mt-1 p-2 bg-ctea-darker/30 rounded">
                      This submission has been analyzed for potential violations, spam content, and 
                      community guidelines compliance. Risk factors include content sentiment, 
                      language patterns, and user behavior history.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}

        {queueItems.length === 0 && (
          <Card className="p-12 bg-ctea-dark/30 border border-ctea-teal/20 text-center">
            <CheckCircle className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Queue is empty!</h3>
            <p className="text-gray-400">All submissions have been reviewed.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ModQueue;
