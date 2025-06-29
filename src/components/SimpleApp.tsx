import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, Coffee, RefreshCw, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import SpillTeaModal from '@/components/modals/SpillTeaModal';

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

const SimpleApp: React.FC = () => {
  const [submissions, setSubmissions] = useState<TeaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSpillModal, setShowSpillModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for access
    const betaAccess = localStorage.getItem('ctea-beta-access');
    const demoMode = localStorage.getItem('ctea-demo-mode');
    setHasAccess(!!(betaAccess || demoMode));
  }, []);

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
      
      const transformedData = (data || []).map(item => ({
        ...item,
        reactions: typeof item.reactions === 'string' 
          ? JSON.parse(item.reactions) 
          : item.reactions || { hot: 0, cold: 0, spicy: 0 }
      }));
      
      setSubmissions(transformedData);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
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
    if (hasAccess) {
      fetchSubmissions();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('tea_submissions')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'tea_submissions'
        }, (payload) => {
          const newSubmission = payload.new as any;
          if (newSubmission.status === 'approved') {
            const transformedSubmission = {
              ...newSubmission,
              reactions: typeof newSubmission.reactions === 'string' 
                ? JSON.parse(newSubmission.reactions) 
                : newSubmission.reactions || { hot: 0, cold: 0, spicy: 0 }
            };
            setSubmissions(prev => [transformedSubmission, ...prev]);
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
    }
  }, [hasAccess, toast]);

  const handleLogout = () => {
    localStorage.removeItem('ctea-beta-access');
    localStorage.removeItem('ctea-demo-mode');
    localStorage.removeItem('ctea-beta-code');
    localStorage.removeItem('ctea-access-level');
    setHasAccess(false);
  };

  const handleSpillSuccess = () => {
    fetchSubmissions();
    setShowSpillModal(false);
  };

  const handleDemoAccess = () => {
    localStorage.setItem('ctea-demo-mode', 'true');
    setHasAccess(true);
    toast({
      title: "Demo Access Granted! ✨",
      description: "Welcome to the CTea experience!",
    });
  };

  // Show landing page if no access
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🫖</div>
          <h1 className="text-4xl font-bold text-white">CTea Newsroom</h1>
          <p className="text-xl text-gray-300">The ultimate platform for anonymous news sharing</p>
          
          <div className="space-y-4">
            <p className="text-gray-400">Spill the tea on what really matters. Anonymous, secure, and community-driven.</p>
            
            <Button
              onClick={handleDemoAccess}
              className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold px-8 py-3"
            >
              Try Demo Mode
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-ctea-teal mx-auto" />
          <p className="text-white">Loading fresh tea...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctea-darker via-ctea-dark to-black">
      {/* Header */}
      <div className="bg-ctea-dark/80 backdrop-blur-lg border-b border-ctea-teal/30 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🫖</div>
              <h1 className="text-xl font-bold text-white">CTea Live</h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-400/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">LIVE</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowSpillModal(true)}
                className="bg-gradient-to-r from-ctea-teal to-ctea-purple hover:from-ctea-purple hover:to-ctea-teal text-white font-bold"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Spill Tea
              </Button>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-ctea-teal" />
              <h2 className="text-xl font-bold text-white">Live Tea Feed</h2>
            </div>
            <Button
              onClick={fetchSubmissions}
              size="sm"
              variant="outline"
              className="border-ctea-teal/50 text-ctea-teal hover:bg-ctea-teal/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {submissions.length === 0 ? (
            <Card className="bg-ctea-dark/50 border-ctea-teal/30">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🫖</div>
                <p className="text-gray-300 mb-4">No tea to spill yet. Be the first to share some gossip!</p>
                <Button
                  onClick={() => setShowSpillModal(true)}
                  className="bg-ctea-teal hover:bg-ctea-teal/80 text-black font-bold"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Spill the First Tea
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id} className="bg-ctea-dark/50 border-ctea-teal/30 hover:border-ctea-teal/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-ctea-teal/20 text-ctea-teal text-xs rounded-full">
                          {submission.category}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {new Date(submission.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-white mb-4 leading-relaxed">{submission.content}</p>
                    
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
      </div>

      {/* Spill Tea Modal */}
      <SpillTeaModal
        isOpen={showSpillModal}
        onClose={() => setShowSpillModal(false)}
        onSuccess={handleSpillSuccess}
      />
    </div>
  );
};

export default SimpleApp; 