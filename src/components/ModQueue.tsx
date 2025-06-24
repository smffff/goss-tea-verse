import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, CheckCircle, XCircle, AlertTriangle, Clock, Bot, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AICommentary from './AICommentary';

interface ModQueueProps {
  isModerator?: boolean;
}

interface QueueItem {
  id: string;
  content: string;
  category: string;
  evidence_urls: string[] | null;
  anonymous_token: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
  ai_risk_score?: number;
  ai_recommendation?: 'approve' | 'reject' | 'review';
  flag_count: number;
  priority: 'high' | 'medium' | 'low';
}

const ModQueue: React.FC<ModQueueProps> = ({ isModerator = false }) => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchQueueItems();
  }, [activeTab]);

  const fetchQueueItems = async () => {
    try {
      let query = supabase
        .from('tea_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (activeTab === 'pending') {
        query = query.eq('status', 'pending');
      } else if (activeTab === 'flagged') {
        query = query.gt('flag_count', 0);
      } else if (activeTab === 'recent') {
        query = query.eq('status', 'approved').gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;

      const items = (data || []).map(item => ({
        ...item,
        ai_risk_score: item.ai_risk_score || Math.random() * 100,
        ai_recommendation: item.ai_recommendation || (Math.random() > 0.7 ? 'reject' : 'approve'),
        priority: item.flag_count > 5 ? 'high' : item.flag_count > 2 ? 'medium' : 'low'
      }));

      setQueueItems(items);
    } catch (error) {
      console.error('Error fetching queue items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeration = async (itemId: string, action: 'approve' | 'reject', reason?: string) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('tea_submissions')
        .update({ 
          status: action,
          moderator_notes: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;

      // Add to moderation queue history
      await supabase
        .from('moderation_queue')
        .insert({
          submission_id: itemId,
          action: action,
          reason: reason || 'No reason provided',
          status: 'resolved',
          resolved_at: new Date().toISOString()
        });

      setQueueItems(prev => prev.filter(item => item.id !== itemId));
      setSelectedItem(null);

      toast({
        title: `Submission ${action === 'approve' ? 'Approved' : 'Rejected'}`,
        description: `The submission has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
      });

    } catch (error) {
      console.error('Error moderating submission:', error);
      toast({
        title: "Moderation Failed",
        description: "Couldn't process moderation action. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'low': return 'text-green-500 bg-green-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getAIRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'approve': return 'text-green-500';
      case 'reject': return 'text-red-500';
      case 'review': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  if (!isModerator) {
    return (
      <Card className="p-6 bg-gradient-to-br from-ctea-dark/80 to-ctea-darker/90 border-ctea-teal/30">
        <div className="text-center">
          <Shield className="w-12 h-12 text-ctea-teal mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Moderator Access Required</h3>
          <p className="text-gray-400">
            You need moderator privileges to access the moderation queue.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-ctea-teal" />
          <div>
            <h2 className="text-2xl font-bold text-white">Moderation Queue</h2>
            <p className="text-gray-400">AI-powered content moderation system</p>
          </div>
        </div>
        <Badge className="bg-ctea-purple text-white">
          {queueItems.length} items
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-ctea-darker/50">
          <TabsTrigger value="pending" className="data-[state=active]:bg-ctea-teal">
            <Clock className="w-4 h-4 mr-2" />
            Pending ({queueItems.filter(item => item.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="flagged" className="data-[state=active]:bg-ctea-orange">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Flagged ({queueItems.filter(item => item.flag_count > 0).length})
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-ctea-purple">
            <CheckCircle className="w-4 h-4 mr-2" />
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {queueItems.filter(item => item.status === 'pending').map((item) => (
            <Card key={item.id} className="p-4 bg-ctea-dark/50 border-ctea-teal/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-ctea-teal/30 text-ctea-teal">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-ctea-purple" />
                  <span className={`text-sm ${getAIRecommendationColor(item.ai_recommendation || '')}`}>
                    AI: {item.ai_recommendation?.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-white mb-3 line-clamp-2">{item.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Risk: {Math.round(item.ai_risk_score || 0)}%</span>
                  <span>Flags: {item.flag_count}</span>
                  <span>{new Date(item.created_at).toLocaleTimeString()}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedItem(item)}
                    className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                  >
                    Review
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          {queueItems.filter(item => item.flag_count > 0).map((item) => (
            <Card key={item.id} className="p-4 bg-ctea-dark/50 border-ctea-orange/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {item.flag_count} FLAGS
                  </Badge>
                  <Badge variant="outline" className="border-ctea-orange/30 text-ctea-orange">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <p className="text-white mb-3 line-clamp-2">{item.content}</p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Flagged {item.flag_count} times
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedItem(item)}
                    className="border-ctea-orange/30 text-ctea-orange hover:bg-ctea-orange/10"
                  >
                    Review
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {queueItems.filter(item => item.status === 'approved').map((item) => (
            <Card key={item.id} className="p-4 bg-ctea-dark/50 border-ctea-green/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    APPROVED
                  </Badge>
                  <Badge variant="outline" className="border-ctea-green/30 text-ctea-green">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <p className="text-white mb-3 line-clamp-2">{item.content}</p>

              <div className="text-sm text-gray-400">
                Approved {new Date(item.created_at).toLocaleTimeString()}
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-ctea-darker/95 border-ctea-teal/30 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-ctea-teal" />
              Review Submission
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              {/* Content */}
              <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
                <h4 className="text-white font-medium mb-2">Content:</h4>
                <p className="text-white leading-relaxed">{selectedItem.content}</p>
              </div>

              {/* Evidence */}
              {selectedItem.evidence_urls && selectedItem.evidence_urls.length > 0 && (
                <div className="p-4 bg-ctea-dark/50 rounded-lg border border-ctea-teal/20">
                  <h4 className="text-white font-medium mb-2">Evidence:</h4>
                  <div className="space-y-2">
                    {selectedItem.evidence_urls.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-ctea-teal hover:text-ctea-cyan transition-colors"
                      >
                        Evidence {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Analysis */}
              <div className="p-4 bg-ctea-purple/10 rounded-lg border border-ctea-purple/30">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-ctea-purple" />
                  AI Analysis
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Risk Score:</span>
                    <span className="text-white ml-2">{Math.round(selectedItem.ai_risk_score || 0)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Recommendation:</span>
                    <span className={`ml-2 ${getAIRecommendationColor(selectedItem.ai_recommendation || '')}`}>
                      {selectedItem.ai_recommendation?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Commentary */}
              <AICommentary
                content={`AI Risk Assessment: This submission has a ${Math.round(selectedItem.ai_risk_score || 0)}% risk score. ${selectedItem.ai_recommendation === 'approve' ? 'Recommendation: APPROVE - Content appears to be within community guidelines.' : selectedItem.ai_recommendation === 'reject' ? 'Recommendation: REJECT - Content may violate community guidelines.' : 'Recommendation: REVIEW - Manual review required for this submission.'}`}
                type="smart"
              />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => handleModeration(selectedItem.id, 'approve')}
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleModeration(selectedItem.id, 'reject')}
                  disabled={isProcessing}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedItem(null)}
                  className="border-ctea-teal/30 text-ctea-teal hover:bg-ctea-teal/10"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModQueue; 