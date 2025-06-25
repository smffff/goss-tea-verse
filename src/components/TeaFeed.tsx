import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProgression } from '@/hooks/useUserProgression';
import TeaSubmissionCard from './TeaSubmissionCard';
import HotTakesFilters from './HotTakesFilters';
import LoadingSpinner from './LoadingSpinner';
import FeedSkeleton from './FeedSkeleton';
import ShareButtons from './ShareButtons';
import ReportModal from './ReportModal';
import { Share2, Flag, Copy, CheckCircle, Twitter, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  boost_score?: number;
  author?: string;
  is_viral?: boolean;
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingSubmission, setReportingSubmission] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const { incrementReaction } = useUserProgression();
  const { toast } = useToast();

  // Mock data for development
  const mockSubmissions: TeaSubmission[] = [
    {
      id: '1',
      content: "Solana just pulled the biggest rug of 2024. Insiders knew about the issues weeks ago but kept quiet while retail piled in. The network congestion was just the beginning - there's way more coming. 🚨",
      category: 'drama',
      evidence_urls: ['https://example.com/evidence1'],
      reactions: { hot: 247, cold: 23, spicy: 89 },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      average_rating: 4.2,
      rating_count: 359,
      has_evidence: true,
      boost_score: 150,
      author: 'Anonymous',
      is_viral: true
    },
    {
      id: '2',
      content: "Ethereum ETF approval rumors heating up again. Sources say BlackRock is pushing hard behind the scenes. If this goes through, we're looking at a massive institutional inflow. The timing is suspicious though... 🤔",
      category: 'alpha',
      evidence_urls: null,
      reactions: { hot: 189, cold: 45, spicy: 67 },
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      average_rating: 3.8,
      rating_count: 301,
      has_evidence: false,
      boost_score: 89,
      author: 'CryptoInsider',
      is_viral: false
    },
    {
      id: '3',
      content: "New meme coin launching with suspicious timing. The dev team has zero transparency and the tokenomics are a red flag factory. DYOR but this smells like a classic pump and dump setup. 💀",
      category: 'warning',
      evidence_urls: ['https://example.com/evidence2'],
      reactions: { hot: 156, cold: 78, spicy: 123 },
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      average_rating: 4.5,
      rating_count: 357,
      has_evidence: true,
      boost_score: 234,
      author: 'RugDetector',
      is_viral: true
    },
    {
      id: '4',
      content: "DeFi summer 2.0 is coming. The signs are everywhere - TVL increasing, new protocols launching, and the yield farming opportunities are insane. This time it's different because of the institutional adoption. 🌞",
      category: 'alpha',
      evidence_urls: null,
      reactions: { hot: 98, cold: 34, spicy: 45 },
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      average_rating: 3.9,
      rating_count: 177,
      has_evidence: false,
      boost_score: 67,
      author: 'DeFiMaxi',
      is_viral: false
    },
    {
      id: '5',
      content: "Major exchange hack incoming. Multiple sources confirming a large CEX is about to get rekt. The amount is in the hundreds of millions. This is going to be the biggest crypto story of the year. 🔥",
      category: 'breaking',
      evidence_urls: ['https://example.com/evidence3'],
      reactions: { hot: 312, cold: 67, spicy: 156 },
      created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      average_rating: 4.7,
      rating_count: 535,
      has_evidence: true,
      boost_score: 445,
      author: 'WhaleAlert',
      is_viral: true
    }
  ];

  useEffect(() => {
    fetchSubmissions();
    fetchAIComments();
  }, [activeFilter, sortBy]);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use mock data for now
      let filteredData = [...mockSubmissions];
      
      // Apply client-side filtering
      if (activeFilter !== 'all') {
        filteredData = filteredData.filter(submission => {
          const reactions = submission.reactions;
          switch (activeFilter) {
            case 'hot':
              return reactions.hot > reactions.cold;
            case 'spicy':
              return reactions.spicy > 50;
            case 'trending':
              return (reactions.hot + reactions.cold + reactions.spicy) > 200;
            case 'boosted':
              return (submission.boost_score || 0) > 100;
            case 'viral':
              return submission.is_viral;
            default:
              return true;
          }
        });
      }

      // Apply sorting
      filteredData.sort((a, b) => {
        switch (sortBy) {
          case 'reactions':
            return (b.reactions.hot + b.reactions.cold + b.reactions.spicy) - (a.reactions.hot + a.reactions.cold + a.reactions.spicy);
          case 'boosted':
            return (b.boost_score || 0) - (a.boost_score || 0);
          case 'controversial':
            return Math.abs(b.reactions.hot - b.reactions.cold) - Math.abs(a.reactions.hot - a.reactions.cold);
          default:
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });
      
      setSubmissions(filteredData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      // Fallback to mock data
      setSubmissions(mockSubmissions);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIComments = async () => {
    try {
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
            anonymous_token,
            reaction_type: reactionType
          });
      }

      // Update local state
      setSubmissions(prev => prev.map(submission => {
        if (submission.id === submissionId) {
          const newReactions = { ...submission.reactions };
          newReactions[reactionType]++;
          return { ...submission, reactions: newReactions };
        }
        return submission;
      }));

      // Track user progression
      incrementReaction(reactionType);

      toast({
        title: `Reaction Added! ${reactionType === 'hot' ? '🔥' : reactionType === 'cold' ? '❄️' : '🌶️'}`,
        description: `You ${reactionType === 'hot' ? 'heated up' : reactionType === 'cold' ? 'cooled down' : 'spiced up'} this tea!`,
      });

    } catch (error) {
      console.error('Error adding reaction:', error);
      toast({
        title: "Reaction Failed",
        description: "Couldn't add your reaction. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBoostUpdated = (submissionId: string, newBoost: number) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, boost_score: newBoost }
        : submission
    ));
  };

  const generateAICommentary = async (submission: TeaSubmission, type: 'spicy' | 'smart' | 'memy' | 'wise' = 'spicy') => {
    try {
      const response = await fetch('/api/generate-ai-commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: submission.id,
          content: submission.content,
          type
        })
      });

      if (response.ok) {
        const comment = await response.json();
        setAiComments(prev => ({
          ...prev,
          [submission.id]: [...(prev[submission.id] || []), comment]
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

  const handleShare = async (submissionId: string, platform: 'twitter' | 'copy') => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    const shareUrl = `${window.location.origin}/feed?submission=${submissionId}`;
    const shareText = `🔥 Hot Tea Alert: ${submission.content.substring(0, 100)}... #CTea #CryptoGossip`;

    try {
      if (platform === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopiedLink(submissionId);
        toast({
          title: "Link Copied! 📋",
          description: "Share link copied to clipboard",
        });
        setTimeout(() => setCopiedLink(null), 2000);
      }
    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: "Share Failed",
        description: "Couldn't share content. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReport = (submissionId: string) => {
    setReportingSubmission(submissionId);
    setShowReportModal(true);
  };

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <HotTakesFilters 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Feed Items */}
      <div className="space-y-6">
        {submissions.map((submission) => (
          <div key={submission.id} className="relative">
            <TeaSubmissionCard
              submission={submission}
              onReaction={handleReaction}
              onBoostUpdated={handleBoostUpdated}
              onGenerateAICommentary={generateAICommentary}
              aiComments={aiComments[submission.id] || []}
              isExpanded={expandedSubmissions.has(submission.id)}
              onToggleComments={() => toggleComments(submission.id)}
            />
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-ctea-teal/20">
              <div className="flex items-center gap-2">
                <ShareButtons
                  url={`${window.location.origin}/feed?submission=${submission.id}`}
                  title={`Hot Tea: ${submission.content.substring(0, 50)}...`}
                  variant="minimal"
                  className="text-ctea-teal"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(submission.id, 'twitter')}
                  className="text-ctea-teal hover:bg-ctea-teal/10 hover:text-white transition-colors duration-200"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(submission.id, 'copy')}
                  className="text-ctea-teal hover:bg-ctea-teal/10 hover:text-white transition-colors duration-200"
                >
                  {copiedLink === submission.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReport(submission.id)}
                  className="text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors duration-200"
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setReportingSubmission(null);
        }}
        submissionId={reportingSubmission}
      />
    </div>
  );
};

export default TeaFeed;
